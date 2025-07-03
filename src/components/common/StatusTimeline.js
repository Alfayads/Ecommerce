'use client';

import React from 'react';
import { CreditCard, Package, Truck, Check, X } from 'lucide-react';

const StatusTimeline = ({ currentStatus }) => {
  const isCancelled = currentStatus === 'Cancelled';

  if (isCancelled) {
    return (
      <div className="flex items-center gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-full">
          <X size={20} />
        </div>
        <div>
          <p className="font-semibold text-red-800">Order Cancelled</p>
          <p className="text-sm text-red-600">This order has been cancelled.</p>
        </div>
      </div>
    );
  }

  const statuses = ['Pending Payment', 'Processing', 'Shipped', 'Delivered'];
  const currentStatusIndex = statuses.indexOf(currentStatus);

  const timelinePoints = [
    { name: 'Pending Payment', icon: <CreditCard size={20} />, message: 'Your order is awaiting payment.' },
    { name: 'Processing', icon: <Package size={20} />, message: 'Your order is being processed and will be shipped soon.' },
    { name: 'Shipped', icon: <Truck size={20} />, message: 'Your order has been shipped and is on its way.' },
    { name: 'Delivered', icon: <Check size={20} />, message: 'Your order has been successfully delivered.' },
  ];

  return (
    <div className="w-full py-4">
      <div className="flex items-start">
        {timelinePoints.map((point, index) => {
          const isDone = currentStatusIndex >= index;
          const isNextDone = currentStatusIndex >= index + 1;
          return (
            <React.Fragment key={point.name}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${isDone ? 'bg-black border-black text-white' : 'bg-gray-100 border-gray-300 text-gray-400'}`}>
                  {point.icon}
                </div>
                <p className={`mt-2 text-xs font-medium text-center ${isDone ? 'text-black' : 'text-gray-500'}`}>{point.name}</p>
              </div>
              {index < timelinePoints.length - 1 && (
                <div className={`flex-1 h-1 mt-5 rounded-full transition-colors ${isNextDone ? 'bg-black' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <p className="text-center mt-4 text-sm text-gray-600">
        {currentStatusIndex > -1 ? timelinePoints[currentStatusIndex]?.message : 'Order status is being updated.'}
      </p>
    </div>
  );
};

export default StatusTimeline;
