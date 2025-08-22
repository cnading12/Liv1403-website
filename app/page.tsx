'use client';

import { useState, useEffect } from 'react';

const HERO_IMAGES = [
  { src: '/images/hero/liv1403-exterior.jpg', alt: 'Liv 1403 Luxury Development Exterior' },
  { src: '/images/hero/rooftop-view.jpg', alt: 'Rooftop Deck with Denver Skyline Views' },
  { src: '/images/hero/interior-luxury.jpg', alt: 'Luxury Interior Living Space' },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0">
          {HERO_IMAGES.map((image, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === current ? 'opacity-30' : 'opacity-0'
              }`}
            >
              <div className="w-full h-full bg-gradient-to-r from-gray-900/80 to-gray-800/60" />
              <div className="w-full h-full bg-gray-600" />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Liv 1403
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-gray-200">
              Luxury Residential Mixed-Use Development
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-gray-300">
              1403 S. Pearl Street, Denver, Colorado 80210
            </p>
            
            {/* Key Investment Metrics */}
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 sm:p-6 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">$8.5M</div>
                <div className="text-xs sm:text-sm text-gray-300">Projected Value</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 sm:p-6 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">49.70%</div>
                <div className="text-xs sm:text-sm text-gray-300">IRR</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 sm:p-6 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">7 Units</div>
                <div className="text-xs sm:text-sm text-gray-300">Luxury Residences</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
              <a 
                href="#financials"
                className="bg-yellow-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105 inline-block text-center text-sm sm:text-base"
              >
                View Investment Details
              </a>
              <a 
                href="#investor-portal"
                className="border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 inline-block text-center text-sm sm:text-base"
              >
                Investor Portal
              </a>
            </div>
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === current ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section id="executive-summary" className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Executive Summary
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Key investment highlights for the Liv 1403 luxury development project
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">Project Overview</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Company:</div>
                    <div className="text-gray-600">1403 S Pearl LLC - Luxury residential mixed-use development in Denver's Platt Park neighborhood</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Management:</div>
                    <div className="text-gray-600">C3H Development, with Lance Nading as sole owner and principal</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Capital Structure:</div>
                    <div className="text-gray-600">10% Manager contribution, 90% targeted from investors</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">Investment Details</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Targeted Returns:</div>
                    <div className="text-gray-600">49.70% IRR, 1.43x MOIC</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Project Timeline:</div>
                    <div className="text-gray-600">Construction start Oct 2025, completion Dec 2026, sales closing Apr 2027</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Minimum Investment:</div>
                    <div className="text-gray-600">Contact for details</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Disclaimer Reference Box */}
          <div className="mt-8 sm:mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 text-yellow-600">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-yellow-800 font-medium">
                Please see the "Disclaimers and Confidentiality" section below. Investing in the Company is high risk, and you could lose all your investment. The Company does not guarantee any returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Project is Unique */}
      <section id="unique" className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Why Liv 1403 is Unique
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic advantages that set this development apart in Denver's competitive luxury market
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Prime Location</h3>
              <p className="text-gray-600 text-sm">Historic Old South Pearl Street - Denver's most sought-after walkable neighborhood</p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Perfect Timing</h3>
              <p className="text-gray-600 text-sm">Strategic entry as Trader Joe's arrives and neighborhood continues rapid appreciation</p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Below-Market Acquisition</h3>
              <p className="text-gray-600 text-sm">Land acquired at favorable pricing, creating immediate equity and enhanced returns</p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Proven Experience</h3>
              <p className="text-gray-600 text-sm">Lance's extensive track record delivering luxury projects on budget and schedule</p>
            </div>
          </div>
        </div>
      </section>

      {/* Principal Background and Experience */}
      <section id="principal" className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Principal Background and Experience
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Leadership with proven expertise in Denver luxury development
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-200 h-64 sm:h-80 rounded-xl flex items-center justify-center">
                <span className="text-gray-500 text-sm sm:text-base">Lance Nading Photo</span>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Lance Nading</h3>
              <p className="text-lg text-yellow-600 font-semibold mb-6">Principal & Owner, C3H Development</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Proven Track Record</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Lance brings extensive experience in Denver luxury residential development, with a demonstrated history 
                    of delivering high-end projects on schedule and within budget.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Local Market Expertise</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Deep roots in the Denver market with established relationships with contractors, city officials, 
                    and local vendors providing significant competitive advantages.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Construction Budget Management</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Hands-on approach to construction budgeting and project management consistently resulting 
                    in projects completing on time and under budget.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section id="overview" className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Project Development Summary
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              An urban residential mixed-use development located in Denver's most highly sought-after neighborhood, Platt Park.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Premium Features & Amenities</h3>
              <div className="space-y-4">
                <FeatureItem 
                  title="State-of-the-art Technology"
                  description="Audio, visual, media, and security technologies"
                />
                <FeatureItem 
                  title="Private Rooftop Decks"
                  description="Outdoor kitchens, fire pit, spas and dog-friendly synthetic grass"
                />
                <FeatureItem 
                  title="Premium Appliances & Fixtures"
                  description="Latest and best-in-class appliances and fixtures"
                />
                <FeatureItem 
                  title="Luxury Materials & Design"
                  description="Superior woodwork, casework, cabinetry, solid slab surfaces, tile work, and custom closets"
                />
                <FeatureItem 
                  title="Individual Unit Systems"
                  description="Laundry, heating, air conditioning, infrared HEPA air filtration systems"
                />
                <FeatureItem 
                  title="Private Underground Garages"
                  description="Charging stations, storage and bike racks"
                />
              </div>
            </div>
            
            <div className="space-y-4 order-first lg:order-last">
              <div className="bg-gray-200 h-48 sm:h-64 rounded-xl flex items-center justify-center">
                <span className="text-gray-500 text-sm sm:text-base">Luxury Interior Rendering</span>
              </div>
              <div className="bg-gray-200 h-36 sm:h-48 rounded-xl flex items-center justify-center">
                <span className="text-gray-500 text-sm sm:text-base">Kitchen & Living Space</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Neighborhood */}
      <section id="location" className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Prime Location Advantage
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Located in the vibrant Old South Pearl neighborhood, offering the best choices in Denver for restaurants, coffee shops, and retail.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Neighborhood Highlights</h3>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <LocationCard 
                  title="Sushi Den"
                  rating="★★★★★ 4.7/5 Stars"
                  description="Acclaimed Japanese restaurant"
                />
                <LocationCard 
                  title="Park Burger"
                  rating="An absolute gem"
                  description="Denver Insider featured"
                />
                <LocationCard 
                  title="Uno Mas Taqueria"
                  rating="★★★★★ 4.5/5 Google"
                  description="Authentic Mexican cuisine"
                />
                <LocationCard 
                  title="Transit Access"
                  rating="RTD Light Rail"
                  description="Convenient public transport"
                />
              </div>
              
              <div className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
                <h4 className="font-semibold mb-3">Nearby Attractions</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>• Trader Joe's & Whole Foods Market</div>
                  <div>• Washington Park & Denver Zoo</div>
                  <div>• University of Denver</div>
                  <div>• Farmers Market (Weekly)</div>
                  <div>• National Women's Soccer League Future Stadium</div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white p-4 sm:p-6 rounded-xl h-full border border-gray-200">
                <h4 className="font-semibold mb-4">Location Map</h4>
                <div className="bg-gray-200 h-60 sm:h-80 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm sm:text-base">Interactive Map Coming Soon</span>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <div className="font-medium">1403 S. Pearl Street</div>
                  <div>Denver, Colorado 80210</div>
                  <div>Platt Park / Old South Pearl Neighborhood</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Overview */}
      <section id="financials" className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Investment Overview
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Compelling financial returns in Denver's premier real estate market
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
            <MetricCard value="$5.95M" label="Total Project Cost" />
            <MetricCard value="$8.51M" label="Finished Value" />
            <MetricCard value="$2.56M" label="Total Profit" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Project Metrics</h3>
              <div className="space-y-4">
                <MetricRow label="Total Units" value="7 units" />
                <MetricRow label="Gross Build SF" value="10,370 sf" />
                <MetricRow label="Net Indoor Living SF" value="8,576 sf" />
                <MetricRow label="MOIC" value="1.43x" highlight />
                <MetricRow label="IRR" value="49.70%" highlight />
              </div>
              
              {/* Pro Forma Disclaimer */}
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">Pro Forma Disclaimer</h4>
                <p className="text-yellow-800 text-xs leading-relaxed">
                  This Pro Forma was prepared based on numerous assumptions, such as current estimates of construction costs and expenses, 
                  interest rates, and market sales prices. If the assumptions prove incorrect, the Company will have difficulty achieving 
                  the Pro Forma estimates. Your rate of return may be higher or lower than what is estimated on this Pro Forma.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Development Timeline</h3>
              <div className="space-y-4">
                <TimelineItem label="Land Purchase" date="7/11/19" completed />
                <TimelineItem label="Construction Start" date="10/6/25" completed />
                <TimelineItem label="Construction Complete" date="12/6/26" />
                <TimelineItem label="Sales Closing" date="4/30/27" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fees, Expenses, and Construction Budget */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Fees, Expenses, and Construction Budget
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent fee structure and detailed construction budget management
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">Fee Structure Advantage</h3>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-green-900">No Management Fees</h4>
                </div>
                <p className="text-green-800 text-sm">
                  Unlike typical real estate developments, this offering does not charge ongoing management fees, 
                  allowing more capital to work directly for investors and enhancing overall project returns.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Transparent Structure</div>
                    <div className="text-gray-600 text-sm">All project costs and expenses clearly detailed and tracked</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Investor-Friendly Terms</div>
                    <div className="text-gray-600 text-sm">Fee structure designed to maximize investor returns</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">Construction Budget Excellence</h3>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">Budget Overview</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Land Acquisition</span>
                    <span className="font-semibold">$1,800,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Hard Construction Costs</span>
                    <span className="font-semibold">$3,200,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Soft Costs & Permits</span>
                    <span className="font-semibold">$590,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Interest & Loan Fees</span>
                    <span className="font-semibold">$360,000</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between items-center font-bold">
                    <span className="text-gray-900">Total Project Cost</span>
                    <span className="text-yellow-600">$5,950,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Opportunity */}
      <section id="investment" className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Confidential Investment Opportunity
          </h2>
          <p className="text-xl text-yellow-400 mb-4 font-semibold">
            For Accredited Investors Only
          </p>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Partner with C3H Development on this exceptional luxury development project in one of Denver's most desirable neighborhoods.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105">
              Request Investment Package
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
          
          {/* Investment Disclaimer */}
          <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6 mb-12 max-w-4xl mx-auto">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 text-red-400 flex-shrink-0 mt-1">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="font-bold text-red-300 mb-2">Important Investment Disclaimer</h4>
                <p className="text-red-200 text-sm leading-relaxed">
                  Investing in the Company is high risk, and you could lose all your investment. The Company does not guarantee any returns. 
                  This material is for informational purposes only and does not constitute an offer to sell or a solicitation to buy securities. 
                  All financial projections are estimates based on current market conditions and are subject to change.
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-3xl mx-auto">
            <h4 className="font-semibold mb-8 text-center text-xl">Contact Information</h4>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-300 mb-2">Project Developer</div>
                <div className="font-bold text-white text-lg">Lance Nading</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-300 mb-2">Phone</div>
                <a href="tel:720-359-8337" className="font-bold text-white text-lg hover:text-yellow-400 transition-colors">
                  720-359-8337
                </a>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-300 mb-2">Email</div>
                <a href="mailto:lance.nading@c3hdenver.com" className="font-bold text-white text-lg hover:text-yellow-400 transition-colors break-all">
                  lance.nading@c3hdenver.com
                </a>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <div className="text-sm text-gray-300 mb-2">Website</div>
                <a href="https://liv1403.com" className="font-bold text-white text-lg hover:text-yellow-400 transition-colors">
                  Liv1403.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimers and Confidentiality */}
      <section className="py-12 sm:py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              Disclaimers and Confidentiality
            </h2>
          </div>
          
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200">
            <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Confidentiality</h3>
                <p>
                  By accessing this investment presentation, you agree the information contained herein is confidential, 
                  and you agree not to reproduce, disclose, or distribute to any other person, in whole or in part, 
                  the contents of this investment presentation, unless the Company provides its prior written consent.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-2">No Representations or Warranties</h3>
                <p>
                  Neither the Company nor the Manager, nor any of their respective representatives or affiliates, makes any 
                  representation, warranty, or guaranty of any kind, express or implied, as to the accuracy, completeness, 
                  or reasonableness of the information contained in this investment presentation.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Not an Offer to Sell Securities</h3>
                <p>
                  This investment presentation does not constitute an offer to sell, or a solicitation of an offer to buy, 
                  any security. You should not use any information in this investment presentation as the basis for 
                  making any investment-related decision.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Investment Documents</h3>
                <p>
                  Interests in the Company will be offered only pursuant to the terms of a subscription agreement and 
                  a limited liability company operating agreement. All investments in the Company are illiquid, and there 
                  is no assurance that the Company will achieve any targeted investment returns. Investors could lose 
                  their entire investment.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Forward Looking Statements</h3>
                <p>
                  Certain information is based on estimates, projections, and assumptions, including construction costs, 
                  interest rates, and market sales prices. Neither the Manager nor the Company provides any assurances 
                  that any estimate, projection, or assumption will prove to be accurate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Component definitions
function FeatureItem({ title, description }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
      <div>
        <div className="font-semibold text-gray-900">{title}</div>
        <div className="text-gray-600">{description}</div>
      </div>
    </div>
  );
}

function LocationCard({ title, rating, description }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="text-lg font-semibold mb-2">{title}</div>
      <div className="text-yellow-600 mb-1">{rating}</div>
      <div className="text-gray-600 text-sm">{description}</div>
    </div>
  );
}

function MetricCard({ value, label }) {
  return (
    <div className="bg-white p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
      <div className="text-4xl font-bold text-yellow-600 mb-2">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}

function MetricRow({ label, value, highlight = false }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-200">
      <span className="font-medium">{label}</span>
      <span className={`font-bold ${highlight ? 'text-yellow-600' : ''}`}>{value}</span>
    </div>
  );
}

function TimelineItem({ label, date, completed = false }) {
  return (
    <div className="flex items-center space-x-4">
      <div className={`w-4 h-4 rounded-full ${completed ? 'bg-yellow-600' : 'bg-gray-300'}`}></div>
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-sm text-gray-600">{date}</div>
      </div>
    </div>
  );
}