'use client';

import { useState, useEffect } from 'react';

const AddressForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        address: initialData.address || '',
        city: initialData.city || '',
        zip: initialData.zip || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) newErrors.zip = 'Invalid ZIP code.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const inputClass = (field) => `mt-1 block w-full rounded-lg border px-3 py-2 text-base shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:border-transparent ${errors[field] ? 'border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-black'}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-gray-900 mb-6">{initialData ? 'Edit Address' : 'Add New Address'}</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label htmlFor="firstName" className="block text-sm font-medium text-gray-800 mb-1">First Name</label><input type="text" id="firstName" value={formData.firstName} onChange={handleChange} className={inputClass('firstName')} />{errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}</div>
              <div><label htmlFor="lastName" className="block text-sm font-medium text-gray-800 mb-1">Last Name</label><input type="text" id="lastName" value={formData.lastName} onChange={handleChange} className={inputClass('lastName')} />{errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}</div>
            </div>
            <div><label htmlFor="address" className="block text-sm font-medium text-gray-800 mb-1">Address</label><input type="text" id="address" value={formData.address} onChange={handleChange} className={inputClass('address')} />{errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label htmlFor="city" className="block text-sm font-medium text-gray-800 mb-1">City</label><input type="text" id="city" value={formData.city} onChange={handleChange} className={inputClass('city')} />{errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}</div>
              <div><label htmlFor="zip" className="block text-sm font-medium text-gray-800 mb-1">ZIP Code</label><input type="text" id="zip" value={formData.zip} onChange={handleChange} className={inputClass('zip')} />{errors.zip && <p className="mt-1 text-xs text-red-600">{errors.zip}</p>}</div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={onCancel} className="px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm font-medium rounded-lg bg-black text-white hover:bg-gray-800 transition-colors">Save Address</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;