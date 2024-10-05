import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../InputField';
import Toast from '../Toast';

export function AddUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', username: '', password: '' });
  const [toast, setToast] = useState(null);

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9090/user', user);
      setToast({ message: 'User added successfully!', type: 'success' });
      setTimeout(() => navigate('/dashboard/users'), 3000);
    } catch (error) {
      console.error('Error adding user:', error);
      setToast({ message: 'Failed to add user. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Register User</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={onInputChange}
          />
          <InputField
            label="Username"
            name="username"
            type="text"
            value={user.username}
            onChange={onInputChange}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={onInputChange}
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
            <Link to="/dashboard/users" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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

export default AddUser;