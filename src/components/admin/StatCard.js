'use client';

import React from 'react';

const StatCard = ({ icon: Icon, title, value, description }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-6">
    <div className="bg-gray-100 p-4 rounded-full">
      <Icon className="w-6 h-6 text-gray-600" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
    </div>
  </div>
);

export default StatCard;