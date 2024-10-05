import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:9090/api/categories';

export function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, id: null });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const result = await axios.get(API_URL);
      console.log("API response:", result.data);
      setCategories(Array.isArray(result.data) ? result.data : []);
      setError(null);
    } catch (error) {
      console.error("Error loading categories:", error);
      setCategories([]);
      setError("Failed to load categories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirmation = (id) => {
    setDeleteConfirmation({ show: true, id });
  };

  const hideDeleteConfirmation = () => {
    setDeleteConfirmation({ show: false, id: null });
  };

  const deleteCategory = async () => {
    try {
      await axios.delete(`${API_URL}/${deleteConfirmation.id}`);
      loadCategories();
      hideDeleteConfirmation();
    } catch (error) {
      console.error("Error deleting category:", error);
      setError("Failed to delete category. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
          <Link to="/dashboard/categories/add" className="mt-4 md:mt-0 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Add Category
          </Link>
        </div>

        {categories.length === 0 ? (
          <p className="text-center">No categories found.</p>
        ) : (
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{category.categoryName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{category.categoryDescription}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link 
                          to={`view/${category.id}`} 
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                        >
                          View
                        </Link>
                        <Link 
                          to={`edit/${category.id}`} 
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => showDeleteConfirmation(category.id)} 
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteConfirmation.show && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Confirmation</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this category? This action cannot be undone.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-24 mr-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                  onClick={deleteCategory}
                >
                  Delete
                </button>
                <button
                  id="cancel-btn"
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-24 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={hideDeleteConfirmation}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}