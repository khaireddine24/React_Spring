import React, { useState,useEffect} from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';

export function ViewCategory() {
    const [category, setCategory] = useState({ categoryName: '', categoryDescription: '' });
    const { id } = useParams();
    const API_URL = 'http://localhost:9090/api/categories';
  
    useEffect(() => {
      loadCategory();
    }, []);
  
    const loadCategory = async () => {
      const result = await axios.get(`${API_URL}/${id}`);
      console.log(result);
      setCategory(result.data);
    };
  
    return (
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Category Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category Name
            </label>
            <p className="text-gray-700">{category.categoryName}</p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category Description
            </label>
            <p className="text-gray-700">{category.categoryDescription}</p>
          </div>
          <div className="flex items-center justify-center">
            <Link to="/dashboard/categories" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }