'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { incrementItemQuantity, decrementItemQuantity, applyCoupon, removeCoupon } from '@/redux/slices/cartSlice';
import { Plus, Minus, Trash2, Tag, X } from 'lucide-react';

const coupons = [
  { id: 'C1', code: 'SUMMER10', discount: 10, type: 'percentage', description: '10% off your order' },
  { id: 'C2', code: 'SAVE500', discount: 500, type: 'fixed', description: '₹500 off your order' },
  { id: 'C3', code: 'FREESHIP', discount: 0, type: 'shipping', description: 'Free shipping (already applied)' },
];

const OrderSummary = ({ onRemoveItem, productsMap }) => {
  const dispatch = useDispatch();
  const {
    items: cartItems,
    subtotal,
    discountAmount,
    totalAmount,
    totalQuantity,
    appliedCoupon
  } = useSelector((state) => state.cart);

  const [couponCode, setCouponCode] = React.useState('');
  const [couponMessage, setCouponMessage] = React.useState({ type: '', text: '' });

  const handleIncrement = (item) => dispatch(incrementItemQuantity(item));
  const handleDecrement = (item) => dispatch(decrementItemQuantity(item));

  const handleApplyCoupon = () => {
    const coupon = coupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    if (coupon) {
      dispatch(applyCoupon(coupon));
      setCouponMessage({ type: 'success', text: `Coupon "${coupon.code}" applied!` });
      setCouponCode('');
      setTimeout(() => setCouponMessage({ type: '', text: '' }), 3000);
    } else {
      setCouponMessage({ type: 'error', text: 'Invalid coupon code.' });
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponMessage({ type: '', text: 'Coupon removed.' });
    setTimeout(() => setCouponMessage({ type: '', text: '' }), 3000);
  };

  const handleSelectCoupon = (coupon) => {
    dispatch(applyCoupon(coupon));
    setCouponMessage({ type: 'success', text: `Coupon "${coupon.code}" applied!` });
    setCouponCode('');
    setTimeout(() => setCouponMessage({ type: '', text: '' }), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 h-fit">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">Order Summary ({totalQuantity} items)</h2>
      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
        {cartItems.map(item => {
          const product = productsMap.get(item.id);
          if (!product) return null;
          return (
            <div key={`${item.id}-${item.size || 'no-size'}`} className="flex items-start gap-4">
              <div className="relative w-16 h-20 rounded-md overflow-hidden border">
                <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">₹{(item.totalPrice || 0).toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center border border-black rounded-md">
                  <button onClick={() => handleDecrement({ id: item.id, size: item.size })} className="p-1 hover:bg-gray-100 text-black cursor-pointer transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="px-3 text-sm font-medium text-black">{item.quantity}</span>
                  <button onClick={() => handleIncrement({ id: item.id, size: item.size })} className="p-1 hover:bg-gray-100 text-black cursor-pointer transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
                <button onClick={() => onRemoveItem({ id: item.id, size: item.size })} className="text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Coupon Section */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Apply Coupon</h3>
        {appliedCoupon ? (
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Tag className="text-green-600" size={18} />
              <p className="font-medium text-green-700">
                <span className="font-bold">{appliedCoupon.code}</span> applied!
              </p>
            </div>
            <button onClick={handleRemoveCoupon} className="p-1 rounded-full text-green-600 hover:bg-green-100">
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase());
                  if (couponMessage.text) setCouponMessage({ type: '', text: '' });
                }}
                placeholder="Enter coupon code"
                className="flex-grow mt-1 block w-full rounded-lg border px-3 py-2 text-base shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:border-transparent border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-black"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={!couponCode}
                className="mt-1 bg-black text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
            {couponMessage.text && (
              <p className={`mt-2 text-xs ${couponMessage.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{couponMessage.text}</p>
            )}
            <div className="my-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">✨ Available Coupons</h3>
              <div className="space-y-2">
                {coupons.map((coupon) => (
                  <button
                    key={coupon.id}
                    type="button"
                    onClick={() => handleSelectCoupon(coupon)}
                    className="w-full text-left p-2 bg-white rounded-md border border-dashed border-yellow-400 hover:bg-yellow-100 transition-colors"
                  >
                    <p className="font-bold text-sm text-yellow-800">{coupon.code}</p>
                    <p className="text-xs text-gray-600">{coupon.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 pt-6 border-t space-y-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{(subtotal || 0).toFixed(2)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Discount</span>
            <span className="text-green-600">- ₹{discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-gray-900 border-t pt-4 mt-4">
          <span>Total</span>
          <span>₹{(totalAmount || 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;