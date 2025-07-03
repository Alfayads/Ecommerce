import React from 'react';
import { Home, Edit, Trash2, CheckCircle } from 'lucide-react';

const AddressCard = ({ address, isPrimary, onEdit, onDelete, onSetPrimary }) => {
  return (
    <div className={`rounded-lg p-5 border-2 transition-all ${isPrimary ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-gray-800">{address.firstName} {address.lastName}</p>
          <p className="text-sm text-gray-600">{address.address}</p>
          <p className="text-sm text-gray-600">{address.city}, {address.zip}</p>
        </div>
        {isPrimary && (
          <div className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
            <CheckCircle size={14} />
            <span>Primary</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
        <button onClick={onEdit} className="text-sm font-medium text-gray-600 hover:text-black flex items-center gap-1.5">
          <Edit size={14} /> Edit
        </button>
        <button onClick={onDelete} className="text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-1.5">
          <Trash2 size={14} /> Delete
        </button>
        {!isPrimary && (
          <button onClick={onSetPrimary} className="text-sm font-medium text-gray-600 hover:text-black flex items-center gap-1.5 ml-auto">
            <Home size={14} /> Set as Primary
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;