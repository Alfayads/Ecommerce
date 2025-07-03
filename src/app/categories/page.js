'use client';

import React from 'react';
import ProductCard from '@/components/user/ProductCard';
import productsData from '@/data/product';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const CategoriesPage = () => {
  const categories = [...new Set(productsData.map(p => p.category))];

  const productsByCategory = categories.map(category => ({
    category,
    products: productsData.filter(p => p.category === category).slice(0, 8), // Show up to 8 products
  }));

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Shop by Category</h1>
          <p className="mt-3 text-lg text-gray-500">
            Explore our curated collections for every style and occasion.
          </p>
        </div>

        <div className="space-y-16">
          {productsByCategory.map(({ category, products }) => (
            <section key={category}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">{category}</h2>
                <Link href={`/products?category=${category}`} className="text-sm font-medium text-black hover:underline flex items-center gap-1">
                  View All
                  <ChevronRight size={16} />
                </Link>
              </div>
              <div className="relative">
                <div className="flex gap-8 pb-4 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {products.map(product => (
                    <div key={product.id} className="flex-shrink-0">
                      <ProductCard {...product} />
                    </div>
                  ))}
                </div>
                {/* Fading effect for scroll */}
                <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white pointer-events-none"></div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;