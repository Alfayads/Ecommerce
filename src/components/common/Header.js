'use client';

import React, { useState } from 'react';
import { Menu, X, ChevronDown, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const publicLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Services', href: '/services' },
  ];

  const userLinks = [
    { label: 'Products', href: '/products' },
    { label: 'Categories', href: '/categories' },
    { label: 'Cart', href: '/cart' },
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

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">
                <span className="text-red-600">/</span>Yadro
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-8">
            {renderLinks(isAuthenticated ? userLinks : publicLinks)}
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
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  <UserCircle2 className="w-6 h-6" />
                  <span>{user?.firstName || 'User'}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border py-1 z-50">
                    <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
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

          {/* Mobile menu toggle */}
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
              <Link href="/account" className="block text-sm text-gray-700 hover:bg-gray-100 px-4 py-2">
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
