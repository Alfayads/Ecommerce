'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

const SizeSelectionModal = ({ sizes, onSelectSize, onCancel, productName }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSelect = () => {
    if (selectedSize) {
      onSelectSize(selectedSize);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Select Size</h2>
          <button onClick={onCancel} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors">
            <X size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-6">For "{productName}"</p>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                selectedSize === size
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-800 border-gray-200 hover:border-black'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">Cancel</button>
          <button type="button" onClick={handleSelect} disabled={!selectedSize} className="px-5 py-2 text-sm font-medium rounded-lg bg-black text-white hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">Add and Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default SizeSelectionModal;