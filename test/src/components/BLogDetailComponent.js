import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogById } from "../service/BlogService";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const BlogDetailComponent = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        getBlogById(id)
            .then((data) => setBlog(data))
            .catch((error) => console.error("Error fetching blog details:", error));
    }, [id]);

    if (!blog) {
        return <p>Đang tải...</p>;
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-info text-white text-center">
                            <h1 className="mb-0">Chi Tiết Blog</h1>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title className="mb-3">{blog.title}</Card.Title>
                            <Card.Text as="div">
                                <p>
                                    <strong>Nội dung:</strong> {blog.content}
                                </p>
                                <p>
                                    <strong>Tác giả:</strong> {blog.author}
                                </p>
                                <p>
                                    <strong>Danh mục:</strong> {blog.category?.nameCategory || 'N/A'}
                                </p>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Link to="/">
                                <Button variant="secondary">Quay lại danh sách</Button>
                            </Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BlogDetailComponent;
