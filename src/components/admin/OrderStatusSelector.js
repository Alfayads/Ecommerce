'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Package, CheckCircle, XCircle, Truck, Wallet, ChevronDown } from 'lucide-react';
import { updateOrder } from '@/redux/slices/orderSlice';

const getStatusStyles = (status) => {
  const styles = {
    'Pending Payment': { icon: Wallet, classes: 'bg-orange-100 text-orange-800' },
    'Processing': { icon: Truck, classes: 'bg-blue-100 text-blue-800' },
    'Shipped': { icon: Package, classes: 'bg-yellow-100 text-yellow-800' },
    'Delivered': { icon: CheckCircle, classes: 'bg-green-100 text-green-800' },
    'Cancelled': { icon: XCircle, classes: 'bg-red-100 text-red-800' },
  };
  return styles[status] || { icon: Package, classes: 'bg-gray-100 text-gray-800' };
};

const OrderStatusSelector = ({ orderId, currentStatus }) => {
  const dispatch = useDispatch();
  const statuses = ['Pending Payment', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const handleStatusChange = (e) => {
    dispatch(updateOrder({ orderId, updates: { status: e.target.value } }));
  };

  const { icon: Icon, classes } = getStatusStyles(currentStatus);

  return (
    <div className={`relative inline-flex items-center rounded-full text-xs font-medium ${classes}`}>
      <Icon size={14} className="ml-2.5" />
      <select value={currentStatus} onChange={handleStatusChange} className={`pl-1.5 pr-7 py-1.5 appearance-none bg-transparent focus:outline-none border-none cursor-pointer`}>
        {statuses.map(status => (
          <option key={status} value={status} className="bg-white text-black">{status}</option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
};

export default OrderStatusSelector;