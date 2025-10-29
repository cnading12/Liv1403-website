'use client';

import { useState, useEffect } from 'react';

const HERO_IMAGES = [
  { src: '/images/hero.png', alt: 'Liv 1403 Luxury Development Exterior' },
  { src: '/images/old.jpg', alt: 'Old South Pearl Street' },
  { src: '/images/market.jpg', alt: 'Luxury Interior Living Space' },
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
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-800/60 z-10" />
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover"
              />
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
            
            {/* Key Property Features */}
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 sm:p-6 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">6 Units</div>
                <div className="text-xs sm:text-sm text-gray-300">Luxury Condominiums</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 sm:p-6 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">8,576 SF</div>
                <div className="text-xs sm:text-sm text-gray-300">Living Space</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 sm:p-6 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">4,638 SF</div>
                <div className="text-xs sm:text-sm text-gray-300">Private Rooftop Decks</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
              <a 
                href="#overview"
                className="bg-yellow-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105 inline-block text-center text-sm sm:text-base"
              >
                Explore The Development
              </a>
              <a 
                href="#contact"
                className="border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 inline-block text-center text-sm sm:text-base"
              >
                Schedule A Showing
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

      {/* Project Overview */}
      <section id="overview" className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Project Overview
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              An urban residential mixed-use development located in Denver's most highly sought-after neighborhood, Platt Park.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">About Liv 1403</h3>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Liv1403 is a unique urban mixed-use project providing high-end, luxury residential 
                  condominiums with additional street-facing storefront commercial retail space.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Located on a Class A+ high-impact corner lot on Old South Pearl Street in the Platt Park 
                  neighborhood. Known for highly acclaimed shops, boutiques, and restaurants near the University of Denver.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Construction permits have been approved and the project is shovel ready, with targeted 
                  completion in May 2027.
                </p>
              </div>
              
              <div className="mt-8 bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Building Specifications</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Residential Units</div>
                    <div className="font-semibold text-gray-900">6</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Levels</div>
                    <div className="font-semibold text-gray-900">4</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Residential SF</div>
                    <div className="font-semibold text-gray-900">8,576 SF</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Retail SF</div>
                    <div className="font-semibold text-gray-900">482 SF</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Rooftop Decks</div>
                    <div className="font-semibold text-gray-900">4,638 SF</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Total Land</div>
                    <div className="font-semibold text-gray-900">6,250 SF</div>
                  </div>
                </div>
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
              <p className="text-gray-600 text-sm">Trader Joe's opening one block away in 2026, driving neighborhood growth</p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">First-to-Market</h3>
              <p className="text-gray-600 text-sm">Only for-sale luxury condominiums in the Old South Pearl submarket</p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Proven Experience</h3>
              <p className="text-gray-600 text-sm">Developer Lance Nading's extensive track record delivering luxury projects on Pearl Street</p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Highlights */}
      <section id="design" className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Premium Features & Amenities
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              State-of-the-art design with luxury finishes throughout
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
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
      <section id="location" className="py-12 sm:py-20 bg-gray-50">
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
              
              <div className="space-y-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Michelin-Starred Restaurants</h4>
                  <p className="text-gray-600 text-sm">Kizaki and Margot - Two Michelin-starred gems on Old South Pearl</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Trader Joe's Coming 2026</h4>
                  <p className="text-gray-600 text-sm">Brand-new Trader Joe's opening just one block away</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">RTD Light Rail Access</h4>
                  <p className="text-gray-600 text-sm">Seamless access across the city, to downtown, DIA, and attractions</p>
                </div>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
                <h4 className="font-semibold mb-3">Nearby Attractions</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>• Whole Foods Market</div>
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

      {/* Principal Background */}
      <section id="principal" className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Developer Background
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
                  <h4 className="font-semibold text-gray-900 mb-2">Third-Generation Builder</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Colorado native and third-generation builder with a licensed General Contractor since 2000. 
                    Built commercial restaurants, multifamily apartments and condominiums, and high-end luxury 
                    custom homes in the Denver-Boulder area.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Local Market Expertise</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Previously completed 1745 S. Pearl St. on Old South Pearl Street, and is deeply familiar 
                    with the neighborhood, community, and real estate values.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Construction Excellence</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Hands-on approach to construction and project management, consistently delivering 
                    projects on time and on budget with superior quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Schedule a Private Showing
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact C3H Development to learn more about this exceptional luxury development project 
            in one of Denver's most desirable neighborhoods.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="tel:720-359-8337"
              className="bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105"
            >
              Call 720-359-8337
            </a>
            <a 
              href="mailto:lance.nading@c3hdenver.com"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Email Lance Nading
            </a>
          </div>
          
          {/* Contact Information */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-3xl mx-auto">
            <h4 className="font-semibold mb-8 text-center text-xl">Contact Information</h4>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-300 mb-2">Developer</div>
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
                <a href="mailto:lance.nading@c3hdenver.com" className="font-bold text-white text-base hover:text-yellow-400 transition-colors break-all">
                  lance.nading@c3hdenver.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimers */}
      <section className="py-12 sm:py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              Important Information
            </h2>
          </div>
          
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200">
            <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Marketing Material</h3>
                <p>
                  This website contains general marketing information about the Liv 1403 development. 
                  Renderings, floor plans, and specifications are subject to change. All information 
                  is believed to be accurate but is not guaranteed.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Not an Offer</h3>
                <p>
                  This website does not constitute an offer to sell or a solicitation of an offer to buy 
                  any property or securities. Any investment or purchase opportunities will be offered 
                  only through official legal documents.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Forward Looking Statements</h3>
                <p>
                  Certain information is based on estimates, projections, and assumptions. Completion 
                  dates, prices, and other details are subject to change without notice.
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