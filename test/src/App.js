import './App.css';
import BlogComponent from "./components/BlogComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddBlogComponent from "./components/AddBlogComponent";
import BlogDetailComponent from "./components/BLogDetailComponent";
import EditBlogComponent from "./components/EditBlogComponent";
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BlogComponent/>}></Route>
                <Route path="/add" element={<AddBlogComponent/>}></Route>
                <Route path="/blogs/:id" element={<BlogDetailComponent/>}></Route>
                <Route path="/edit/:id" element={<EditBlogComponent />} />
            </Routes>
            <ToastContainer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
