import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AddProductPage, DashboardPage, CategoryPage, ListUserPage, EditProduct, AddCategory, EditCategory, AddUser, EditUser } from "./pages/admin"
import { getAllProduct } from './api/products'
import { getAllCategory } from "./api/category";
import { getAllUser } from "./api/user";
import { postCategoryProducts } from "./redux/categoryProductSlice";
import { postProducts } from "./redux/productSlice";
import { postUser } from "./redux/userSlice";
import {HomePage, DetailPage, Register, Login} from './pages/client'
import NotFoundPage from "./pages/404/notFound";


function App() {
  const dispatch = useDispatch();

  getAllProduct().then(({ data }) => dispatch(postProducts(data)))
  getAllCategory().then(({ data }) => dispatch(postCategoryProducts(data)))
  getAllUser().then(({ data }) => dispatch(postUser(data)))

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/admin/">
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="product/add" element={<AddProductPage />} />
            <Route path="product/edit/:id" element={<EditProduct />} />

            <Route path="product/category" element={<CategoryPage />} />
            <Route path="product/category/add" element={<AddCategory />} />
            <Route path="product/category/edit/:id" element={<EditCategory />} />

            <Route path="users" element={<ListUserPage />} />
            <Route path="users/add" element={<AddUser />} />
            <Route path="users/edit/:id" element={<EditUser />} />
          </Route>

          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<DetailPage />} />

          <Route path="/register" element={< Register />} />
          <Route path="/login" element={< Login />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
