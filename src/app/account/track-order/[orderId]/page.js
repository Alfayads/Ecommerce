'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { ArrowLeft, AlertCircle, CreditCard } from 'lucide-react';
import StatusTimeline from '@/components/common/StatusTimeline';
import { updateOrder } from '@/redux/slices/orderSlice';
import useRazorpay from '@/hooks/useRazorpay';

const TrackOrderPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const { orderId } = params;
  const { orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const order = orders.find(o => o.id === orderId);
  const isRazorpayLoaded = useRazorpay();

  const handlePayNow = () => {
    if (!isRazorpayLoaded || !order) {
      alert('Payment gateway is loading or order is not found. Please try again.');
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.total * 100,
      currency: "INR",
      name: "Yadro Commerce",
      description: `Payment for Order #${order.id}`,
      handler: (response) => {
        dispatch(updateOrder({
          orderId: order.id,
          updates: {
            status: 'Processing',
            paymentDetails: response,
          }
        }));
        alert('Payment successful! Your order is now being processed.');
      },
      modal: {
        ondismiss: () => alert('Payment was not completed.')
      },
      prefill: { name: user ? `${user.firstName} ${user.lastName}` : '' },
      theme: { color: "#000000" }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (response) => {
      dispatch(updateOrder({
        orderId: order.id,
        updates: { paymentDetails: response.error }
      }));
      alert(`Payment failed: ${response.error.description}.`);
    });

    rzp.open();
  };

  if (!isClient) {
    return <div className="flex justify-center items-center h-screen"><p>Loading order details...</p></div>;
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
        <AlertCircle className="h-16 w-16 text-red-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Order Not Found</h1>
        <p className="text-gray-600 mt-2">We couldn't find an order with the ID #{orderId}.</p>
        <button onClick={() => router.push('/account/profile')} className="mt-6 bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
          Back to Profile
        </button>
      </div>
    );
  }

  const { shippingAddress } = order;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black mb-6">
          <ArrowLeft size={16} />
          Back to Order History
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Track Order #{order.id}</h1>
            <p className="text-sm text-gray-500 mt-1">Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          {/* Timeline */}
          <div className="p-6">
            <StatusTimeline currentStatus={order.status} />
            {order.status === 'Pending Payment' && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-4">Your payment is pending. Please complete the payment to process your order.</p>
                <button
                  onClick={handlePayNow}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CreditCard size={18} />
                  Pay Now (₹{order.total.toFixed(2)})
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
            {/* Order Items */}
            <div className="bg-white p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Order Items ({order.items.length})</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {order.items.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex items-start gap-4 pr-2">
                    <div className="relative w-16 h-20 rounded-md overflow-hidden border">
                      <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">Size: {item.size}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Payment */}
            <div className="bg-white p-6">
              {shippingAddress && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Shipping Address</h3>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    <p className="font-medium text-gray-800">{shippingAddress.firstName} {shippingAddress.lastName}</p>
                    <p>{shippingAddress.address}</p>
                    <p>{shippingAddress.city}, {shippingAddress.zip}</p>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Payment Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Payment Method</span>
                    <span className="font-medium text-gray-800">
                      {order.paymentMethod === 'cod' && 'Cash on Delivery'}
                      {order.paymentMethod === 'card' && 'Card'}
                      {order.paymentMethod === 'razorpay' && 'Razorpay'}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{order.subtotal.toFixed(2)}</span>
                  </div>
                  {order.discountAmount > 0 && order.appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (<span className="font-semibold">{order.appliedCoupon.code}</span>)</span>
                      <span>- ₹{order.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-base text-gray-900 border-t border-gray-200 pt-3 mt-3">
                    <span>Total {order.paymentMethod === 'cod' ? 'to Pay' : 'Paid'}</span>
                    <span>₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;