'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { Lock } from 'lucide-react';

const CheckoutForm = ({ onFormSubmit, onFormChange, formData, errors, isNewAddress, saveAddress, onSaveAddressChange, paymentMethod, onPaymentMethodChange }) => {
  const { addresses, primaryAddressId } = useSelector((state) => state.profile);

  const handleSelectAddress = (address) => {
    onFormChange({
      ...formData,
      firstName: address.firstName || '',
      lastName: address.lastName || '',
      address: address.address || '',
      city: address.city || '',
      zip: address.zip || '',
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    onFormChange({ ...formData, [id]: value });
  };

  const inputClass = (field) => `mt-1 block w-full rounded-lg border px-3 py-2 text-base shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:border-transparent ${errors[field] ? 'border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500' : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-black'}`;

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <form onSubmit={onFormSubmit}>
        {/* Address Selector */}
        {addresses && addresses.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {addresses.map(addr => (
                <button
                  key={addr.id}
                  type="button"
                  onClick={() => handleSelectAddress(addr)}
                  className={`text-left p-3 border-2 rounded-lg hover:border-black transition-colors ${primaryAddressId === addr.id ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                >
                  <p className="font-medium">{addr.firstName} {addr.lastName}</p>
                  <p className="text-sm text-gray-600">{addr.address}, {addr.city}</p>
                </button>
              ))}
            </div>
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center" aria-hidden="true"><div className="w-full border-t border-gray-300" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-3 text-sm font-medium text-gray-500">OR ENTER A NEW ADDRESS</span></div>
            </div>
          </div>
        )}

        {/* Shipping Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">Shipping Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-800 mb-1">First Name</label>
              <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} className={inputClass('firstName')} />
              {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-800 mb-1">Last Name</label>
              <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} className={inputClass('lastName')} />
              {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-800 mb-1">Address</label>
              <input type="text" id="address" value={formData.address} onChange={handleChange} className={inputClass('address')} />
              {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-800 mb-1">City</label>
              <input type="text" id="city" value={formData.city} onChange={handleChange} className={inputClass('city')} />
              {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
            </div>
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-800 mb-1">ZIP / Postal Code</label>
              <input type="text" id="zip" value={formData.zip} onChange={handleChange} className={inputClass('zip')} />
              {errors.zip && <p className="mt-1 text-xs text-red-600">{errors.zip}</p>}
            </div>
          </div>
          {isNewAddress && (
            <div className="mt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveAddress}
                  onChange={(e) => onSaveAddressChange(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm font-medium text-gray-800">Save this address for future use</span>
              </label>
            </div>
          )}
        </div>

        {/* Payment Method Selection */}
        <div className="my-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">Payment Method</h2>
          <div className="grid grid-cols-1 gap-4">
            <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={onPaymentMethodChange} className="w-4 h-4 text-black border-gray-300 focus:ring-black" />
              <span className="text-sm font-medium text-gray-800">Credit/Debit Card</span>
            </label>
            <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'razorpay' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <input type="radio" name="paymentMethod" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={onPaymentMethodChange} className="w-4 h-4 text-black border-gray-300 focus:ring-black" />
              <span className="text-sm font-medium text-gray-800">Razorpay (UPI, Cards, Netbanking)</span>
            </label>
            <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={onPaymentMethodChange} className="w-4 h-4 text-black border-gray-300 focus:ring-black" />
              <span className="text-sm font-medium text-gray-800">Cash on Delivery</span>
            </label>
          </div>
        </div>

        {/* Payment Details */}
        {paymentMethod === 'card' && (
          <div className="transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">Payment Details</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-800 mb-1">Card Number</label>
                <input type="text" id="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="•••• •••• •••• ••••" className={inputClass('cardNumber')} />
                {errors.cardNumber && <p className="mt-1 text-xs text-red-600">{errors.cardNumber}</p>}
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-800 mb-1">Expiry Date</label>
                  <input type="text" id="expiryDate" value={formData.expiryDate} onChange={handleChange} placeholder="MM / YY" className={inputClass('expiryDate')} />
                  {errors.expiryDate && <p className="mt-1 text-xs text-red-600">{errors.expiryDate}</p>}
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-800 mb-1">CVC</label>
                  <input type="text" id="cvc" value={formData.cvc} onChange={handleChange} placeholder="123" className={inputClass('cvc')} />
                  {errors.cvc && <p className="mt-1 text-xs text-red-600">{errors.cvc}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'razorpay' && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700 transition-all duration-300">
            You will be redirected to Razorpay to complete your payment securely.
          </div>
        )}

        {paymentMethod === 'cod' && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700 transition-all duration-300">
            You have selected Cash on Delivery. Please pay the total amount when your order arrives.
          </div>
        )}

        <button type="submit" className="w-full mt-10 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
          <Lock size={16} />
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;