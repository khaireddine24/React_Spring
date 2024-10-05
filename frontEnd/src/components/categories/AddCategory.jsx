import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Toast from '../Toast';

export function AddCategory() {
  const [category, setCategory] = useState({ categoryName: '', categoryDescription: '' });
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const API_URL = 'http://localhost:9090/api/categories';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, category);
      setToast({ message: 'Category added successfully!', type: 'success' });
      setTimeout(() => navigate('/dashboard/categories'), 3000);
    } catch (error) {
      console.error('Error adding category:', error);
      setToast({ message: 'Failed to add category. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Category</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
            Category Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="categoryName"
            type="text"
            placeholder="Enter category name"
            value={category.categoryName}
            onChange={(e) => setCategory({...category, categoryName: e.target.value})}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryDescription">
            Category Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="categoryDescription"
            placeholder="Enter category description"
            value={category.categoryDescription}
            onChange={(e) => setCategory({...category, categoryDescription: e.target.value})}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Add Category
          </button>
          <Link to="/dashboard/categories" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Cancel
          </Link>
        </div>
      </form>
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

export default AddCategory;