'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CheckCircle, Truck, XCircle, ShoppingBag, ChevronDown, ChevronUp, Tag, Ban, Repeat, PackageSearch, PackageCheck, Wallet, CreditCard } from 'lucide-react';
import { cancelOrder, updateOrder } from '@/redux/slices/orderSlice';
import { addItemsToCart } from '@/redux/slices/cartSlice';
import { fetchProducts } from '@/redux/slices/productSlice';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import useRazorpay from '@/hooks/useRazorpay';

const statusInfo = {
  'Pending Payment': { icon: <Wallet size={16} className="text-orange-500" />, text: 'Pending Payment', color: 'text-orange-600' },
  Processing: { icon: <Truck size={16} className="text-blue-500" />, text: 'Processing', color: 'text-blue-600' },
  Shipped: { icon: <PackageCheck size={16} className="text-yellow-500" />, text: 'Shipped', color: 'text-yellow-600' },
  Delivered: { icon: <CheckCircle size={16} className="text-green-500" />, text: 'Delivered', color: 'text-green-600' },
  Cancelled: { icon: <XCircle size={16} className="text-red-500" />, text: 'Cancelled', color: 'text-red-600' },
};

const OrderCard = ({ order, isExpanded, onToggleDetails, onCancel, onReorder, onTrackOrder, onPayNow }) => {
  const { icon, text, color } = statusInfo[order.status] || {};

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300">
      {/* Collapsed View / Header */}
      <div className="p-6 cursor-pointer" onClick={onToggleDetails}>
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-800">Order #{order.id}</h3>
            <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className={`flex items-center gap-2 text-sm font-medium ${color}`}>
            {icon}
            <span>{text}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
            <div>
                <p className="text-sm text-gray-500">{order.items.length} item(s)</p>
                <p className="font-semibold text-lg text-gray-900">Total: ₹{order.total.toFixed(2)}</p>
            </div>
            <button className="flex items-center gap-1 text-sm font-medium text-black">
                {isExpanded ? 'Hide Details' : 'View Details'}
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
        </div>
      </div>

      {/* Expanded View - Details */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Order Items</h4>
          <div className="space-y-4 mb-6">
            {order.items.map(item => (
              <div key={`${order.id}-${item.id}-${item.size}`} className="flex items-center gap-4">
                <div className="w-16 h-20 rounded-md overflow-hidden bg-gray-100 relative">
                  <Image src={item.image} alt={item.name} layout="fill" className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">Size: {item.size} | Qty: {item.quantity}</p>
                  <p className="text-xs text-gray-500">Price: ₹{item.price.toFixed(2)}</p>
                </div>
                <p className="font-semibold text-sm text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-gray-800 mb-4">Price Details</h4>
          <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            {order.discountAmount > 0 && order.appliedCoupon && (
                <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1.5">
                        <Tag size={14} />
                        Coupon Discount ({order.appliedCoupon.code})
                    </span>
                    <span>- ₹{order.discountAmount.toFixed(2)}</span>
                </div>
            )}
             <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
            <div className="flex justify-between font-bold text-base text-gray-900 border-t border-gray-200 pt-3 mt-3">
                <span>Total Paid</span>
                <span>₹{order.total.toFixed(2)}</span>
            </div>
            {order.paymentMethod && (
              <div className="flex justify-between text-xs text-gray-500 pt-1">
                <span>Payment Method:</span>
                <span className="font-medium">
                  {order.paymentMethod === 'cod' && 'Cash on Delivery'}
                  {order.paymentMethod === 'card' && 'Card'}
                  {order.paymentMethod === 'razorpay' && 'Razorpay'}
                </span>
              </div>
            )}
          </div>
          {['Processing', 'Shipped'].includes(order.status) && (
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onTrackOrder}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <PackageSearch size={16} />
                Track Order
              </button>
              {order.status === 'Processing' && (
                <button
                  onClick={onCancel}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Ban size={16} />
                  Cancel Order
                </button>
              )}
            </div>
          )}
          {order.status === 'Pending Payment' && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={onPayNow}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                <CreditCard size={16} />
                Pay Now
              </button>
            </div>
          )}
          {order.status === 'Cancelled' && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={onReorder}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Repeat size={16} />
                Re-order
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const OrderHistory = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { items: products, loading: productsLoading } = useSelector((state) => state.products);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [reorderingOrder, setReorderingOrder] = useState(null);
  const isRazorpayLoaded = useRazorpay();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Ensure products are loaded, as they are needed for re-ordering.
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const handleToggleDetails = (orderId) => {
    setExpandedOrderId(prevId => (prevId === orderId ? null : orderId));
  };

  const handleCancelOrder = (orderId) => {
    setCancellingOrderId(orderId);
  };

  const confirmCancelOrder = () => {
    if (cancellingOrderId) {
      dispatch(cancelOrder(cancellingOrderId));
      setCancellingOrderId(null);
    }
  };

  const handleReorder = (order) => {
    setReorderingOrder(order);
  };

  const handleTrackOrder = (orderId) => {
    router.push(`/account/track-order/${orderId}`);
  };

  const handlePayNow = (order) => {
    if (!isRazorpayLoaded) {
      alert('Payment gateway is loading. Please try again in a moment.');
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
        ondismiss: function() {
          alert('Payment was not completed.');
        }
      },
      prefill: { name: user ? `${user.firstName} ${user.lastName}` : '' },
      theme: { color: "#000000" }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (response) => {
      dispatch(updateOrder({ orderId: order.id, updates: { paymentDetails: response.error } }));
      alert(`Payment failed: ${response.error.description}.`);
    });

    rzp.open();
  };

  const confirmReorder = () => {
    if (!reorderingOrder || productsLoading || products.length === 0) return;

    const productsMap = new Map(products.map(p => [p.id, p]));

    const itemsToAdd = reorderingOrder.items
      .map(orderItem => {
        const product = productsMap.get(orderItem.id);
        if (product) {
          return { product, quantity: orderItem.quantity, size: orderItem.size };
        }
        console.warn(`Product with ID ${orderItem.id} not found for re-order.`);
        return null;
      })
      .filter(Boolean);

    if (itemsToAdd.length > 0) {
      dispatch(addItemsToCart(itemsToAdd));
      router.push('/checkout');
    }
    setReorderingOrder(null);
  };

  // Sort orders by date, newest first
  const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <ShoppingBag size={20} />
        Order History
      </h2>
      {sortedOrders.length > 0 ? (
        <div className="space-y-4">
          {sortedOrders.map(order => (
            <OrderCard 
                key={order.id} 
                order={order} 
                isExpanded={expandedOrderId === order.id}
                onToggleDetails={() => handleToggleDetails(order.id)}
                onCancel={() => handleCancelOrder(order.id)}
                onReorder={() => handleReorder(order)}
                onTrackOrder={() => handleTrackOrder(order.id)}
                onPayNow={() => handlePayNow(order)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 px-4 bg-gray-50 rounded-lg"><ShoppingBag className="mx-auto h-12 w-12 text-gray-400" /><h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3><p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p></div>
      )}

      {cancellingOrderId && (
        <ConfirmDialog
          title="Cancel Order?"
          message="Are you sure you want to cancel this order? This action cannot be undone."
          onConfirm={confirmCancelOrder}
          onCancel={() => setCancellingOrderId(null)}
          icon={<Ban className="text-red-500" size={24} />}
        />
      )}

      {reorderingOrder && (
        <ConfirmDialog
          title="Re-order Items?"
          message="This will add all items from this order to your current cart. Do you want to proceed?"
          onConfirm={confirmReorder}
          onCancel={() => setReorderingOrder(null)}
          icon={<Repeat className="text-blue-500" size={24} />}
        />
      )}
    </section>
  );
};

export default OrderHistory;