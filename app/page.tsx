'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

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
    <>
      <Head>
        <title>Liv 1403 | Luxury Residential Mixed-Use Development | Denver Investment Opportunity</title>
        <meta name="description" content="Exceptional investment opportunity in Denver's Platt Park. Luxury residential mixed-use development with 7 units, rooftop decks, and premium finishes. $8.5M projected value." />
        <meta name="keywords" content="Denver real estate investment, Platt Park development, luxury condos, mixed-use development, South Pearl Street, real estate opportunity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Liv 1403 | Premier Denver Investment Opportunity" />
        <meta property="og:description" content="Luxury residential mixed-use development in Denver's sought-after Platt Park neighborhood. 49.70% IRR projected return." />
        <meta property="og:image" content="/images/liv1403-hero.jpg" />
        <meta property="og:url" content="https://liv1403.com" />
        <meta property="og:site_name" content="Liv 1403" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Liv 1403 | Premier Denver Investment Opportunity" />
        <meta name="twitter:description" content="Luxury residential mixed-use development in Denver's sought-after Platt Park neighborhood. 49.70% IRR projected return." />
      </Head>

      <main className="bg-gray-50">

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden -mt-[92px] pt-[92px]">
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
                {/* Placeholder for actual images */}
                <div className="w-full h-full bg-gray-600" />
              </div>
            ))}
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Liv 1403
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-gray-200">
                Luxury Residential Mixed-Use Development
              </p>
              <p className="text-lg md:text-xl mb-8 text-gray-300">
                1403 S. Pearl Street, Denver, Colorado 80210
              </p>
              
              {/* Key Investment Metrics */}
              <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-400">$8.5M</div>
                  <div className="text-sm text-gray-300">Projected Value</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-400">49.70%</div>
                  <div className="text-sm text-gray-300">IRR</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-400">7 Units</div>
                  <div className="text-sm text-gray-300">Luxury Residences</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#financials"
                  className="bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105 inline-block text-center"
                >
                  View Investment Details
                </a>
                <a 
                  href="/investor"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 inline-block text-center"
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

        {/* Project Overview */}
        <section id="overview" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Project Development Summary
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                An urban residential mixed-use development located in Denver's most highly sought-after neighborhood, Platt Park.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Premium Features & Amenities</h3>
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
              
              <div className="space-y-4">
                <div className="bg-gray-200 h-64 rounded-xl flex items-center justify-center">
                  <span className="text-gray-500">Luxury Interior Rendering</span>
                </div>
                <div className="bg-gray-200 h-48 rounded-xl flex items-center justify-center">
                  <span className="text-gray-500">Kitchen & Living Space</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Neighborhood */}
        <section id="location" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Prime Location Advantage
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Located in the vibrant Old South Pearl neighborhood, offering the best choices in Denver for restaurants, coffee shops, and retail.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Neighborhood Highlights</h3>
                <div className="grid md:grid-cols-2 gap-6">
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
                
                <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200">
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
                <div className="bg-white p-6 rounded-xl h-full border border-gray-200">
                  <h4 className="font-semibold mb-4">Location Map</h4>
                  <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Interactive Map Coming Soon</span>
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

        {/* Market Comparables */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Market Position
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Liv 1403 is strategically positioned among Denver's most prestigious neighborhoods, offering exceptional value in the luxury market.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Comparable Neighborhoods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Platt Park / Old South Pearl</span>
                    <span className="text-yellow-600 font-semibold">Our Location</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">LoHi (Highlands)</span>
                    <span className="text-gray-600">Premium Comparable</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Cherry Creek</span>
                    <span className="text-gray-600">Luxury Benchmark</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Union Station</span>
                    <span className="text-gray-600">Urban Core</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Downtown Denver</span>
                    <span className="text-gray-600">Central Business District</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl">
                <h4 className="text-xl font-bold mb-6 text-gray-900">Competitive Advantages</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold">Historic Character</div>
                      <div className="text-gray-600 text-sm">Established 1893 neighborhood with authentic charm</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold">Walkable Lifestyle</div>
                      <div className="text-gray-600 text-sm">Tree-lined blocks with unique local businesses</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold">Community Events</div>
                      <div className="text-gray-600 text-sm">Farmers Market and year-round neighborhood gatherings</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold">Strategic Location</div>
                      <div className="text-gray-600 text-sm">Central access to Washington Park, DU, and downtown</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neighborhood Deep Dive */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Old South Pearl Neighborhood
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A vibrant historic district that perfectly balances urban convenience with community charm.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-xl border border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Neighborhood Life</h3>
                <p className="text-gray-600 leading-relaxed">
                  South Pearl Street is one of Denver's most historic and vibrant shopping districts. 
                  Spanning Buchtel to Jewell Avenues, its tree-lined blocks offer a charming alternative 
                  to malls, featuring unique local shops, top-rated restaurants, lively nightspots, 
                  and year-round community events that draw visitors and locals alike.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl border border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Community Events</h3>
                <p className="text-gray-600 leading-relaxed">
                  Jarman and Co Events manages the South Pearl Street Farmers Market. 
                  They strive to support and enhance the surrounding community by providing a 
                  Farmers Market experience where a great variety of fresh and wholesome products can be found.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl border border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">History</h3>
                <p className="text-gray-600 leading-relaxed">
                  Old South Pearl Street in Denver, established in 1893, has evolved into a vibrant destination. 
                  Once a hub for artisans and merchants, it now boasts trendy boutiques, acclaimed restaurants 
                  like Sushi Den, lively music festivals, and a thriving farmers' market, making it a beloved community centerpiece.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Overview */}
        <section id="financials" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Investment Overview
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Compelling financial returns in Denver's premier real estate market
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <MetricCard value="$5.95M" label="Total Project Cost" />
              <MetricCard value="$8.51M" label="Finished Value" />
              <MetricCard value="$2.56M" label="Total Profit" />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Project Metrics</h3>
                <div className="space-y-4">
                  <MetricRow label="Total Units" value="7 units" />
                  <MetricRow label="Gross Build SF" value="10,370 sf" />
                  <MetricRow label="Net Indoor Living SF" value="8,576 sf" />
                  <MetricRow label="MOIC" value="1.43x" highlight />
                  <MetricRow label="IRR" value="49.70%" highlight />
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Development Timeline</h3>
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

{/* Investment Opportunity */}
        <section id="investment" className="py-12 sm:py-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Investment Opportunity
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Partner with C3H Development on this exceptional luxury development project in one of Denver's most desirable neighborhoods.
            </p>
            
            <div className="flex flex-col gap-3 sm:gap-4 max-w-sm mx-auto sm:max-w-none sm:flex-row sm:justify-center mb-8 sm:mb-12">
              <button className="bg-yellow-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                Request Investment Package
              </button>
              <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 text-sm sm:text-base">
                Schedule Consultation
              </button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
              <h4 className="font-semibold mb-6 sm:mb-8 text-center text-lg sm:text-xl">Contact Information</h4>
              <div className="grid grid-cols-2 gap-4 sm:gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2">Project Developer</div>
                  <div className="font-bold text-white text-sm sm:text-lg">Lance Nading</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2">Phone</div>
                  <a href="tel:720-359-8337" className="font-bold text-white text-sm sm:text-lg hover:text-yellow-400 transition-colors">
                    720-359-8337
                  </a>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2">Email</div>
                  <a href="mailto:lance.nading@c3hdenver.com" className="font-bold text-white text-xs sm:text-lg hover:text-yellow-400 transition-colors break-all">
                    lance.nading@c3hdenver.com
                  </a>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

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
    <>
      <Head>
        <title>Liv 1403 | Luxury Residential Mixed-Use Development | Denver Investment Opportunity</title>
        <meta name="description" content="Exceptional investment opportunity in Denver's Platt Park. Luxury residential mixed-use development with 7 units, rooftop decks, and premium finishes. $8.5M projected value." />
        <meta name="keywords" content="Denver real estate investment, Platt Park development, luxury condos, mixed-use development, South Pearl Street, real estate opportunity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Liv 1403 | Premier Denver Investment Opportunity" />
        <meta property="og:description" content="Luxury residential mixed-use development in Denver's sought-after Platt Park neighborhood. 49.70% IRR projected return." />
        <meta property="og:image" content="/images/liv1403-hero.jpg" />
        <meta property="og:url" content="https://liv1403.com" />
        <meta property="og:site_name" content="Liv 1403" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Liv 1403 | Premier Denver Investment Opportunity" />
        <meta name="twitter:description" content="Luxury residential mixed-use development in Denver's sought-after Platt Park neighborhood. 49.70% IRR projected return." />
      </Head>

      <main className="bg-gray-50">

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden -mt-[92px] pt-[92px]">
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
                {/* Placeholder for actual images */}
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
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300">
                1403 S. Pearl Street, Denver, Colorado 80210
              </p>
              
              {/* Key Investment Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto">
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
              
              <div className="flex flex-col gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto sm:flex-row sm:justify-center">
                <a 
                  href="#financials"
                  className="bg-yellow-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105 inline-block text-center text-sm sm:text-base"
                >
                  View Investment Details
                </a>
                <a 
                  href="/investor"
                  className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 inline-block text-center text-sm sm:text-base"
                >
                  Investor Portal
                </a>
              </div>
            </div>
          </div>

          {/* Carousel Navigation */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex space-x-2 sm:space-x-3">
              {HERO_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
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
                Project Development Summary
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                An urban residential mixed-use development located in Denver's most highly sought-after neighborhood, Platt Park.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Premium Features & Amenities</h3>
                <div className="space-y-3 sm:space-y-4">
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
              
              <div className="space-y-3 sm:space-y-4">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                  <h4 className="font-semibold mb-3 text-sm sm:text-base">Nearby Attractions</h4>
                  <div className="text-xs sm:text-sm text-gray-600 space-y-1">
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
                  <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Location Map</h4>
                  <div className="bg-gray-200 h-64 sm:h-80 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm sm:text-base">Interactive Map Coming Soon</span>
                  </div>
                  <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
                    <div className="font-medium">1403 S. Pearl Street</div>
                    <div>Denver, Colorado 80210</div>
                    <div>Platt Park / Old South Pearl Neighborhood</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Comparables */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Market Position
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Liv 1403 is strategically positioned among Denver's most prestigious neighborhoods, offering exceptional value in the luxury market.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Comparable Neighborhoods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Platt Park / Old South Pearl</span>
                    <span className="text-yellow-600 font-semibold">Our Location</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">LoHi (Highlands)</span>
                    <span className="text-gray-600">Premium Comparable</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Cherry Creek</span>
                    <span className="text-gray-600">Luxury Benchmark</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Union Station</span>
                    <span className="text-gray-600">Urban Core</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Downtown Denver</span>
                    <span className="text-gray-600">Central Business District</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl">
                <h4 className="text-xl font-bold mb-6 text-gray-900">Competitive Advantages</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold">Historic Character</div>
                      <div className="text-gray-600 text-sm">Established 1893 neighborhood with authentic charm</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold">Walkable Lifestyle</div>
                      <div className="text-gray-600 text-sm">Tree-lined blocks with unique local businesses</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold">Community Events</div>
                      <div className="text-gray-600 text-sm">Farmers Market and year-round neighborhood gatherings</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold">Strategic Location</div>
                      <div className="text-gray-600 text-sm">Central access to Washington Park, DU, and downtown</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neighborhood Deep Dive */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Old South Pearl Neighborhood
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A vibrant historic district that perfectly balances urban convenience with community charm.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-xl border border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Neighborhood Life</h3>
                <p className="text-gray-600 leading-relaxed">
                  South Pearl Street is one of Denver's most historic and vibrant shopping districts. 
                  Spanning Buchtel to Jewell Avenues, its tree-lined blocks offer a charming alternative 
                  to malls, featuring unique local shops, top-rated restaurants, lively nightspots, 
                  and year-round community events that draw visitors and locals alike.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl border border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Community Events</h3>
                <p className="text-gray-600 leading-relaxed">
                  Jarman and Co Events manages the South Pearl Street Farmers Market. 
                  They strive to support and enhance the surrounding community by providing a 
                  Farmers Market experience where a great variety of fresh and wholesome products can be found.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl border border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">History</h3>
                <p className="text-gray-600 leading-relaxed">
                  Old South Pearl Street in Denver, established in 1893, has evolved into a vibrant destination. 
                  Once a hub for artisans and merchants, it now boasts trendy boutiques, acclaimed restaurants 
                  like Sushi Den, lively music festivals, and a thriving farmers' market, making it a beloved community centerpiece.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Overview */}
        <section id="financials" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Investment Overview
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Compelling financial returns in Denver's premier real estate market
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <MetricCard value="$5.95M" label="Total Project Cost" />
              <MetricCard value="$8.51M" label="Finished Value" />
              <MetricCard value="$2.56M" label="Total Profit" />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Project Metrics</h3>
                <div className="space-y-4">
                  <MetricRow label="Total Units" value="7 units" />
                  <MetricRow label="Gross Build SF" value="10,370 sf" />
                  <MetricRow label="Net Indoor Living SF" value="8,576 sf" />
                  <MetricRow label="MOIC" value="1.43x" highlight />
                  <MetricRow label="IRR" value="49.70%" highlight />
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Development Timeline</h3>
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

        {/* Investment Opportunity */}
        <section id="investment" className="py-12 sm:py-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Investment Opportunity
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Partner with C3H Development on this exceptional luxury development project in one of Denver's most desirable neighborhoods.
            </p>
            
            <div className="flex flex-col gap-3 sm:gap-4 max-w-sm mx-auto sm:max-w-none sm:flex-row sm:justify-center mb-8 sm:mb-12">
              <button className="bg-yellow-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                Request Investment Package
              </button>
              <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 text-sm sm:text-base">
                Schedule Consultation
              </button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
              <h4 className="font-semibold mb-6 sm:mb-8 text-center text-lg sm:text-xl">Contact Information</h4>
              <div className="grid grid-cols-2 gap-4 sm:gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2">Project Developer</div>
                  <div className="font-bold text-white text-sm sm:text-lg">Lance Nading</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2">Phone</div>
                  <a href="tel:720-359-8337" className="font-bold text-white text-sm sm:text-lg hover:text-yellow-400 transition-colors">
                    720-359-8337
                  </a>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2">Email</div>
                  <a href="mailto:lance.nading@c3hdenver.com" className="font-bold text-white text-xs sm:text-lg hover:text-yellow-400 transition-colors break-all">
                    lance.nading@c3hdenver.com
                  </a>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2">Website</div>
                  <a href="https://liv1403.com" className="font-bold text-white text-sm sm:text-lg hover:text-yellow-400 transition-colors">
                    Liv1403.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Component for feature items
function FeatureItem({ title, description }: { title: string; description: string }) {
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

// Component for location cards
function LocationCard({ title, rating, description }: { title: string; rating: string; description: string }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="text-base sm:text-lg font-semibold mb-2">{title}</div>
      <div className="text-yellow-600 mb-1 text-sm sm:text-base">{rating}</div>
      <div className="text-gray-600 text-xs sm:text-sm">{description}</div>
    </div>
  );
}

// Component for metric cards
function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
      <div className="text-4xl font-bold text-yellow-600 mb-2">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}

// Component for metric rows
function MetricRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-200">
      <span className="font-medium">{label}</span>
      <span className={`font-bold ${highlight ? 'text-yellow-600' : ''}`}>{value}</span>
    </div>
  );
}

// Component for timeline items
function TimelineItem({ label, date, completed = false }: { label: string; date: string; completed?: boolean }) {
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