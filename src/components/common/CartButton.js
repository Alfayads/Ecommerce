// components/common/CartButton.js
import React from 'react';
import { ShoppingCart } from 'lucide-react';

const CartButton = ({
  onClick,
  isAdding = false,
  isAdded = false,
  isVisible = true,
  icon: Icon = ShoppingCart,
  positionClasses = 'absolute bottom-3 right-3',
  size = 'px-2.5 py-1.5',
  defaultColor = 'bg-black',
  hoverColor = 'hover:bg-gray-800',
  addingColor = 'bg-gray-500',
  addedColor = 'bg-green-500',
  containerClass = '',
  buttonClass = '',
  iconClass = '',
  children,
}) => {
  const visibilityClass = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-2';

  const dynamicColor = isAdded
    ? addedColor
    : isAdding
    ? addingColor
    : `${defaultColor} ${hoverColor}`;

  const dynamicScale = isAdded
    ? 'scale-110'
    : '';

  return (
    <div
      className={`${positionClasses} transition-all duration-300 z-10 ${visibilityClass} ${containerClass}`}
    >
      <button
        onClick={onClick}
        disabled={isAdding || isAdded}
        className={`${size} rounded-lg text-white shadow-sm transition-all duration-300 ${dynamicColor} ${dynamicScale} ${buttonClass}`}
      >
        {children ? (
          children
        ) : (
          <Icon
            size={12}
            className={`transition-transform duration-300 ${
              isAdded ? 'scale-125' : isAdding ? 'animate-pulse' : ''
            } ${iconClass}`}
          />
        )}
      </button>
    </div>
  );
};

export default CartButton;
