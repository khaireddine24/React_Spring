import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="bg-gray-600 shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <div className="flex items-center">
          <span className="mr-4 text-white font-bold">Welcome, Admin</span>
          <button
            onClick={handleLogout}
            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;