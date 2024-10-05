import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export function ViewProduct() {
    const [product, setProduct] = useState({
      product_name: '',
      product_price: '',
      product_images: '',
      date_creation: '',
      category: null
    });
    const { id } = useParams();
  
    useEffect(() => {
      loadProduct();
    }, []);
  
    const loadProduct = async () => {
      try {
        const result = await axios.get(`http://localhost:9090/api/products/${id}`);
        setProduct(result.data);
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };
  
    return (
      <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Details</h2>
          <div className="bg-gray-100 rounded-lg p-6">
            {product.product_images && (
              <img 
                src={product.product_images} 
                alt={product.product_name} 
                className="w-full h-64 object-cover mb-4 rounded" 
              />
            )}
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Name:</span> {product.productName}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Price:</span> {product.productPrice}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Category:</span> {product.category ? product.category.categoryName : 'N/A'}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Date Created:</span> {product.dateCreation}
            </p>
          </div>
          <Link 
            to="/dashboard/products" 
            className="mt-6 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back
          </Link>
        </div>
      </div>
    );
  }