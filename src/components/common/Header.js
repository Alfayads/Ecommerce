'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, UserCircle2, Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';

// Hook to detect client-side mount
function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}

export default function Header() {
  const hasMounted = useHasMounted();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { itemIds: wishlistItemIds } = useSelector((state) => state.wishlist);
  const { totalQuantity: cartQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  const publicLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Services', href: '/services' },
  ];

  const userLinks = [
    { label: 'Products', href: '/products' },
    { label: 'Categories', href: '/categories' },
    { label: 'Account', href: '/account' },
  ];

  const renderLinks = (links) =>
    links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
      >
        {link.label}
      </Link>
    ));

  if (!hasMounted) return null;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-gray-900">
              <span className="text-red-600">/</span>Yadro
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-8">
            {renderLinks(isAuthenticated ? userLinks : publicLinks)}
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <Link href="/wishlist" className="relative text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center">
                  <Heart className="h-5 w-5" />
                  {wishlistItemIds.length > 0 && (
                    <span className="absolute top-1 right-0 -mt-1 -mr-1 flex items-center justify-center h-5 w-5 bg-red-600 text-white text-xs rounded-full">
                      {wishlistItemIds.length}
                    </span>
                  )}
                  <span className="sr-only">Wishlist</span>
                </Link>
                <Link href="/cart" className="relative text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center">
                  <ShoppingCart className="h-5 w-5" />
                  {cartQuantity > 0 && (
                    <span className="absolute top-1 right-0 -mt-1 -mr-1 flex items-center justify-center h-5 w-5 bg-red-600 text-white text-xs rounded-full">
                      {cartQuantity}
                    </span>
                  )}
                  <span className="sr-only">Cart</span>
                </Link>
              </div>
            )}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link href="/account/login">
                  <button className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors">
                    Login
                  </button>
                </Link>
                <Link href="/account/register">
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  <UserCircle2 className="w-6 h-6" />
                  <span>{user?.firstName || 'User'}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border py-1 z-50">
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => dispatch(logout())}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 p-2 rounded-md transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-2 pb-4 space-y-2">
          {(isAuthenticated ? userLinks : publicLinks).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated && (
            <>
              <Link href="/wishlist" className="block text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors py-2">
                <div className="flex items-center gap-2">
                  <span>Wishlist</span>
                  {wishlistItemIds.length > 0 && (
                    <span className="flex items-center justify-center h-5 w-5 bg-red-600 text-white text-xs rounded-full">
                      {wishlistItemIds.length}
                    </span>
                  )}
                </div>
              </Link>
              <Link href="/cart" className="block text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors py-2">
                <div className="flex items-center gap-2">
                  <span>Cart</span>
                  {cartQuantity > 0 && (
                    <span className="flex items-center justify-center h-5 w-5 bg-red-600 text-white text-xs rounded-full">
                      {cartQuantity}
                    </span>
                  )}
                </div>
              </Link>
            </>
          )}
          {!isAuthenticated ? (
            <>
              <Link href="/account/login">
                <button className="text-gray-500 hover:text-gray-900 w-full text-left py-2 text-sm font-medium">
                  Login
                </button>
              </Link>
              <Link href="/account/register">
                <button className="bg-gray-900 text-white w-full text-left px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 mt-2">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/account"
                className="block text-sm text-gray-700 hover:bg-gray-100 px-4 py-2"
              >
                Profile
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="w-full text-left text-sm text-gray-700 hover:bg-gray-100 px-4 py-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
