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
                <button className="bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105">
                  View Investment Details
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                  Download Pro Forma
                </button>
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
        <section id="investment" className="py-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Investment Opportunity
            </h2>
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
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
              <h4 className="font-semibold mb-4">Contact Information</h4>
              <div className="grid md:grid-cols-2 gap-6 text-center">
                <ContactItem 
                  icon="👤"
                  label="Project Developer"
                  value="Lance Nading"
                />
                <ContactItem 
                  icon="📧"
                  label="Email"
                  value="lance.nading@c3hdenver.com"
                />
                <ContactItem 
                  icon="📱"
                  label="Phone"
                  value="720-359-8337"
                />
                <ContactItem 
                  icon="🌐"
                  label="Website"
                  value="Liv1403.com"
                />
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
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="text-lg font-semibold mb-2">{title}</div>
      <div className="text-yellow-600 mb-1">{rating}</div>
      <div className="text-gray-600 text-sm">{description}</div>
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

// Component for contact items
function ContactItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-sm text-gray-300">{label}</div>
      <div className="font-semibold text-white">{value}</div>
    </div>
  );
}