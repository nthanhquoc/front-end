import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../service/BlogService';
import { getCategories } from '../service/CategoryService';

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
                    alert('Tạo blog thành công!');
                    navigate('/');
                } else {
                    alert('Tạo blog thất bại!');
                }
            })
            .catch((error) => {
                console.error('Error creating blog:', error);
                alert('Đã xảy ra lỗi khi tạo blog');
            });
    };

    return (
        <div>
            <h2>Thêm Mới Blog</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ marginRight: '10px' }}>Tiêu đề:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ marginRight: '10px' }}>Nội dung:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ marginRight: '10px' }}>Tác giả:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div style={{marginBottom: '10px'}}>
                    <label style={{marginRight: '10px'}}>Danh mục:</label>
                    <select
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
                    </select>
                </div>
                <button type="submit">Tạo Blog</button>
            </form>
        </div>
    );
};

export default AddBlogComponent;
