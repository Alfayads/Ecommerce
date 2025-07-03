'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/redux/slices/productSlice';
import ProductCard from "./ProductCard";
import Spinner from '../common/Spinner';


export default function HomeContent() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Fetch products only if the store is empty
    if (isClient && products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, isClient]);

  if (!isClient) {
  
    return null;
  }
  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <Spinner size="lg" />
            <p className="mt-4 text-gray-600">Fetching products...</p>
          </div>
        )}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && !error && (
        <div className="flex flex-wrap gap-8 justify-start">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
        )}
      </div>
    </div>
    </div>
  );
}
