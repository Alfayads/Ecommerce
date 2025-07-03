'use client';

import React, { useEffect, useState } from 'react';
import { Heart, Star, Shield, Truck, Award, MousePointer, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useParams } from 'next/navigation';
import products from '@/data/product';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '@/redux/slices/cartSlice';
import { LoadingOverlay } from '@mantine/core';

const ProductDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('Description');
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
   const params = useParams();
  const productId = params?.id; // Get dynamic route ID
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const reviews = [
    { name: 'Sophie B.', rating: 5, text: 'Absolutely love this top! The quality is amazing and it fits perfectly.', date: '2 days ago' },
    { name: 'John D.', rating: 4, text: 'Great product, very comfortable. The color is slightly different than pictured but still nice.', date: '1 week ago' },
  ];


  useEffect(() => {
    if (productId) {
      const foundProduct = products.find(p => p.id === productId);
      setProduct(foundProduct);
    }
  }, [productId]);

  if (!product) {
    // You can return a loading spinner or a placeholder here
    return <LoadingOverlay message="Loading product details..." />;
  }

  /**
   * Parses a price value, which can be a number or a string with currency symbols/commas.
   * @param {string|number} price - The price value to parse.
   * @returns {number} The parsed price as a number, or 0 if invalid.
   */
  const parsePrice = (price) => {
    if (typeof price === 'string') return parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
    return Number(price) || 0;
  };

  const mainImage = product?.images?.[0];

  const colors = product?.colors || [];



  const handleAddToCart = async () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    setIsAddingToCart(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    dispatch(addItemToCart({
      ...product,
      size: selectedSize,
      color: colors[selectedColor]
    }));

    setIsAddingToCart(false);
    setIsAddedToCart(true);
    // Reset after 2 seconds
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleQuickPurchase = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    // Handle quick purchase logic
    console.log('Quick purchase clicked');
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`${i < rating ? 'text-orange-400 fill-orange-400' : 'text-gray-300'}`}
      />
    ));
  };

    return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        .product-image-container {
          position: relative;
          overflow: hidden;
        }
        
        .base-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease-in-out;
        }
        
        .selective-color-change {
          position: relative;
        }
        
        .selective-color-change::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--overlay-color);
          mix-blend-mode: hue;
          opacity: var(--overlay-opacity);
          transition: all 0.3s ease-in-out;
          mask: radial-gradient(ellipse 35% 55% at 50% 45%, 
            black 15%, 
            rgba(0,0,0,0.8) 35%, 
            rgba(0,0,0,0.4) 55%, 
            transparent 75%);
          -webkit-mask: radial-gradient(ellipse 35% 55% at 50% 45%, 
            black 15%, 
            rgba(0,0,0,0.8) 35%, 
            rgba(0,0,0,0.4) 55%, 
            transparent 75%);
        }
      `}</style>

      {/* Breadcrumb */}
      <div className="px-11 py-6 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="hover:text-gray-900 cursor-pointer">Home</span>
            <span>/</span>
            <span className="hover:text-gray-900 cursor-pointer">Products</span>n
            <span>/</span>
            <span className="text-gray-900">{product?.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Images */}
          <div className="flex gap-4">
            {/* Thumbnail Images */}
            <div className="flex flex-col space-y-3">
              {product?.images.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedThumbnail(index)}
                  className={`w-20 h-34 rounded-lg overflow-hidden border-2 transition-all relative ${
                    selectedThumbnail === index 
                      ? 'border-gray-400 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="product-image-container h-full relative">
                    <img
                      src={thumb}
                      alt={`Product ${index + 1}`}
                      className="base-image"
                    />
                    <div 
                      className="selective-color-change absolute inset-0"
                    ></div>
                  </div>
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="product-image-container h-[570px] relative">
                  <img
                    src={mainImage}
                    alt={`Jenny's Closets - The winter top for female, ${colors[selectedColor]}`}
                    className="base-image"
                  />
                  <div 
                    className="selective-color-change absolute inset-0"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {product?.name} -
                {colors[selectedColor]?.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {renderStars(5)}
                </div>
                <span className="text-sm text-gray-600">147 Reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">₹{parsePrice(product?.price).toFixed(2)}</span>
              <span className="text-xl text-gray-500 line-through">₹99</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                Save 50% right now
              </span>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                  Made with full cotton
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                  Slim fit for any body
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                  Quality control by JC
                </li>
              </ul>
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Colors</h3>
              <div className="flex gap-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`relative w-8 h-8 rounded border-2 transition-all ${
                      selectedColor === index 
                        ? 'border-gray-900 scale-110 shadow-lg' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color?.color }}
                    title={color?.name}
                  >
                    {selectedColor === index && (
                      <div className="absolute inset-0 rounded border-2 border-white"></div>
                    )}
                  </button>
                ))}
              </div>
          
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        if (sizeError) setSizeError(false);
                      }}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError && <p className="mt-2 text-sm text-red-600">Please select a size.</p>}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  isAddedToCart 
                    ? 'bg-green-600 text-white' 
                    : 'bg-black text-white hover:bg-gray-800'
                } ${isAddingToCart ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                <ShoppingCart size={20} />
                {isAddingToCart ? 'Adding...' : isAddedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              
              <button
                onClick={handleQuickPurchase}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                <MousePointer size={20} />
                Quick Buy
              </button>
              
              <button
                onClick={toggleWishlist}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isWishlisted 
                    ? 'border-red-300 bg-red-50 text-red-600' 
                    : 'border-gray-300 hover:border-gray-400 text-gray-600'
                }`}
              >
                <Heart 
                  size={20} 
                  className={isWishlisted ? 'fill-current' : ''} 
                />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck size={16} />
                <span>Free shipping worldwide</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield size={16} />
                <span>100% Secured Payment</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Award size={16} />
                <span>Made by the Professionals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              {['Description', 'Reviews', 'Support'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                  {tab === 'Reviews' && (
                    <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                      147
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === 'Description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                 {product?.description}
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Available in multiple colors including green, orange, blue, and classic black. 
                  Each color is carefully selected to complement different skin tones and personal styles.
                </p>
              </div>
            )}

            {activeTab === 'Reviews' && (
              <div className="space-y-8">
                {reviews.map((review, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-600">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-gray-700 mb-2">{review.text}</p>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">{review.name}</span>
                        <span className="mx-2">•</span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button className="text-gray-500 text-sm hover:text-gray-700 transition-colors flex items-center gap-2">
                  <span>📄</span>
                  LOAD MORE REVIEWS
                </button>
              </div>
            )}

            {activeTab === 'Support' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Customer Support</h3>
                <p className="text-gray-700">
                  Our customer support team is available 24/7 to help you with any questions or concerns. 
                  Contact us via email, phone, or live chat for immediate assistance.
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> support@jennysclosets.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Live Chat:</strong> Available on our website</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;