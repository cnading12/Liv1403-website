'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Unit data
const UNITS = [
  {
    id: 1,
    name: 'Unit 1 - Ground Floor',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1450,
    rooftopDeck: 750,
    price: 1250000,
    features: ['Private entrance', 'Attached 2-car garage', 'Direct rooftop access', 'Large windows'],
    status: 'Available'
  },
  {
    id: 2,
    name: 'Unit 2 - Ground Floor',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1425,
    rooftopDeck: 725,
    price: 1225000,
    features: ['Private entrance', 'Attached 2-car garage', 'Direct rooftop access', 'Corner unit'],
    status: 'Available'
  },
  {
    id: 3,
    name: 'Unit 3 - Second Floor',
    bedrooms: 2,
    bathrooms: 2.5,
    sqft: 1475,
    rooftopDeck: 800,
    price: 1350000,
    features: ['Open floor plan', 'Vaulted ceilings', 'Premium finishes', 'Expansive rooftop'],
    status: 'Available'
  },
  {
    id: 4,
    name: 'Unit 4 - Second Floor',
    bedrooms: 2,
    bathrooms: 2.5,
    sqft: 1450,
    rooftopDeck: 775,
    price: 1325000,
    features: ['City views', 'Chef\'s kitchen', 'Walk-in closets', 'Private rooftop'],
    status: 'Available'
  },
  {
    id: 5,
    name: 'Unit 5 - Third Floor Penthouse',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1875,
    rooftopDeck: 1250,
    price: 1750000,
    features: ['Penthouse living', 'Mountain views', 'Luxury master suite', 'Massive rooftop'],
    status: 'Available'
  },
  {
    id: 6,
    name: 'Unit 6 - Third Floor Penthouse',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1900,
    rooftopDeck: 1338,
    price: 1800000,
    features: ['Corner penthouse', 'Skyline views', 'Spa-like bathrooms', 'Premium rooftop'],
    status: 'Available'
  }
];

