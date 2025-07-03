'use client';

import React from 'react';

const Spinner = ({ size = 'md', color = 'black' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const colorClasses = {
    black: 'border-black',
    white: 'border-white',
  };

  return (
    <div
      className={`animate-spin rounded-full border-t-2 border-r-2 border-b-2 ${sizeClasses[size]} ${colorClasses[color]} border-t-transparent border-r-transparent`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;

