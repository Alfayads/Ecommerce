'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/user/ProductCard';
import FilterSidebar from '@/components/user/FilterSidebar';
import productsData from '@/data/product';
import { SlidersHorizontal, X, Frown } from 'lucide-react';

const ProductsPage = () => {
  const maxProductPrice = useMemo(() => {
    if (!productsData || productsData.length === 0) {
      return 15000; // A sensible default if products are not loaded
    }
    return Math.ceil(Math.max(...productsData.map(p => p.price)));
  }, []);

  const [filters, setFilters] = useState({
    categories: [],
    maxPrice: maxProductPrice,
    colors: [],
    sortBy: 'newest',
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const allCategories = useMemo(() => [...new Set(productsData.map(p => p.category))], []);
  const allColors = useMemo(() => {
    const uniqueColors = new Map();
    productsData.forEach(p => {
      p.colors.forEach(c => {
        if (!uniqueColors.has(c.name.toLowerCase())) {
          uniqueColors.set(c.name.toLowerCase(), c);
        }
      });
    });
    return Array.from(uniqueColors.values());
  }, []);

  const filteredProducts = useMemo(() => {
    let products = [...productsData];

    if (filters.categories.length > 0) {
      products = products.filter(p => filters.categories.includes(p.category));
    }

    products = products.filter(p => p.price <= filters.maxPrice);

    if (filters.colors.length > 0) {
      products = products.filter(p => p.colors.some(c => filters.colors.includes(c.name)));
    }

    switch (filters.sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return products;
  }, [filters]);

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      maxPrice: maxProductPrice,
      colors: [],
      sortBy: 'newest',
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <p className="mt-2 text-sm text-gray-500">
            Showing {filteredProducts.length} of {productsData.length} products
          </p>
        </div>

        <div className="flex gap-8">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg z-30"
          >
            <SlidersHorizontal size={20} />
          </button>

          {/* Sidebar */}
          <aside className={`fixed inset-0 z-40 bg-black/40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <div className="absolute top-0 left-0 w-80 h-full bg-white shadow-xl">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                allCategories={allCategories}
                allColors={allColors.map(c => c.name)}
                onClose={() => setIsSidebarOpen(false)}
                onClearFilters={handleClearFilters}
                maxPrice={maxProductPrice}
              />
            </div>
          </aside>
          <aside className="hidden lg:block w-1/4 xl:w-1/5">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                allCategories={allCategories}
                allColors={allColors.map(c => c.name)}
                onClearFilters={handleClearFilters}
                maxPrice={maxProductPrice}
              />
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 pb-12">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-white rounded-lg shadow-sm col-span-full">
                <Frown className="mx-auto h-12 w-12 text-gray-400" />
                <h2 className="mt-4 text-xl font-medium text-gray-900">No products found</h2>
                <p className="mt-2 text-sm text-gray-500">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;