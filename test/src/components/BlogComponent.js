import React, { useState, useEffect } from 'react';
import { getBlogs, searchBlogsByTitle,deleteBlog } from "../service/BlogService";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import { Container, Row, Col, Form, Button, Table, Pagination } from 'react-bootstrap';

const BlogComponent = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = () => {
        getBlogs()
            .then((data) => {
                setBlogs(data);
            })
            .catch((error) => {
                console.error('Error fetching blogs:', error);
            });
    };

    const handleSearch = () => {
        if (searchTitle.trim() !== '') {
            setIsSearching(true);
            searchBlogsByTitle(searchTitle, page)
                .then((data) => {
                    setBlogs(data.content);
                    setTotalPages(data.totalPages);
                })
                .catch((error) => {
                    console.error('Error searching blogs:', error);
                });
        } else {
            setIsSearching(false);
            fetchBlogs();
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        if (isSearching) {
            searchBlogsByTitle(searchTitle, newPage)
                .then((data) => {
                    setBlogs(data.content);
                    setTotalPages(data.totalPages);
                })
                .catch((error) => {
                    console.error('Error searching blogs:', error);
                });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa blog này?")) {
            deleteBlog(id).then((success) => {
                if (success) {
                    toast.success("Xóa Thành Công");
                    fetchBlogs();
                } else {
                    toast.error("Xóa Thất Bại");
                }
            });
        }
    };

    return (
        <Container className="mt-4">
            <h1>Danh Sách Blog</h1>

            {/* Phần tìm kiếm và nút Thêm mới */}
            <Row className="align-items-center my-3">
                <Col xs={12} md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm theo tiêu đề..."
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                </Col>
                <Col xs="auto">
                    <Button variant="primary" onClick={handleSearch}>
                        Tìm kiếm
                    </Button>
                </Col>
                <Col xs="auto">
                    <Link to="/add">
                        <Button variant="success">Thêm mới</Button>
                    </Link>
                </Col>
            </Row>

            {/* Bảng danh sách blog */}
            <Row>
                <Col>
                    <Table responsive bordered hover>
                        <thead>
                        <tr>
                            <th>Tiêu đề</th>
                            <th>Nội dung</th>
                            <th>Tác giả</th>
                            <th>Danh mục</th>
                            <th>Hành Động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <tr key={blog.id}>
                                    <td>{blog.title}</td>
                                    <td>{blog.content}</td>
                                    <td>{blog.author}</td>
                                    <td>
                                        {blog.category && blog.category.nameCategory
                                            ? blog.category.nameCategory
                                            : 'N/A'}
                                    </td>
                                    <td>
                                        <Link to={`/blogs/${blog.id}`}>
                                            <Button variant="info" size="sm" className="me-2">
                                                Xem
                                            </Button>
                                        </Link>
                                        <Link to={`/edit/${blog.id}`}>
                                            <Button variant="warning" size="sm" className="me-2">
                                                Sửa
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(blog.id)}
                                        >
                                            Xóa
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Không có blog nào
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/* Phân trang */}
            {isSearching && totalPages > 1 && (
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <Pagination>
                            <Pagination.Prev
                                disabled={page === 0}
                                onClick={() => handlePageChange(page - 1)}
                            />
                            <Pagination.Item active>
                                {page + 1} / {totalPages}
                            </Pagination.Item>
                            <Pagination.Next
                                disabled={page === totalPages - 1}
                                onClick={() => handlePageChange(page + 1)}
                            />
                        </Pagination>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default BlogComponent;
