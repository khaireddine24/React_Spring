import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export function StatPanel() {
  const [stats, setStats] = useState({ users: 0, products: 0, categories: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersResponse, productsResponse, categoriesResponse] = await Promise.all([
          axios.get("http://localhost:9090/users"),
          axios.get("http://localhost:9090/api/products"),
          axios.get("http://localhost:9090/api/categories")
        ]);

        setStats({
          users: usersResponse.data.length,
          products: productsResponse.data.length,
          categories: categoriesResponse.data.length
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading stats...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Users" 
          count={stats.users} 
          gradient="from-blue-500 to-indigo-600"
          icon="👥"
        />
        <StatCard 
          title="Products" 
          count={stats.products} 
          gradient="from-green-400 to-teal-500"
          icon="🛍️"
        />
        <StatCard 
          title="Categories" 
          count={stats.categories} 
          gradient="from-purple-500 to-pink-500"
          icon="📊"
        />
      </div>
    </div>
  );
}

function StatCard({ title, count, gradient, icon }) {
  return (
    <motion.div 
      className={`bg-gradient-to-br ${gradient} rounded-lg shadow-lg p-6 text-white`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <motion.p 
        className="text-3xl font-bold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
      >
        {count}
      </motion.p>
    </motion.div>
  );
}