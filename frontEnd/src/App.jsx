import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { AdminDashboard } from './components/AdminDashboard';

import ListUser from './components/users/ListUser';
import { AddUser } from './components/users/AddUser';
import { EditUser } from './components/users/EditUser';
import { ViewUser } from './components/users/ViewUser';

import { AddProduct } from './components/products/AddProduct';
import { EditProduct } from './components/products/EditProduct';
import { ProductList } from './components/products/ListProduct';
import { ViewProduct } from './components/products/ViewProduct';

import { CategoryList } from './components/categories/CategoryList';
import { AddCategory } from './components/categories/AddCategory';
import { EditCategory } from './components/categories/EditCategory';
import { ViewCategory } from './components/categories/ViewCategory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />}>
          {/* For Users */}
          <Route path="users" element={<ListUser />} />
          <Route path="adduser" element={<AddUser />} />
          <Route path="users/edit/:id" element={<EditUser />} />
          <Route path="users/view/:id" element={<ViewUser />} />
          {/* For Products */}
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="products/view/:id" element={<ViewProduct />} />
          {/* For Categories */}
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />
          <Route path="categories/view/:id" element={<ViewCategory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;