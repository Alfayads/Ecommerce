'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '@/components/user/ProductCard';
import productsData from '@/data/product';
import { Frown } from 'lucide-react';
import Link from 'next/link';

const WishlistPage = () => {
  const { itemIds: wishlistItemIds } = useSelector((state) => state.wishlist);

  // Filter the main product list to get the wishlisted items
  const wishlistedProducts = productsData.filter(product => wishlistItemIds.includes(product.id));

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
        
        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlistedProducts.map(product => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-lg shadow-sm">
            <Frown className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-xl font-medium text-gray-900">Your wishlist is empty.</h2>
            <p className="mt-2 text-sm text-gray-500">
              Looks like you haven't added anything yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;