export default function BuyerPortal() {
  const [activeTab, setActiveTab] = useState('units');
  
  // Buyer authentication state
  const [isBuyerAuthenticated, setIsBuyerAuthenticated] = useState(false);
  const [currentBuyer, setCurrentBuyer] = useState<any>(null);
  const [showBuyerLogin, setShowBuyerLogin] = useState(false);
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPassword, setBuyerPassword] = useState('');
  const [buyerLoginError, setBuyerLoginError] = useState('');
  const [buyerLoginLoading, setBuyerLoginLoading] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('buyer_token');
    const userData = localStorage.getItem('buyer_user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        if (user.role === 'buyer') {
          setCurrentBuyer(user);
          setIsBuyerAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem('buyer_token');
        localStorage.removeItem('buyer_user');
      }
    }
  }, []);

  const handleBuyerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBuyerLoginLoading(true);
    setBuyerLoginError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: buyerEmail, password: buyerPassword }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.user.role === 'buyer') {
        localStorage.setItem('buyer_token', data.token);
        localStorage.setItem('buyer_user', JSON.stringify(data.user));

        setCurrentBuyer(data.user);
        setIsBuyerAuthenticated(true);
        setShowBuyerLogin(false);
        setBuyerEmail('');
        setBuyerPassword('');
      } else if (data.user && data.user.role !== 'buyer') {
        setBuyerLoginError('This account does not have buyer access.');
      } else {
        setBuyerLoginError(data.error || 'Login failed.');
      }
    } catch (error) {
      setBuyerLoginError('Network error. Please try again.');
    } finally {
      setBuyerLoginLoading(false);
    }
  };

  const handleBuyerLogout = () => {
    localStorage.removeItem('buyer_token');
    localStorage.removeItem('buyer_user');
    setIsBuyerAuthenticated(false);
    setCurrentBuyer(null);
    setBuyerEmail('');
    setBuyerPassword('');
  };

  const handleUnitInquiry = (unitId: number) => {
    const unit = UNITS.find(u => u.id === unitId);
    window.location.href = `mailto:lance.nading@liv1403.com?subject=Inquiry about ${unit?.name}&body=Hello,%0D%0A%0D%0AI am interested in learning more about ${unit?.name} at Liv 1403.%0D%0A%0D%0APlease contact me to schedule a showing or provide additional information.%0D%0A%0D%0AThank you`;
  };

  // Function to check if Purchase Process tab should require authentication
  const requiresAuthentication = () => {
    return activeTab === 'process' && !isBuyerAuthenticated;
  };

  // Render locked content overlay
  const renderLockedContent = () => {
    if (!requiresAuthentication()) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Buyer Access Required
            </h3>
            <p className="text-gray-600 mb-6">
              The Purchase Process section contains detailed information for approved buyers only.
            </p>
          </div>

          {showBuyerLogin ? (
            <form onSubmit={handleBuyerLogin} className="space-y-4">
              {buyerLoginError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm">{buyerLoginError}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  required
                  disabled={buyerLoginLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={buyerPassword}
                  onChange={(e) => setBuyerPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  required
                  disabled={buyerLoginLoading}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={buyerLoginLoading}
                  className="flex-1 bg-yellow-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {buyerLoginLoading ? 'Logging in...' : 'Login'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowBuyerLogin(false);
                    setBuyerLoginError('');
                  }}
                  className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
                  disabled={buyerLoginLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setShowBuyerLogin(true)}
                className="w-full bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
              >
                Login as Approved Buyer
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <a
                href="/buyer-apply"
                className="block w-full bg-white text-yellow-600 border-2 border-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors text-center"
              >
                Apply for Buyer Access
              </a>

              <button
                onClick={() => setActiveTab('units')}
                className="w-full text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                ← Back to Public Content
              </button>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Need help?
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
              <a 
                href="mailto:lance.nading@liv1403.com"
                className="text-yellow-600 hover:text-yellow-700 font-medium"
              >
                Email Lance
              </a>
              <span className="hidden sm:inline text-gray-300">|</span>
              <a 
                href="tel:720-359-8337"
                className="text-yellow-600 hover:text-yellow-700 font-medium"
              >
                720-359-8337
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="bg-gray-50 pt-[92px] min-h-screen">
      {/* Render locked content overlay if needed */}
      {renderLockedContent()}

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-800/60 z-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Own Your Piece of Old South Pearl
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover luxury condominium living in Denver's most vibrant walkable neighborhood.
            6 exclusive units now available for pre-sale.
          </p>
          
          {/* Show buyer status if authenticated */}
          {isBuyerAuthenticated && currentBuyer && (
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-full mb-4">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-400 font-medium">
                Logged in as {currentBuyer.name}
              </span>
              <button
                onClick={handleBuyerLogout}
                className="ml-2 text-green-400 hover:text-green-300 text-sm underline"
              >
                Logout
              </button>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg">
              <div className="text-3xl font-bold text-yellow-400">6</div>
              <div className="text-sm text-gray-300">Luxury Units</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg">
              <div className="text-3xl font-bold text-yellow-400">2-3</div>
              <div className="text-sm text-gray-300">Bedrooms</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg">
              <div className="text-3xl font-bold text-yellow-400">May 2027</div>
              <div className="text-sm text-gray-300">Move-In Ready</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#units-section"
              className="bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105"
            >
              View Available Units
            </a>
            <a
              href="#contact-section"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Schedule a Showing
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">$1.2M - $1.8M</div>
              <div className="text-sm text-gray-600">Price Range</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">1,425 - 1,900</div>
              <div className="text-sm text-gray-600">Interior SF</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">725 - 1,338</div>
              <div className="text-sm text-gray-600">Rooftop Deck SF</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">2-Car</div>
              <div className="text-sm text-gray-600">Private Garage</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">Pre-Sale</div>
              <div className="text-sm text-gray-600">Now Accepting Offers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-[92px] z-30">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('units')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'units'
                  ? 'border-yellow-600 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Available Units
            </button>
            <button
              onClick={() => setActiveTab('amenities')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'amenities'
                  ? 'border-yellow-600 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Amenities & Features
            </button>
            <button
              onClick={() => setActiveTab('neighborhood')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'neighborhood'
                  ? 'border-yellow-600 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Neighborhood
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center gap-2 ${activeTab === 'process'
                  ? 'border-yellow-600 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Purchase Process
              {!isBuyerAuthenticated && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'faq'
                  ? 'border-yellow-600 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              FAQ
            </button>
          </nav>
        </div>
      </section>

      {/* Tab Content - Only show if not blocked by authentication */}
      <div className="max-w-7xl mx-auto px-6 py-12" id="units-section">
        {!requiresAuthentication() && (
          <>
            {/* Available Units Tab */}
            {activeTab === 'units' && (
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Available Residences</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Each residence at Liv 1403 features a private rooftop deck, underground parking,
                    and the finest luxury finishes. Pre-sales now available with flexible terms.
                  </p>
                </div>

                {/* Units Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {UNITS.map((unit) => (
                    <div key={unit.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                      {/* Unit Image Placeholder */}
                      <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-600">
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <div className="text-center">
                            <div className="text-6xl font-bold opacity-30">{unit.id}</div>
                            <div className="text-sm">Floor Plan Coming Soon</div>
                          </div>
                        </div>
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${unit.status === 'Available' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                          }`}>
                          {unit.status}
                        </div>
                      </div>

                      {/* Unit Details */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{unit.name}</h3>
                        <div className="text-3xl font-bold text-yellow-600 mb-4">
                          ${(unit.price / 1000000).toFixed(2)}M
                        </div>

                        {/* Specs */}
                        <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                          <div>
                            <div className="text-sm text-gray-500">Bedrooms</div>
                            <div className="text-xl font-semibold text-gray-900">{unit.bedrooms}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Bathrooms</div>
                            <div className="text-xl font-semibold text-gray-900">{unit.bathrooms}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Interior SF</div>
                            <div className="text-xl font-semibold text-gray-900">{unit.sqft.toLocaleString()}</div>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mb-6">
                          <div className="text-sm text-gray-500 mb-2">Private Rooftop Deck</div>
                          <div className="text-lg font-semibold text-gray-900">{unit.rooftopDeck.toLocaleString()} SF</div>
                        </div>

                        {/* Features */}
                        <div className="mb-6">
                          <div className="text-sm font-semibold text-gray-900 mb-2">Key Features</div>
                          <ul className="space-y-1">
                            {unit.features.map((feature, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-center">
                                <svg className="w-4 h-4 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleUnitInquiry(unit.id)}
                            className="flex-1 bg-yellow-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                          >
                            Inquire Now
                          </button>
                          <a
                            href="#contact-section"
                            className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
                          >
                            Schedule Showing
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Per Square Foot Info */}
                <div className="bg-blue-50 rounded-xl p-8 mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Exceptional Value</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-700 mb-4">
                        Liv 1403 offers competitive pricing in Denver's luxury condominium market, with prices
                        ranging from approximately <strong>$850-$950 per square foot</strong> for interior space.
                      </p>
                      <p className="text-gray-700">
                        Each unit includes a massive private rooftop deck (included in purchase price),
                        2-car underground garage, and ultra-luxury finishes that rival properties at $1,000+ PSF.
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Private rooftop deck with outdoor kitchen, fire pit, and spa</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>2-car private underground garage with EV charging</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Premium appliances and luxury finishes throughout</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Smart home technology and security systems</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Amenities Tab */}
            {activeTab === 'amenities' && (
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Luxury Amenities & Features</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Every detail has been carefully considered to provide an unparalleled living experience
                  </p>
                </div>

                {/* Feature Categories */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Kitchen */}
                  <div className="bg-white rounded-xl border border-gray-200 p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Gourmet Kitchen</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Professional-grade appliances</li>
                      <li>• Custom cabinetry with soft-close drawers</li>
                      <li>• Solid slab quartz countertops</li>
                      <li>• Designer tile backsplash</li>
                      <li>• Large island with seating</li>
                      <li>• Premium fixtures and hardware</li>
                    </ul>
                  </div>

                  {/* Bathrooms */}
                  <div className="bg-white rounded-xl border border-gray-200 p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Spa-Like Bathrooms</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Luxury tile work throughout</li>
                      <li>• Walk-in showers with rainfall heads</li>
                      <li>• Freestanding soaking tubs (master)</li>
                      <li>• Double vanities with premium fixtures</li>
                      <li>• Heated floors</li>
                      <li>• Custom lighting</li>
                    </ul>
                  </div>

                  {/* Private Rooftop */}
                  <div className="bg-white rounded-xl border border-gray-200 p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Private Rooftop Deck</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 700-1,300+ SF private outdoor space</li>
                      <li>• Outdoor kitchen with grill & refrigerator</li>
                      <li>• Built-in fire pit</li>
                      <li>• Spa/hot tub ready</li>
                      <li>• Pet-friendly synthetic grass</li>
                      <li>• Mountain & city views</li>
                      <li>• Pergola for shade</li>
                    </ul>
                  </div>

                  {/* Smart Home */}
                  <div className="bg-white rounded-xl border border-gray-200 p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Smart Home Technology</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Integrated smart home system</li>
                      <li>• Video security system</li>
                      <li>• Smart thermostat</li>
                      <li>• Keyless entry</li>
                      <li>• Audio/visual pre-wiring</li>
                      <li>• High-speed internet ready</li>
                    </ul>
                  </div>

                  {/* Comfort */}
                  <div className="bg-white rounded-xl border border-gray-200 p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Comfort & Efficiency</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Individual HVAC systems</li>
                      <li>• HEPA air filtration</li>
                      <li>• In-unit washer & dryer</li>
                      <li>• Energy-efficient windows</li>
                      <li>• Sound insulation between units</li>
                      <li>• Ample storage throughout</li>
                    </ul>
                  </div>

                  {/* Parking */}
                  <div className="bg-white rounded-xl border border-gray-200 p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Private Garage</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Private 2-car underground garage</li>
                      <li>• Electric vehicle charging stations</li>
                      <li>• Additional storage space</li>
                      <li>• Secure bike storage</li>
                      <li>• Direct access to residence</li>
                      <li>• Climate controlled</li>
                    </ul>
                  </div>
                </div>

                {/* Build Quality */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Exceptional Build Quality</h3>
                  <p className="text-gray-700 mb-4">
                    Built by Lance Nading, a third-generation Colorado builder with over 20 years of experience
                    creating luxury homes and buildings in Denver. Every Liv 1403 residence reflects decades
                    of craftsmanship and attention to detail.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-gray-900 mb-1">Superior Materials</div>
                      <div className="text-sm text-gray-600">Premium materials selected for durability and beauty</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-gray-900 mb-1">Expert Craftsmanship</div>
                      <div className="text-sm text-gray-600">Skilled tradespeople with decades of experience</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="font-semibold text-gray-900 mb-1">Proven Track Record</div>
                      <div className="text-sm text-gray-600">Successful luxury projects throughout Denver</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Neighborhood Tab */}
            {activeTab === 'neighborhood' && (
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Your New Neighborhood</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Old South Pearl Street - Denver's most walkable, vibrant, and desirable neighborhood
                  </p>
                </div>

                {/* Neighborhood Highlights */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl border border-gray-200 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Walk to Everything</h3>
                    <p className="text-gray-700 mb-6">
                      Live in the heart of Denver's most beloved neighborhood, where everything you need
                      is just steps from your door.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <div className="font-semibold text-gray-900">1 Block</div>
                          <div className="text-sm text-gray-600">Trader Joe's (opening 2026)</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <div className="font-semibold text-gray-900">2-3 Blocks</div>
                          <div className="text-sm text-gray-600">2 Michelin-starred restaurants (Kizaki & Margot)</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <div className="font-semibold text-gray-900">Walking Distance</div>
                          <div className="text-sm text-gray-600">Dozens of restaurants, cafes, boutiques & bars</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <div className="font-semibold text-gray-900">Minutes Away</div>
                          <div className="text-sm text-gray-600">RTD Light Rail, Washington Park, Whole Foods</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Lifestyle & Culture</h3>
                    <p className="text-gray-700 mb-6">
                      Old South Pearl Street is Denver's premier pedestrian-friendly neighborhood,
                      known for its vibrant street life and sense of community.
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">•</span>
                        <span>Weekly farmers market with live music</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">•</span>
                        <span>Annual street fair and festivals</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">•</span>
                        <span>Historic neighborhood with character</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">•</span>
                        <span>Tree-lined streets perfect for walking</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">•</span>
                        <span>Pet-friendly community</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">•</span>
                        <span>Safe, family-oriented atmosphere</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Location</h3>
                  <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
                    {/* Map would go here - placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className="text-lg font-semibold">Interactive Map</div>
                        <div className="text-sm">1403 S. Pearl Street, Denver, CO 80210</div>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=1403+S+Pearl+St,+Denver,+CO+80210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    View on Google Maps →
                  </a>
                </div>

                {/* Nearby Attractions */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Nearby Attractions & Amenities</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Dining & Shopping</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Kizaki (Michelin Star)</li>
                        <li>• Margot (Michelin Star)</li>
                        <li>• Sushi Den</li>
                        <li>• Izakaya Den</li>
                        <li>• Kaos Pizzeria</li>
                        <li>• Stella's Coffee</li>
                        <li>• Whole Foods Market</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Parks & Recreation</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Washington Park</li>
                        <li>• Platt Park</li>
                        <li>• Denver Zoo</li>
                        <li>• Denver Botanic Gardens</li>
                        <li>• Cherry Creek Trail</li>
                        <li>• Multiple fitness studios</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Transportation & Access</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• RTD Light Rail (2 blocks)</li>
                        <li>• I-25 Access (5 minutes)</li>
                        <li>• Downtown Denver (10 min)</li>
                        <li>• DIA Airport (25 minutes)</li>
                        <li>• University of Denver</li>
                        <li>• Multiple bus routes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Purchase Process Tab - Protected Content */}
            {activeTab === 'process' && isBuyerAuthenticated && (
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Purchase Process</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    We make buying your new home simple and transparent. Here's what to expect.
                  </p>
                </div>

                {/* Process Steps */}
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                  <div className="space-y-8">
                    <ProcessStep
                      number="1"
                      title="Schedule a Showing"
                      description="Contact us to schedule a private showing and tour of the building location, review floor plans, and discuss available units."
                      action="Schedule Now"
                      actionHref="#contact-section"
                    />

                    <ProcessStep
                      number="2"
                      title="Select Your Unit"
                      description="Choose your preferred unit based on size, layout, floor level, and rooftop deck configuration. We'll reserve your unit with a refundable deposit."
                      info="Reservation Deposit: $10,000 (refundable)"
                    />

                    <ProcessStep
                      number="3"
                      title="Sign Purchase Agreement"
                      description="Review and sign the purchase and sale agreement outlining the terms, price, and closing timeline. We recommend having your attorney review all documents."
                      info="Earnest Money Deposit: 5% of purchase price"
                    />

                    <ProcessStep
                      number="4"
                      title="Secure Financing"
                      description="Work with your preferred lender to secure financing. We can provide recommendations for lenders experienced with new construction condominiums."
                      info="Pre-approval recommended before signing"
                    />

                    <ProcessStep
                      number="5"
                      title="Track Construction Progress"
                      description="Receive regular updates on construction progress with photos and milestones. You'll have opportunities to select finishes and make customization choices."
                      info="Expected completion: May 2027"
                    />

                    <ProcessStep
                      number="6"
                      title="Pre-Closing Walkthrough"
                      description="Complete a final walkthrough of your unit before closing to ensure everything meets your expectations and all items are completed."
                      info="Typically 1-2 weeks before closing"
                    />

                    <ProcessStep
                      number="7"
                      title="Closing & Move-In"
                      description="Complete the closing process, receive your keys, and move into your new luxury condominium on Old South Pearl Street!"
                      action="Get Started"
                      actionHref="#contact-section"
                    />
                  </div>
                </div>

                {/* Financing Options */}
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Financing Options</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Conventional Mortgages</h4>
                      <p className="text-gray-700 text-sm mb-4">
                        Most buyers finance their purchase with a conventional mortgage. We work with several
                        lenders who specialize in new construction condominiums and can offer competitive rates.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg text-sm">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Typical Down Payment</span>
                          <span className="font-semibold">10-20%</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Current Rates (estimated)</span>
                          <span className="font-semibold">6.5-7.5%</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-3">
                          Rates vary based on credit, down payment, and market conditions
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">All-Cash Purchases</h4>
                      <p className="text-gray-700 text-sm mb-4">
                        Cash buyers enjoy a simpler closing process with fewer contingencies. We welcome
                        all-cash offers and can often accommodate faster closing timelines.
                      </p>
                      <div className="bg-green-50 p-4 rounded-lg text-sm">
                        <div className="flex items-start mb-2">
                          <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>No appraisal contingency</span>
                        </div>
                        <div className="flex items-start mb-2">
                          <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>No financing contingency</span>
                        </div>
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Faster closing process</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Need a lender recommendation?</strong> We work with several mortgage brokers
                      and banks who have experience with new construction and can help you find the best rates
                      and terms for your situation.
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Construction Timeline</h3>
                  <div className="space-y-4">
                    <TimelineBar
                      phase="Pre-Construction"
                      period="Now - Feb 2025"
                      description="Accepting pre-sale reservations and finalizing plans"
                      progress={100}
                    />
                    <TimelineBar
                      phase="Foundation & Structure"
                      period="Mar 2025 - Aug 2025"
                      description="Site preparation, foundation, framing, and exterior"
                      progress={0}
                    />
                    <TimelineBar
                      phase="Interior Construction"
                      period="Sep 2025 - Feb 2027"
                      description="MEP, drywall, finishes, and custom details"
                      progress={0}
                    />
                    <TimelineBar
                      phase="Final Completion"
                      period="Mar 2027 - May 2027"
                      description="Inspections, certificate of occupancy, and closings"
                      progress={0}
                    />
                  </div>
                  <div className="mt-6 text-sm text-gray-700">
                    <strong>Expected Move-In:</strong> May 2027. Timeline is approximate and subject to change
                    based on weather, permitting, and other factors beyond our control.
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Buyer FAQ</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Common questions about purchasing a luxury condominium at Liv 1403
                  </p>
                </div>

                <div className="space-y-4">
                  <FAQItem
                    question="How much are the units?"
                    answer="Units range from $1.225M to $1.8M depending on size, floor level, and features. Ground floor units with 2 bedrooms start at $1.225M, while penthouse units with 3 bedrooms are priced up to $1.8M. All prices are subject to change."
                  />

                  <FAQItem
                    question="What is included in the purchase price?"
                    answer="The purchase price includes your condominium unit, a massive private rooftop deck (700-1,300 SF), a 2-car underground garage, all luxury finishes and appliances, smart home technology, and all HOA setup fees. You're buying a complete, move-in ready home."
                  />

                  <FAQItem
                    question="What are the HOA fees?"
                    answer="Estimated HOA fees will be approximately $400-600 per month depending on unit size. HOA fees cover building insurance, exterior maintenance, common area utilities, snow removal, landscaping, and reserve funds for future capital improvements."
                  />

                  <FAQItem
                    question="Can I customize my unit?"
                    answer="Yes! Buyers who reserve early will have opportunities to select finishes, fixtures, and make certain customization choices (within reason). The earlier you commit, the more choices you'll have. Major structural changes are not permitted."
                  />

                  <FAQItem
                    question="When is the expected completion date?"
                    answer="We expect units to be ready for occupancy in May 2027. This timeline is approximate and subject to change based on weather, permitting, inspections, and other factors. We'll keep you updated throughout construction."
                  />

                  <FAQItem
                    question="Can I see the units before they're built?"
                    answer="While the units aren't built yet, we can show you detailed floor plans, architectural renderings, material samples, and the building location. We can also show you photos of the developer's previous projects to demonstrate the quality of work."
                  />

                  <FAQItem
                    question="What is the reservation process?"
                    answer="To reserve a unit, you'll pay a $10,000 refundable deposit. Once we've completed your due diligence and you're ready to proceed, you'll sign a purchase agreement and pay 5% earnest money. The $10,000 deposit is credited toward your earnest money."
                  />

                  <FAQItem
                    question="Is my deposit refundable?"
                    answer="The initial $10,000 reservation deposit is refundable if you decide not to proceed before signing the purchase agreement. Once you sign the purchase agreement and pay earnest money, refundability depends on the contingencies in your contract (typically financing and final walkthrough)."
                  />

                  <FAQItem
                    question="Do I need to be pre-approved for a mortgage?"
                    answer="While not required to view units or place a reservation, we strongly recommend getting pre-approved before signing a purchase agreement. This ensures you can secure financing and helps the process move smoothly."
                  />

                  <FAQItem
                    question="Are the units FHA/VA eligible?"
                    answer="We expect the units will qualify for FHA and VA financing once the building is complete and the condo association is established. However, this cannot be guaranteed until closer to completion. Conventional financing is available."
                  />

                  <FAQItem
                    question="Can I use the unit as a rental property?"
                    answer="The HOA governing documents will permit rentals with certain restrictions (typically minimum lease terms of 6-12 months). Short-term vacation rentals (Airbnb, VRBO) will not be permitted to maintain the residential character of the building."
                  />

                  <FAQItem
                    question="What utilities am I responsible for?"
                    answer="Unit owners are responsible for their own electricity, gas, internet/cable, and any other utilities consumed within their unit. Water, sewer, trash, and common area utilities are covered by HOA fees."
                  />

                  <FAQItem
                    question="Is there builder warranty coverage?"
                    answer="Yes! All units include a comprehensive builder warranty covering workmanship and materials. Major systems are covered for 1 year, structural elements for multiple years. We stand behind our work and will address any issues promptly."
                  />

                  <FAQItem
                    question="Can I visit other projects by the developer?"
                    answer="Absolutely! Lance Nading has completed several projects in Denver including 1745 S. Pearl Street (3 blocks away). We can arrange for you to see his previous work and speak with past buyers if desired."
                  />

                  <FAQItem
                    question="What are the property taxes?"
                    answer="Property taxes in this area are approximately 0.5-0.6% of the assessed value annually. Exact taxes will be determined by Denver County once the units are complete. As a new construction, you may see reassessment in the first few years."
                  />

                  <FAQItem
                    question="Are pets allowed?"
                    answer="Yes! The building is pet-friendly with reasonable restrictions on size, number, and breed (to be determined by HOA). Your private rooftop deck includes synthetic grass perfect for dogs. The neighborhood is very pet-friendly."
                  />
                </div>

                <div className="mt-12 bg-yellow-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
                  <p className="text-gray-700 mb-6">
                    We're here to help! Contact us to schedule a personal consultation and tour.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="mailto:lance.nading@liv1403.com"
                      className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors text-center"
                    >
                      Email Lance Nading
                    </a>
                    <a
                      href="tel:720-359-8337"
                      className="bg-white text-yellow-600 border-2 border-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors text-center"
                    >
                      Call 720-359-8337
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Contact Section */}
      <section id="contact-section" className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Make Liv 1403 Your Home?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Schedule a private showing to see floor plans, discuss available units, and learn more about ownership opportunities.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-sm text-gray-400 mb-2">Developer</div>
              <div className="font-bold">Lance Nading</div>
              <div className="text-sm text-gray-400">C3H Development</div>
            </div>

            <div>
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="text-sm text-gray-400 mb-2">Phone</div>
              <a href="tel:720-359-8337" className="font-bold hover:text-yellow-400 transition-colors">
                720-359-8337
              </a>
            </div>

            <div>
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-sm text-gray-400 mb-2">Email</div>
              <a href="mailto:lance.nading@liv1403.com" className="font-bold hover:text-yellow-400 transition-colors break-all">
                lance.nading@liv1403.com
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:lance.nading@liv1403.com?subject=Schedule Showing - Liv 1403"
              className="bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105"
            >
              Email to Schedule
            </a>
            <a
              href="tel:720-359-8337"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Important Disclaimers */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Important Information</h3>
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                <strong>Marketing Materials:</strong> All renderings, floor plans, specifications, and pricing
                are approximate and subject to change without notice. Actual units may differ from marketing materials.
              </p>
              <p>
                <strong>Completion Timeline:</strong> The expected completion date of May 2027 is an estimate
                and may change due to weather, permitting, inspections, or other factors beyond the developer's control.
              </p>
              <p>
                <strong>Not an Offer:</strong> This website does not constitute an offer to sell real estate.
                All sales are subject to execution of a formal purchase and sale agreement.
              </p>
              <p>
                <strong>Buyer Due Diligence:</strong> Prospective buyers should conduct their own due diligence,
                including reviewing all HOA documents, obtaining independent inspections, and consulting with
                legal and financial advisors before purchasing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Component definitions
function ProcessStep({
  number,
  title,
  description,
  info,
  action,
  actionHref
}: {
  number: string;
  title: string;
  description: string;
  info?: string;
  action?: string;
  actionHref?: string;
}) {
  return (
    <div className="relative pl-16">
      <div className="absolute left-0 w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center font-bold text-xl text-white">
        {number}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        {info && (
          <div className="text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded">
            {info}
          </div>
        )}

        {action && actionHref && (
          <a
            href={actionHref}
            className="inline-block bg-yellow-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-700 transition-colors"
          >
            {action}
          </a>
        )}
      </div>
    </div>
  );
}

function TimelineBar({
  phase,
  period,
  description,
  progress
}: {
  phase: string;
  period: string;
  description: string;
  progress: number;
}) {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-gray-900">{phase}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="text-sm text-gray-500 text-right whitespace-nowrap ml-4">
          {period}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-yellow-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-8">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}