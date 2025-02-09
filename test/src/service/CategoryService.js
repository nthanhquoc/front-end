import axios from "axios";

const getCategories =async ()=>{
    try{
        const response = await axios.get("http://localhost:8080/api/categories");
        return response.data;
    }
    catch(error){
        console.error("Error fetching categories:", error);
        return [];
    }
}

export {getCategories};