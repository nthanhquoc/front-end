import React, { useState, useEffect } from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import { getBlogById, updateBlog } from "../service/BlogService";
import { getCategories } from "../service/CategoryService";
import {toast} from "react-toastify";
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const EditBlogComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getBlogById(id).then((data) => {
            setTitle(data.title);
            setContent(data.content);
            setAuthor(data.author);
            setCategoryId(data.category?.idCategory || "");
        });

        getCategories().then((data) => setCategories(data));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedBlog = {
            title,
            content,
            author,
            category: {
                idCategory: parseInt(categoryId),
            },
        };

        updateBlog(id, updatedBlog).then((data) => {
            if (data) {
               toast.success("Cập Nhập Blog Thành Công");
                navigate("/");
            } else {
                toast.error("Cập Nhập Blog Thất Bại");
            }
        });
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-warning text-white text-center">
                            <h3 className="mb-0">Chỉnh Sửa Blog</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleUpdate}>
                                <Form.Group className="mb-3" controlId="editBlogTitle">
                                    <Form.Label>Tiêu đề</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tiêu đề blog"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="editBlogContent">
                                    <Form.Label>Nội dung</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="Nhập nội dung blog..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="editBlogAuthor">
                                    <Form.Label>Tác giả</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tên tác giả"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="editBlogCategory">
                                    <Form.Label>Danh mục</Form.Label>
                                    <Form.Select
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                        required
                                    >
                                        <option value="">-- Chọn danh mục --</option>
                                        {categories.map((category) => (
                                            <option key={category.idCategory} value={category.idCategory}>
                                                {category.nameCategory}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit">
                                        Cập nhật
                                    </Button>
                                    <Link to="/" className="btn btn-secondary">
                                        Quay lại danh sách
                                    </Link>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EditBlogComponent;
