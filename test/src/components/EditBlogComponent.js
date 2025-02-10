import React, { useState, useEffect } from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import { getBlogById, updateBlog } from "../service/BlogService";
import { getCategories } from "../service/CategoryService";
import {toast} from "react-toastify";

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
        <div>
            <h2>Chỉnh sửa Blog</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Tiêu đề:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Nội dung:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <div>
                    <label>Tác giả:</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div>
                    <label>Danh mục:</label>
                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                        <option value="">-- Chọn danh mục --</option>
                        {categories.map((category) => (
                            <option key={category.idCategory} value={category.idCategory}>
                                {category.nameCategory}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Cập nhật</button>
                <Link to="/">Quay lại danh sách</Link>
            </form>
        </div>
    );
};

export default EditBlogComponent;
