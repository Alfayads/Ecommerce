'use client';

import React from 'react';
import { X } from 'lucide-react';

const FilterSidebar = ({
  filters,
  setFilters,
  allCategories,
  allColors,
  onClose,
  onClearFilters,
  maxPrice,
}) => {
  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    setFilters({ ...filters, categories: newCategories });
  };

  const handleColorChange = (color) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    setFilters({ ...filters, colors: newColors });
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, maxPrice: Number(e.target.value) });
  };

  const handleSortChange = (e) => {
    setFilters({ ...filters, sortBy: e.target.value });
  };

  return (
    <div className="bg-white h-full p-6 space-y-8 overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
        <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Categories</h3>
        <div className="space-y-2">
          {allCategories.map((category) => (
            <label key={category} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="text-gray-600">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹0</span>
            <span>₹{filters.maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={`w-8 h-8 rounded-full border-2 transition-transform duration-150 ${
                filters.colors.includes(color)
                  ? 'border-black scale-110'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={onClearFilters}
        className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;