// components/ConfirmDialog.js
'use client';

import React from 'react';
import { MousePointer } from 'lucide-react';

const ConfirmDialog = ({
  title = 'Proceed to Checkout?',
  message = 'Are you sure you want to continue?',
  icon = <MousePointer className="text-yellow-600" size={20} />,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-scaleIn">
        <div className="text-center">
          <div className="mb-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              {icon}
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {title}
          </h2>
          <p className="text-sm text-gray-600 mb-4">{message}</p>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm cursor-pointer font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm cursor-pointer font-medium rounded-lg bg-black text-white hover:bg-gray-800"
          >
            Yes, Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
