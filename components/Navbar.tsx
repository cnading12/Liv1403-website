'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              Liv 1403
            </Link>
            <div className="text-sm text-gray-600 hidden md:block">Luxury Development</div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {isHomePage ? (
              <>
                <a 
                  href="#executive-summary" 
                  className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                  Overview
                </a>
                <a 
                  href="#location" 
                  className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                  Location
                </a>
                <a 
                  href="#financials" 
                  className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                  Financials
                </a>
                <a 
                  href="#contact" 
                  className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                  Contact
                </a>
              </>
            ) : (
              <>
                <Link 
                  href="/#executive-summary" 
                  className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                  Overview
                </Link>
                <Link 
                  href="/#location" 
                  className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                  Location
                </Link>
                <Link 
                  href="/#financials" 
                  className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                  Financials
                </Link>
                <Link 
                  href="/#contact" 
                  className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                  Contact
                </Link>
              </>
            )}
          </div>
          
          {/* Contact Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <a 
              href="/buyer"
              className="bg-white text-yellow-600 border-2 border-yellow-600 px-6 py-2 rounded-lg hover:bg-yellow-50 transition-colors font-medium hidden lg:block"
            >
              Buyer Portal
            </a>
            <a 
              href="/investor"
              className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
            >
              Investor Login
            </a>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3 pt-4">
              {isHomePage ? (
                <>
                  <a
                    href="#executive-summary"
                    className="text-gray-700 hover:text-gray-900 transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Overview
                  </a>
                  <a
                    href="#location"
                    className="text-gray-700 hover:text-gray-900 transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Location
                  </a>
                  <a
                    href="#financials"
                    className="text-gray-700 hover:text-gray-900 transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Financials
                  </a>
                  <a
                    href="#investment"
                    className="text-gray-700 hover:text-gray-900 transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Investment
                  </a>
                </>
              ) : (
                <>
                  <Link
                    href="/#executive-summary"
                    className="text-gray-700 hover:text-gray-900 transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Overview
                  </Link>
                  <Link
                    href="/#location"
                    className="text-gray-700 hover:text-gray-900 transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Location
                  </Link>
                  <Link
                    href="/#financials"
                    className="text-gray-700 hover:text-gray-900 transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Financials
                  </Link>
                  <Link
                    href="/#investment"
                    className="text-gray-700 hover:text-gray-900 transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Investment
                  </Link>
                </>
              )}
              <Link
                href="/buyer"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Buyer Portal
              </Link>
              <Link
                href="/investor"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Investor Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}