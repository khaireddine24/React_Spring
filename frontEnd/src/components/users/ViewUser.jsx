import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export function ViewUser() {
    const [user, setUser] = useState({ email: '', username: '', password: '' });
    const { id } = useParams();
  
    useEffect(() => {
      loadUser();
    }, []);
  
    const loadUser = async () => {
      const result = await axios.get(`http://localhost:9090/user/${id}`);
      setUser(result.data);
    };
  
    return (
      <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">User Details</h2>
          <div className="bg-gray-100 rounded-lg p-6">
            <p className="text-gray-700 mb-2"><span className="font-bold">User ID:</span> {user.id}</p>
            <p className="text-gray-700 mb-2"><span className="font-bold">Email:</span> {user.email}</p>
            <p className="text-gray-700 mb-2"><span className="font-bold">Username:</span> {user.username}</p>
            <p className="text-gray-700"><span className="font-bold">Password:</span>{user.password}</p>
          </div>
          <Link to="/dashboard/users" className="mt-6 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Back
          </Link>
        </div>
      </div>
    );
  }
  