import React, { useState, useMemo } from 'react';
import { ShoppingCart, MousePointer, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import WishlistButton from '../common/WishlistButton';
import ConfirmDialog from '../common/ConfirmDialog';
import SizeSelectionModal from './SizeSelectionModal';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '@/redux/slices/cartSlice';
import { toggleWishlistItem } from '@/redux/slices/wishlistSlice';

const ProductCard = ({ 
  id = "#1483-12",
  name = "The Cotton Picnic Dress",
  price = 2324, // 28 * 83
  images = [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop&crop=center"
  ],
  colors = [
    { name: "Beige", color: "#F5F5DC" },
    { name: "Yellow", color: "#FFD700" },
    { name: "Blue", color: "#87CEEB" }
  ],
  availableColors = "3 colors available",
  sizes = ['S', 'M', 'L', 'XL']
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Get global state from Redux
  const { itemIds: wishlistItemIds } = useSelector((state) => state.wishlist);
  const { items: cartItems } = useSelector((state) => state.cart);

  // Derive component state from Redux store
  const isLiked = useMemo(() => wishlistItemIds.includes(id), [wishlistItemIds, id]);
  const cartItem = useMemo(() => cartItems.find(item => item.id === id && !item.size), [cartItems, id]);
  const isAdded = !!cartItem;

  // Local state for UI animations and transient states
  const [selectedColor, setSelectedColor] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddStep, setQuickAddStep] = useState(0);
  const [confirmingCartRemove, setConfirmingCartRemove] = useState(false);
  const [confirmingWishlistRemove, setConfirmingWishlistRemove] = useState(false);

  const handleAddToCart = async () => {
    if (isAdded) return; // Don't re-add if already in cart from this button
    setIsAdding(true);
    // Simulate a delay for visual feedback before updating the store
    setTimeout(() => {
      dispatch(addItemToCart({ id, name, price, images, colors, sizes }));
      setIsAdding(false);
    }, 1000);
  };

  const handleRemoveFromCart = () => {
    setConfirmingCartRemove(true);
  };

  const confirmRemoveFromCart = () => {
    dispatch(removeItemFromCart({ id, size: undefined }));
    setConfirmingCartRemove(false);
  };

  const handleToggleWishlist = () => {
    if (isLiked) {
      // If it's already liked, confirm removal
      setConfirmingWishlistRemove(true);
    } else {
      // If not liked, add it directly
      dispatch(toggleWishlistItem(id));
    }
  };

  const confirmToggleWishlist = () => {
    dispatch(toggleWishlistItem(id));
    setConfirmingWishlistRemove(false);
  };

  const handleQuickAdd = async (size) => {
    setShowQuickAdd(true);
    setQuickAddStep(0); // Preparing...
    
    // Step 1: Adding to cart
    setTimeout(() => {
      dispatch(addItemToCart({ id, name, price, images, colors, size }));
      setQuickAddStep(1); // Adding to Cart...
    }, 300);
    
    // Step 2: Added to cart
    setTimeout(() => setQuickAddStep(2), 1200); // ✓ Added to Cart!
    
    // Step 3: Going to checkout
    setTimeout(() => setQuickAddStep(3), 2000); // Proceeding to Checkout...
    
    // Step 4: Redirect
    setTimeout(() => {
      setQuickAddStep(4); // ✓ Redirecting...
      router.push('/checkout');
      setTimeout(() => {
        setShowQuickAdd(false);
        setQuickAddStep(0);
      }, 800);
    }, 2800);
  };

  const handleSizeSelected = (size) => {
    setShowSizeModal(false);
    handleQuickAdd(size);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextModalImage = (e) => {
    e.stopPropagation();
    setModalImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevModalImage = (e) => {
    e.stopPropagation();
    setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };



  const goToProductPage = () => {
  router.push(`/products/${id}`);
};

  return (
    <>
      {confirmingCartRemove && (
        <ConfirmDialog
          title="Remove from Cart?"
          message={`Are you sure you want to remove "${name}" from your cart?`}
          onCancel={() => setConfirmingCartRemove(false)}
          onConfirm={confirmRemoveFromCart}
        />
      )}

      {confirmingWishlistRemove && (
        <ConfirmDialog
          title="Remove from Wishlist?"
          message={`Are you sure you want to remove "${name}" from your wishlist?`}
          onCancel={() => setConfirmingWishlistRemove(false)}
          onConfirm={confirmToggleWishlist}
        />
      )}

      {showSizeModal && sizes && sizes.length > 0 && (
        <SizeSelectionModal
          sizes={sizes}
          productName={name}
          onCancel={() => setShowSizeModal(false)}
          onSelectSize={handleSizeSelected}
        />
      )}

      <div 
        className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 w-80 group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-[5/5]">
          <Image 
            src={images[currentImageIndex]} 
            alt={name}
            width={100}
            height={100}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={goToProductPage}
          />
          
          {/* Image Navigation - Shows on hover when multiple images */}
          {images.length > 1 && isHovered && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 opacity-80 hover:opacity-100"
              >
                <ChevronLeft size={14} className="text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 opacity-80 hover:opacity-100"
              >
                <ChevronRight size={14} className="text-gray-700" />
              </button>
            </>
          )}

          {/* Image Dots Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    currentImageIndex === index 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
          
          {/* Wishlist Button */}
          <WishlistButton isLiked={isLiked} toggleLike={handleToggleWishlist}/>

          {/* Quick Purchase Button - Shows on hover */}
          {sizes && sizes.length > 0 && (
            <div className={`absolute bottom-2 left-2 transition-all duration-300 z-10 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              <button onClick={() => setShowSizeModal(true)} className="flex items-center cursor-pointer gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-md text-xs font-medium text-black hover:bg-white transition-colors">
                <MousePointer size={12} />
                Quick Purchase
              </button>
            </div>
          )}


          {/* Shopping Cart Icon - Shows on hover */}
          <div className={`absolute bottom-2 right-2 transition-all duration-300 z-10 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`p-1.5 rounded-md text-white transition-all duration-300 ${
                isAdded 
                  ? 'bg-green-500 scale-110' 
                  : isAdding 
                    ? 'bg-gray-500' 
                    : 'bg-black hover:bg-gray-800'
              }`}
            >
              <ShoppingCart 
                size={24} 
                className={`transition-transform cursor-pointer duration-300 ${
                  isAdded ? 'scale-110' : isAdding ? 'animate-pulse' : ''
                }`} 
              />
            </button>
          </div>

          {/* Adding Status */}
          {(isAdding || isAdded) && (
            <div className={`absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-20 transition-opacity duration-300 ${isAdding || isAdded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                isAdded 
                  ? 'bg-green-500 text-white scale-110' 
                  : 'bg-white text-gray-700'
              }`}>
                {isAdded && !isAdding ? (
                  <>
                    <span>{`✓ Added (${cartItem.quantity})`}</span>
                    <button onClick={handleRemoveFromCart} className="p-1 rounded-full hover:bg-black/20 transition-colors">
                      <X size={16} />
                    </button>
                  </>
                ) : 'Adding...'}
              </div>
            </div>
          )}
        </div>

        {/* Quick Add Overlay */}
        {showQuickAdd && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-xl">
            <div className="text-center">
              {/* Product Image Animation */}
              <div className={`mb-6 transition-all duration-1000 ${
                quickAddStep >= 3 ? 'transform -translate-y-20 scale-75 opacity-0' : 'transform translate-y-0 scale-100 opacity-100'
              }`}>
                <div className="w-20 h-20 bg-white rounded-lg overflow-hidden mx-auto shadow-lg">
                  <Image
                    src={images[currentImageIndex]} 
                    width={100}
                    height={100}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Status Messages */}
              <div className="text-white text-center space-y-2">
                {quickAddStep === 0 && (
                  <div className="animate-pulse">
                    <p className="text-lg font-semibold">Preparing...</p>
                  </div>
                )}
                {quickAddStep === 1 && (
                  <div className="animate-bounce">
                    <p className="text-lg font-semibold">Adding to Cart...</p>
                    <div className="flex items-center justify-center mt-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    </div>
                  </div>
                )}
                {quickAddStep === 2 && (
                  <div className="animate-pulse">
                    <p className="text-lg font-semibold text-green-400">✓ Added to Cart!</p>
                    <p className="text-sm opacity-80">{name}</p>
                  </div>
                )}
                {quickAddStep === 3 && (
                  <div className="animate-bounce">
                    <p className="text-lg font-semibold">Proceeding to Checkout...</p>
                    <div className="flex items-center justify-center mt-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    </div>
                  </div>
                )}
                {quickAddStep === 4 && (
                  <div className="animate-pulse">
                    <p className="text-lg font-semibold text-green-400">✓ Redirecting...</p>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-6 w-48 bg-white/20 rounded-full h-1 mx-auto">
                <div 
                  className="bg-white h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(quickAddStep + 1) * 20}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Product Info */}
        <div className="space-y-3">
          {/* Product ID */}
          <p className="text-sm text-gray-500 font-medium">{id}</p>

          {/* Product Name and Price */}
          <div className="flex justify-between items-start">
            <h3 className="text-base font-semibold text-gray-900 leading-tight hover:underline cursor-pointer flex-1" onClick={goToProductPage}>{name}</h3>
            <p className="text-base font-bold text-gray-900 ml-3">₹{price.toFixed(2)}</p>
          </div>

          {/* Colors */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">{availableColors}</p>
            <div className="flex gap-2">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-6 h-6 cursor-pointer rounded-full border-2 transition-all ${
                    selectedColor === index 
                      ? 'border-gray-400 scale-110' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;