import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Package, Users, Tag } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard/products', name: 'Products', Icon: Package },
    { path: '/dashboard/users', name: 'Users', Icon: Users },
    { path: '/dashboard/categories', name: 'Categories', Icon: Tag },
  ];

  return (
    <div className="w-64 bg-gray-200 shadow-md fixed h-full">
      <div className="p-5 bg-gray-800">
        <h2 className="text-2xl font-semibold text-white">Admin Panel</h2>
      </div>
      <nav className="mt-6">
        {navItems.map(({ path, name, Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center py-3 px-4 text-gray-700 hover:bg-gray-400 transition-colors duration-200
              ${isActive ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}`
            }
          >
            <Icon className="mr-3 h-5 w-5" />
            {name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;