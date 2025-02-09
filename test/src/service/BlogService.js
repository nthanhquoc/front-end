import axios from "axios";

const getBlogs = async ()=>{
    try{
        const response = await axios.get("http://localhost:8080/api/blogs");
        return response.data;
    }
    catch(error){
        console.error("Error fetching blogs:", error);
        return [];
    }
}

const getBlogById = async (id)=>{
    try{
        const response = await axios.get(`http://localhost:8080/api/blogs/${id}`);
        return response.data;
    }
    catch(error){
        console.error("Error fetching blog by ID:", error);
        return null;
    }
}

const createBlog = async(blog)=>{
    try{
        const response = await axios.post("http://localhost:8080/api/blogs", blog);
        return response.data;
    }
    catch(error){
        console.error("Error creating blog:", error);
        return null;
    }
}

const updateBlog = async(id, updatedBlog)=>{
    try{
        const response = await axios.put(`http://localhost:8080/api/blogs/${id}`, updatedBlog);
        return response.data;
    }
    catch(error){
        console.error("Error updating blog:", error);
        return null;
    }
}

const deleteBlog = async(id)=>{
    try{
        await axios.delete(`http://localhost:8080/api/blogs/${id}`);
        return true;
    }
    catch(error){
        console.error("Error deleting blog:", error);
        return false;
    }
}

const searchBlogsByTitle = async (title,page=0)=>{
    try{
        const response = await axios.get(`http://localhost:8080/api/blogs/search?title=${title}&page=${page}`);
        return response.data;
    }
    catch(error){
        console.error("Error searching blogs by title:", error);
        return [];
    }
}
export {getBlogs,getBlogById,createBlog,updateBlog, deleteBlog,searchBlogsByTitle}