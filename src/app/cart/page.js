'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import {
  removeItemFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
  updateItemSize,
  applyCoupon,
  removeCoupon,
} from '@/redux/slices/cartSlice';
import productsData from '@/data/product';
import { Trash2, Plus, Minus, ShoppingBag, Tag, X } from 'lucide-react';
import Link from 'next/link';
import ConfirmDialog from '@/components/common/ConfirmDialog';

const coupons = [
  { id: 'C1', code: 'SUMMER10', discount: 10, type: 'percentage', description: '10% off your order' },
  { id: 'C2', code: 'SAVE500', discount: 500, type: 'fixed', description: '₹500 off your order' },
  { id: 'C3', code: 'FREESHIP', discount: 0, type: 'shipping', description: 'Free shipping (already applied)' },
];

const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    items: cartItems,
    subtotal,
    discountAmount,
    totalAmount,
    appliedCoupon,
  } = useSelector((state) => state.cart);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [discountInput, setDiscountInput] = useState('');
  const [couponMessage, setCouponMessage] = useState({ type: '', text: '' });

  const productsMap = useMemo(() => new Map(productsData.map((p) => [p.id, p])), []);

  const productForDialog = itemToRemove
    ? productsMap.get(itemToRemove.id)
    : null;

  const getProductDetails = (id) => {
    return productsMap.get(id);
  };

  const handleSizeChange = (item, newSize) => {
    dispatch(updateItemSize({ id: item.id, oldSize: item.size, newSize }));
  };

  const handleProceedToCheckout = () => {
    const itemsWithoutSize = cartItems.some(
      (item) => item.sizes && item.sizes.length > 0 && !item.size
    );
    if (itemsWithoutSize) {
      alert('Please select a size for all items before proceeding.');
      return;
    }
    router.push('/checkout');
  };

  const handleRemove = (item) => {
    setItemToRemove(item);
  };

  const handleIncrement = (item) => {
    dispatch(incrementItemQuantity({ id: item.id, size: item.size }));
  };

  const handleDecrement = (item) => {
    dispatch(decrementItemQuantity({ id: item.id, size: item.size }));
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      dispatch(removeItemFromCart(itemToRemove));
      setItemToRemove(null);
    }
  };

  const cancelRemove = () => {
    setItemToRemove(null);
  };

  const handleApplyDiscount = () => {
    const coupon = coupons.find(c => c.code.toLowerCase() === discountInput.toLowerCase());
    if (coupon) {
      dispatch(applyCoupon(coupon));
      setCouponMessage({ type: 'success', text: `Coupon "${coupon.code}" applied!` });
      setDiscountInput('');
      setTimeout(() => setCouponMessage({ type: '', text: '' }), 3000);
    } else {
      setCouponMessage({ type: 'error', text: 'Invalid coupon code.' });
    }
  };

  const handleRemoveDiscount = () => {
    dispatch(removeCoupon());
    setCouponMessage({ type: '', text: 'Coupon removed.' });
    setTimeout(() => setCouponMessage({ type: '', text: '' }), 3000);
  };

  const handleSelectCoupon = (code) => {
    const coupon = coupons.find(c => c.code.toLowerCase() === code.toLowerCase());
    if (coupon) {
      dispatch(applyCoupon(coupon));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 space-y-6">
              {cartItems.map((item) => {
                const product = getProductDetails(item.id);
                if (!product) return null;

                return (
                  <div
                    key={`${item.id}-${item.size || 'no-size'}`}
                    className="flex items-center gap-6 border-b pb-6 last:border-b-0"
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={100}
                      height={120}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>

                      <div className="mt-2">
                        <label htmlFor={`size-select-${item.id}`} className="text-sm font-medium text-gray-600">
                          Size:
                        </label>
                        {item.sizes && item.sizes.length > 0 ? (
                          <select
                          style={{borderColor: 'black'}}
                            id={`size-select-${item.id}`}
                            value={item.size || ''}
                            onChange={(e) => handleSizeChange(item, e.target.value)}
                            className="mt-1 block w-full max-w-[120px] pl-3 pr-10 py-2 text-base border-gray-800 border cursor-pointer focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md text-black"
                          >
                            <option value="" disabled>Select a size</option>
                            {item.sizes.map((size) => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-sm text-gray-500 mt-1">One Size</p>
                        )}
                        {item.sizes && item.sizes.length > 0 && !item.size && (
                          <p className="text-red-500 text-xs mt-1">Please select a size.</p>
                        )}
                      </div>

                      <p className="text-lg font-bold text-gray-900 mt-2">
                        ₹{(item.totalPrice || 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-black rounded-md">
                        <button onClick={() => handleDecrement(item)} className="p-2 hover:bg-gray-100 cursor-pointer transition-colors text-black">
                          <Minus size={16} />
                        </button>
                        <span className="px-4 font-medium text-black">{item.quantity}</span>
                        <button onClick={() => handleIncrement(item)} className="p-2 hover:bg-gray-100 cursor-pointer transition-colors text-black">
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item)}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-4">Order Summary</h2>

                {/* Available Coupons */}
                <div className="my-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm">✨ Available Coupons</h3>
                  <div className="space-y-2">
                    {coupons.map(({ code, description }) => (
                      <button
                        key={code}
                        onClick={() => handleSelectCoupon(code)}
                        disabled={!!appliedCoupon}
                        className="w-full text-left p-2 bg-white rounded-md border border-dashed border-yellow-400 hover:bg-yellow-100 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
                      >
                        <p className="font-bold text-sm text-yellow-800">{code}</p>
                        <p className="text-xs text-gray-600">{description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 mt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{(subtotal || 0).toFixed(2)}</span>
                  </div>

                  {/* Discount Code Input */}
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium text-gray-700">Apply Coupon</h3>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Tag className="text-green-600" size={18} />
                          <p className="font-medium text-green-700">
                            <span className="font-bold">{appliedCoupon.code}</span> applied!
                          </p>
                        </div>
                        <button onClick={handleRemoveDiscount} className="p-1 rounded-full text-green-600 hover:bg-green-100">
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex gap-2 mt-1">
                          <input
                            type="text"
                            value={discountInput}
                            onChange={(e) => {
                              setDiscountInput(e.target.value.toUpperCase());
                              if (couponMessage.text) setCouponMessage({ type: '', text: '' });
                            }}
                            placeholder="Enter coupon code"
                            className="flex-grow block w-full rounded-lg border px-3 py-2 text-base shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:border-transparent border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-black"
                          />
                          <button type="button" onClick={handleApplyDiscount} disabled={!discountInput} className="bg-black text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Apply
                          </button>
                        </div>
                        {couponMessage.text && <p className={`mt-2 text-xs ${couponMessage.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{couponMessage.text}</p>}
                      </>
                    )}
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
                  <div className="flex justify-between font-bold text-lg text-gray-900 border-t pt-4">
                    <span>Total</span>
                    <span>₹{(totalAmount || 0).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full mt-6 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={cartItems.some(
                    (item) => item.sizes && item.sizes.length > 0 && !item.size
                  )}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-lg shadow-sm">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-xl font-medium text-gray-900">Your cart is empty.</h2>
            <p className="mt-2 text-sm text-gray-500">Browse our products and add items to your cart.</p>
            <Link
              href="/products"
              className="mt-6 inline-block bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}

        {itemToRemove && productForDialog && (
          <ConfirmDialog
            title="Remove from Cart?"
            message={`Are you sure you want to remove "${productForDialog.name}" ${
              itemToRemove.size ? `(Size: ${itemToRemove.size})` : ''
            } from your cart?`}
            onConfirm={confirmRemove}
            onCancel={cancelRemove}
          />
        )}
      </div>
    </div>
  );
};

export default CartPage;