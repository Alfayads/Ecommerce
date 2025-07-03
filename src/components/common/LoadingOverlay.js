'use client';

import React from 'react';
import Spinner from './Spinner';

const LoadingOverlay = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Spinner size="lg" />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingOverlay;

