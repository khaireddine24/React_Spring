import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import InputField from '../InputField';
import Toast from '../Toast';

export function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({
      productName: '',
      productPrice: '',
      dateCreation: '',
      category: { id: '' }
    });
    const [categories, setCategories] = useState([]);
    const [toast, setToast] = useState(null);
  
    useEffect(() => {
      loadProduct();
      loadCategories();
    }, []);
  
    const loadProduct = async () => {
      try {
        const result = await axios.get(`http://localhost:9090/api/products/${id}`);
        setProduct(result.data);
      } catch (error) {
        console.error('Error loading product:', error);
        setToast({ message: 'Failed to load product. Please try again.', type: 'error' });
      }
    };
  
    const loadCategories = async () => {
      try {
        const result = await axios.get("http://localhost:9090/api/categories");
        setCategories(result.data);
      } catch (error) {
        console.error('Error loading categories:', error);
        setToast({ message: 'Failed to load categories. Please try again.', type: 'error' });
      }
    };
  
    const onInputChange = (e) => {
      if (e.target.name === 'category') {
        setProduct({ ...product, category: { id: e.target.value } });
      } else {
        setProduct({ ...product, [e.target.name]: e.target.value });
      }
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`http://localhost:9090/api/products/${id}`, product);
        setToast({ message: 'Product updated successfully!', type: 'success' });
        setTimeout(() => navigate('/dashboard/products'), 3000);
      } catch (error) {
        console.error('Error updating product:', error);
        setToast({ message: 'Failed to update product. Please try again.', type: 'error' });
      }
    };
  
    return (
      <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h2>
          <form onSubmit={onSubmit} className="space-y-6">
            <InputField
              label="Product Name"
              name="productName"
              type="text"
              value={product.productName}
              onChange={onInputChange}
            />
            <InputField
              label="Price"
              name="productPrice"
              type="number"
              value={product.productPrice}
              onChange={onInputChange}
            />
            <InputField
              label="Date Created"
              name="dateCreation"
              type="date"
              value={product.dateCreation}
              onChange={onInputChange}
            />
            <div>
              <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <select
                name="category"
                value={product.category.id}
                onChange={onInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between">
              <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Update
              </button>
              <Link to="/dashboard/products" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancel
              </Link>
            </div>
          </form>
        </div>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    );
  }

export default EditProduct;