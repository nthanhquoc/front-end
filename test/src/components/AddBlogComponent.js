import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../service/BlogService';
import { getCategories } from '../service/CategoryService';
import {toast} from "react-toastify";
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const AddBlogComponent = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getCategories()
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const blog = {
            title,
            content,
            author,
            category: {
                idCategory: parseInt(categoryId),
            },
        };

        createBlog(blog)
            .then((data) => {
                if (data) {
                    toast.success("Tạo Blog Thành Công");
                    navigate('/');
                } else {
                    toast.error("Tạo Blog Thất Bại");
                }
            })
            .catch((error) => {
                console.error('Error creating blog:', error);
                alert('Đã xảy ra lỗi khi tạo blog');
            });
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-primary text-white text-center">
                            <h3 className="mb-0">Thêm Mới Blog</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formTitle">
                                    <Form.Label>Tiêu đề</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tiêu đề blog"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formContent">
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

                                <Form.Group className="mb-3" controlId="formAuthor">
                                    <Form.Label>Tác giả</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tên tác giả"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formCategory">
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

                                <div className="d-grid">
                                    <Button variant="primary" type="submit">
                                        Tạo Blog
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddBlogComponent;
