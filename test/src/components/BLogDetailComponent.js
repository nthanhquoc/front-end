import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogById } from "../service/BlogService";

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
        <div>
            <h1>Chi Tiết Blog</h1>
            <h2>{blog.title}</h2>
            <p><strong>Nội dung:</strong> {blog.content}</p>
            <p><strong>Tác giả:</strong> {blog.author}</p>
            <p><strong>Danh mục:</strong> {blog.category?.nameCategory || "N/A"}</p>
            <Link to="/">Quay lại danh sách</Link>
        </div>
    );
};

export default BlogDetailComponent;
