import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import InputField from "../InputField";
import Toast from '../Toast';

export function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({ email: '', username: '', password: '' });
    const [toast, setToast] = useState(null);
  
    useEffect(() => {
      loadUser();
    }, []);
  
    const onInputChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`http://localhost:9090/user/${id}`, user);
        setToast({ message: 'User updated successfully!', type: 'success' });
        setTimeout(() => navigate('/dashboard/users'), 3000);
      } catch (error) {
        console.error('Error updating user:', error);
        setToast({ message: 'Failed to update user. Please try again.', type: 'error' });
      }
    };
  
    const loadUser = async () => {
      try {
        const result = await axios.get(`http://localhost:9090/user/${id}`);
        setUser(result.data);
      } catch (error) {
        console.error('Error loading user:', error);
        setToast({ message: 'Failed to load user. Please try again.', type: 'error' });
      }
    };
  
    return (
      <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit User</h2>
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
              <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Update
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

export default EditUser;