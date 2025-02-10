import React, { useState, useEffect } from 'react';
import { getBlogs, searchBlogsByTitle,deleteBlog } from "../service/BlogService";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

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
        <div>
            <h1>Danh Sách Blog</h1>
            <div>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tiêu đề..."
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm kiếm</button>
            </div>
            <Link to="/add">
                <button style={{ marginLeft: '10px' }}>Thêm mới</button>
            </Link>
            <div style={{ overflowX: 'auto', marginTop: '20px' }}>
                <table
                    border="1"
                    cellPadding="10"
                    cellSpacing="0"
                    style={{ width: '100%', borderCollapse: 'collapse' }}
                >
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
                                        <button>Xem</button>
                                    </Link>
                                    <Link to={`/edit/${blog.id}`}>
                                        <button>Sửa</button>
                                    </Link>
                                    <button onClick={() => handleDelete(blog.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                Không có blog nào
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {isSearching && totalPages > 1 && (
                <div style={{ marginTop: '20px' }}>
                    <button disabled={page === 0} onClick={() => handlePageChange(page - 1)}>
                        Previous
                    </button>
                    <span style={{ margin: '0 10px' }}>
                        Page {page + 1} of {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages - 1}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogComponent;
