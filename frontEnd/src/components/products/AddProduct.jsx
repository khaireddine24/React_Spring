import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../InputField';
import Toast from '../Toast';

export function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: '',
    productPrice: '',
    dateCreation: new Date().toISOString().split('T')[0],
    category: { id: '' }
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const result = await axios.get('http://localhost:9090/api/categories');
      setCategories(result.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setProduct({ ...product, category: { id: value } });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { productName, productPrice, dateCreation, category } = product;

    if (!productName || !productPrice || !category.id) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9090/api/products', {
        productName,
        productPrice,
        dateCreation,
        category: { id: category.id }
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Product added successfully:', response.data);
      setToast({ message: 'Product added successfully!', type: 'success' });
      setTimeout(() => navigate('/dashboard/products'), 3000);
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
      setToast({ message: 'Failed to add product. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Product</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
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
              {loading ? (
                <option>Loading categories...</option>
              ) : (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            <Link
              to="/dashboard/products"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
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

export default AddProduct;