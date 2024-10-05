import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { StatPanel } from './StatPanel';
import { Footer } from './Footer';

export const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto pt-24 pb-8 px-8">
          <StatPanel/>
          <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  );
}

export default AdminDashboard;