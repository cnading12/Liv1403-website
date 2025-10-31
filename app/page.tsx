'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const HERO_IMAGES = [
  { src: '/images/18-lastoutside.png', alt: 'Liv1403 Luxury Development Exterior' },
  { src: '/images/2-kitchen.jpg', alt: 'Old South Pearl Street' },
  { src: '/images/22-market.jpg', alt: 'Luxury Interior Living Space' },
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
{/* Background Image Carousel */}
<div className="absolute inset-0 z-0">
  {HERO_IMAGES.map((image, idx) => (
    <div
      key={idx}
      className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? 'opacity-40' : 'opacity-0'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-gray-800/50 z-10" />
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className={idx === 0 ? "object-cover object-[center_60%]" : "object-cover"}
        priority={idx === 0}
      />
    </div>
  ))}
</div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Liv1403
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-gray-200">
              High End, Luxury Residential Condominiums
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-gray-300">
              1403 S Pearl ST, Denver, Colorado
            </p>

            {/* Key Property Features */}
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 sm:p-6 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">6 Units</div>
                <div className="text-xs sm:text-sm text-gray-300">Residential Units</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 sm:p-6 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">8,576 SF</div>
                <div className="text-xs sm:text-sm text-gray-300">Residential SF</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 sm:p-6 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">4,638 SF</div>
                <div className="text-xs sm:text-sm text-gray-300">Private Rooftop Deck</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
              <a
                href="#overview"
                className="bg-yellow-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105 inline-block text-center text-sm sm:text-base shadow-xl"
              >
                View Project Details
              </a>
              <a
                href="#contact"
                className="border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 inline-block text-center text-sm sm:text-base"
              >
                Contact Lance Nading
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
                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section id="overview" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Project Summary
            </h2>
          </div>

          {/* Hero Image - Artist Rendering */}
          <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
            <Image
              src="/images/1-outside.jpg"
              alt="1403 South Pearl Street - Artist Rendering"
              fill
              className="object-cover object-center"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-sm sm:text-base">1403 South Pearl Street - Artist Rendering</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start mb-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">General Description</h3>
              <div className="space-y-4 mb-8">
                <p className="text-gray-600 leading-relaxed text-lg">
                  Liv1403 is a unique urban mixed-use project that will be providing high end, luxury residential
                  condominiums with additional street facing store front commercial retail space.
                </p>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Location</h3>
              <div className="space-y-4 mb-8">
                <p className="text-gray-600 leading-relaxed">
                  Class A+ high-impact, corner lot on Old South Pearl St. in the Platt Park neighborhood in Denver, Colorado.
                  Old South Pearl St. is a high value shopping and dining district located near the University of Denver. It
                  is known for its highly acclaimed shops, boutiques, and restaurants.
                </p>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Permit Status</h3>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Liv1403 construction permits have been approved and the project is shovel ready.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-lg">
              <h4 className="font-bold text-gray-900 mb-6 text-xl">Building Specifications</h4>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-gray-500 text-xs mb-1">Address</div>
                  <div className="font-bold text-gray-900">1403 S Pearl ST</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-gray-500 text-xs mb-1">Targeted Completion</div>
                  <div className="font-bold text-gray-900">5/15/2027</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-gray-500 text-xs mb-1">Residential Units</div>
                  <div className="font-bold text-gray-900 text-2xl">6</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-gray-500 text-xs mb-1">Residential SF</div>
                  <div className="font-bold text-gray-900 text-2xl">8,576</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-gray-500 text-xs mb-1">Retail SF</div>
                  <div className="font-bold text-gray-900">482 SF</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-gray-500 text-xs mb-1">Zoning</div>
                  <div className="font-bold text-gray-900">UMX-2</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-gray-500 text-xs mb-1">Total Land</div>
                  <div className="font-bold text-gray-900">6,250 SF</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-gray-500 text-xs mb-1">Levels</div>
                  <div className="font-bold text-gray-900">4</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-gray-500 text-xs mb-1">Private Rooftop Deck</div>
                  <div className="font-bold text-gray-900">4,638 SF</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-gray-500 text-xs mb-1">Gross Build</div>
                  <div className="font-bold text-gray-900">10,370 SF</div>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Projects Gallery */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl group">
              <Image
                src="/images/7-multifamily.jpg"
                alt="Previous Multi-family Project - Sloans Lake, Denver"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-sm font-medium">Previous Multi-family Project - Sloans Lake, Denver</p>
              </div>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl group">
              <Image
                src="/images/8-interior.jpg"
                alt="Previous Project - Highlands, Denver"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-sm font-medium">Previous Project - Highlands, Denver</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-500 italic text-center bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            Target returns are estimates. Any actual returns may materially differ. Investing in the Company is high risk,
            and you could lose all your investment. The Company does not guarantee any returns.
          </div>
        </div>
      </section>

      {/* Value Overview */}
      <section id="value" className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Value Overview
            </h2>
          </div>

          {/* Feature Image */}
          <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
            <Image
              src="/images/9-darkoutside.png"
              alt="1745 S. Pearl Street - 3 Blocks from Liv1403"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-white text-lg sm:text-xl font-semibold mb-2">
                Previous Multi-family Project on Old South Pearl Street
              </p>
              <p className="text-white/90 text-sm">
                1745 S. Pearl Street - 3 Blocks from Liv1403
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Recent Experience</h3>
              <p className="text-gray-600 leading-relaxed">
                The Principal, Lance Nading, previously completed 1745 S. Pearl St. an apartment building on Old South
                Pearl Street, and is deeply familiar with the neighborhood, community, and real estate values.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Liv1403 Condominium Value</h3>
              <p className="text-gray-600 leading-relaxed">
                Liv1403 condominiums are uniquely located, with cutting edge design, superior construction quality.
                Finished market value is anticipated to be between $850-$950+ per square foot. Additionally, Liv1403
                will provide the best in high end luxury finishes and state of the art technology in every unit.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">First to Market For-Sale Condos</h3>
              <p className="text-gray-600 leading-relaxed">
                Liv1403 will be first to market in the Old South Pearl St. submarket, offering the only for-sale
                exclusive high end luxury condominium purchase opportunity.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Existing Multi-Family Apartments</h3>
              <p className="text-gray-600 leading-relaxed">
                Currently, there are three new luxury apartment buildings on old South Pearl St. Each of the apartment
                buildings offer market rental rates between 3.90 - 5.00 psf per month. Each has extremely low vacancy
                and often times have wait lists to be approved for tenancy.
              </p>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-500 italic text-center bg-yellow-50 p-4 rounded-lg border border-yellow-100 max-w-4xl mx-auto">
            Target returns are estimates. Any actual returns may materially differ. Investing in the Company is high risk,
            and you could lose all your investment. The Company does not guarantee any returns.
          </div>
        </div>
      </section>

      {/* Principal Background */}
      <section id="principal" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Principal Background
            </h2>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            {/* Header with Name */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-8 sm:p-12 text-white">
              <h3 className="text-3xl sm:text-4xl font-bold mb-2">Lance Nading</h3>
              <p className="text-xl text-yellow-100">Principal</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 p-8 sm:p-12">
              {/* Photo */}
              <div className="lg:col-span-2">
                <div className="relative h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl sticky top-8">
                  <Image
                    src="/images/about.jpg"
                    alt="Lance Nading - Principal"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Biography */}
              <div className="lg:col-span-3 space-y-8">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-8 bg-yellow-600 mr-4"></div>
                    <h4 className="font-bold text-gray-900 text-xl">Early Roots</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Lance Nading is a Colorado native and third-generation builder. At a very young age, he often "helped"
                    his father at his father's local construction jobsites and earned as much as $1.00 per day! Although
                    Lance's father Merle's passion was all things construction, the winters were harsh and construction
                    could be slow, so to supplement his longer-term passion for construction, he also became a Denver
                    Policeman. Sadly, he was killed at the age of 31 in the line of duty in service to his community.
                    However, Merle's work ethic and love of community live on in Lance and keep his memory alive and strong.
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-8 bg-yellow-600 mr-4"></div>
                    <h4 className="font-bold text-gray-900 text-xl">Family Trade</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Through high school and college, Lance worked every summer for his grandfather Henry's construction company.
                    Working and learning, Lance quickly became as passionate about construction as his father and grandfather had
                    been. Lance has been a licensed General Contractor since 2000. He has built and developed commercial
                    restaurants, multifamily apartments and condominiums, and high-end luxury custom homes in the Denver-
                    Boulder area since 2000. Under his leadership, C3H Construction LLC has always delivered superior projects,
                    distinguished by the highest quality, longevity, and long-term value.
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-8 bg-yellow-600 mr-4"></div>
                    <h4 className="font-bold text-gray-900 text-xl">Education & Competition</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Educated at the University of Colorado with a focus on Economics, Business Finance, and Japanese Language
                    and Literature, his competitive drive extends beyond construction and real estate. As a national-level Judo
                    competitor, Lance earned the first alternate position at the 1996 Olympic Games held in Atlanta, Georgia.
                    He served as President of USA Judo, a member organization of the U.S. Olympic and Paralympic Committee,
                    from 2008-2016. During that time period, more Olympic medals were achieved by American Judo athletes than
                    in any other comparable period of the organization's history to date.
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-8 bg-yellow-600 mr-4"></div>
                    <h4 className="font-bold text-gray-900 text-xl">Leadership</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Lance's reputation reflects his leadership; each project is approached with a hands-on commitment to excellence
                    resulting in enduring client, buyer, and investor relationships, as well as developments that enhance the fabric of
                    the Denver communities in which they are located.
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-8 bg-yellow-600 mr-4"></div>
                    <h4 className="font-bold text-gray-900 text-xl">Family</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Lance currently resides in Greenwood Village, Colorado, with his wife Wendy of 30 years. They have two grown
                    children: McKenna, age 24, living in Seattle, Washington and thriving in the tech world, and Cole, age 23, a recent
                    Computer Science graduate of Colorado State University, who is also thriving in his growing business and tech
                    interests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Highlights */}
      <section id="design" className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Design Highlights
            </h2>
          </div>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-12">
            <div className="relative h-72 rounded-xl overflow-hidden shadow-lg group">
              <Image
                src="/images/10-table.jpg"
                alt="Previous Multi-family Project - Highlands, Denver"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-xs font-medium">Previous Multi-family Project - Highlands, Denver</p>
              </div>
            </div>
            <div className="relative h-72 rounded-xl overflow-hidden shadow-lg group">
              <Image
                src="/images/11-kitchen.jpg"
                alt="Previous Project - Cherry Creek, Denver"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-xs font-medium">Previous Project - Cherry Creek, Denver</p>
              </div>
            </div>
            <div className="relative h-72 rounded-xl overflow-hidden shadow-lg group">
              <Image
                src="/images/27-dinning.jpg"
                alt="Previous Multi-family Project - Sloans Lake, Denver"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-xs font-medium">Previous Multi-family Project - Sloans Lake, Denver</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg mb-2">Design & Craftsmanship</div>
                    <div className="text-gray-600 leading-relaxed">Unique materials and designs providing superior value, woodwork, casework, cabinetry, solid slab surfaces, tile work, and walk-in custom closets</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg mb-2">Technology & Security</div>
                    <div className="text-gray-600 leading-relaxed">State-of-the-art audio, visual, media, and security technologies</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg mb-2">Outdoor Living</div>
                    <div className="text-gray-600 leading-relaxed">Private rooftop decks with outdoor kitchens, fire pits, spas and dog-friendly synthetic grass</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg mb-2">Comfort & Wellness</div>
                    <div className="text-gray-600 leading-relaxed">Individual unit laundry, heating, air conditioning, infrared HEPA air filtration systems</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg mb-2">Appliances & Fixtures</div>
                    <div className="text-gray-600 leading-relaxed">Latest and best-in-class appliances, electrical fixtures, and plumbing fixtures</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg mb-2">Parking</div>
                    <div className="text-gray-600 leading-relaxed">Private underground garages, charging stations, storage and bike rack</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooftop Deck */}
      <section id="rooftop" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Rooftop Deck
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Unique private rooftop decks with every condominium unit
            </p>
          </div>

          {/* Three Image Layout */}
          <div className="grid gap-6 mb-12">
            {/* First Image - Full Width */}
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/rooftop-bbq.webp"
                alt="THis is where rooftop rendering will go"
                fill
                className="object-cover"
              />
            </div>

            {/* Two Images Side by Side */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/14-bbq.jpg"
                  alt="Rooftop Deck Seating Area - Artist Rendering"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm font-medium">Artist Rendering</p>
                </div>
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/16-rooftop.jpg"
                  alt="Previous Multi-family Project - Sloans Lake, Denver"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm font-medium">Previous Multi-family Project - Sloans Lake, Denver</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards in 2x3 Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Elevated Living</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Open-air rooftop decks can positively impact daily quality of life. Liv1403 offers unique rooftop decks
                with every condominium unit. Each deck includes: full kitchen, fire pit, water feature, pet-friendly
                synthetic turf, pergola, maintenance-free decking.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Year-Round Usability</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fortunately, in Denver, blue skies and warm temperatures of 50+ degree days can occur frequently
                through the coldest months of the winter.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Skyline Views</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Expansive, unobstructed views stretch from the Denver skyline to the Rocky Mountains, a rare vantage
                point in the Old South Pearl neighborhood.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Private Retreat</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Private rooftop decks can provide immediate solitude to focus and recharge, and views to take in and
                relax by. Convenience to the outdoors without having to leave your home.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Pet Owner Benefit</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pet owners enjoy the ability to provide exercise and relief at a second's notice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corner Lot Advantage - NEW SECTION */}
      <section id="corner-lot" className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Corner Lot Advantage
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Prime corner location with enhanced visibility and buildable square footage
            </p>
          </div>

          {/* Feature Images Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Corner Location Map */}
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/images/1-outside.jpg"
                alt="Corner Lot Location - Aerial View"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-sm font-medium">Corner Lot Location - S Pearl St & E Arkansas Ave</p>
              </div>
            </div>

            {/* Artist Rendering */}
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/images/hero.png"
                alt="Corner Lot Location Map"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-sm font-medium">Corner Lot Location Map *Placeholder*</p>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Higher Visibility</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Corner lots' higher visibility can lead to higher marketability and increased overall value
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Better Access</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Corner lots are accessible from multiple convenient locations instead of only a main door front entrance
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">More Sq Footage</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Because one of the sides of any corner lot does not have another structure within 10 feet of it, the builder is allowed to build up to the property line and is not required to provide a 10 foot separation between building structures, thus significantly increasing the overall buildable square footage of the corner lot
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Curb Appeal</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Corner lots enjoy significantly increased natural light, better ventilation, enhanced curb appeal, and more flexibility for design options
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Views</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Residents will enjoy unobstructed views of the surrounding Platt Park neighborhood
              </p>
            </div>
          </div>

          {/* Denver Skyline Feature Image */}
          <div className="relative h-96 sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-pink-500/30 mix-blend-overlay z-10" />
            <Image
              src="/images/19-skyline.jpg"
              alt="Denver Skyline with Mountain Views"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-lg sm:text-xl font-semibold mb-2">
                Unobstructed Views
              </p>
              <p className="text-white/90 text-sm">
                Expansive views from the Denver skyline to the Rocky Mountains
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Neighborhood */}
      <section id="location" className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              South Pearl St Community
            </h2>
          </div>

          {/* Feature Images */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/images/21-pearlSt.webp"
                alt="Old South Pearl Street Sign"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-sm font-medium">Old South Pearl Street</p>
              </div>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/images/22-market.jpg"
                alt="South Pearl Street Farmers Market"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-sm font-medium">South Pearl Street Farmers Market</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">Neighborhood Life</h3>

              <div className="space-y-6 mb-8">
                <p className="text-gray-600 leading-relaxed text-lg">
                  South Pearl Street is one of Denver's most historic and vibrant shopping districts. Spanning Buchtel to
                  Jewell Avenues, its tree-lined blocks offer a charming alternative to malls, featuring unique local
                  shops, top-rated restaurants, lively nightspots, and year-round community events that draw visitors
                  and locals alike.
                </p>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">Sunday Farmers Market</h3>

              <div className="space-y-6 mb-8">
                <p className="text-gray-600 leading-relaxed">
                  With live music and a warm, welcoming spirit, the South Pearl Street Farmers Market supports and
                  enhances the surrounding community with a great variety of fresh and wholesome products.
                </p>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">History</h3>

              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Old South Pearl Street in Denver, established in 1893, has evolved into a vibrant destination. Once a
                  hub for artisans and merchants, it now boasts trendy boutiques, acclaimed restaurants like Sushi
                  Den, lively music festivals, and a thriving farmers' market, making it a beloved community
                  centerpiece.
                </p>
              </div>
            </div>

            <div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-gray-200 shadow-xl">
                <h4 className="font-bold text-xl mb-6 text-gray-900">Location Map</h4>
                <div className="relative h-96 rounded-xl overflow-hidden shadow-lg mb-6">
                  <Image
                    src="/images/map.jpg"
                    alt="1403 S Pearl Street Location Map - Old South Pearl Retail and Entertainment District"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-sm text-gray-600 space-y-2 bg-gray-50 p-4 rounded-lg">
                  <div className="font-bold text-gray-900 text-base">1403 S. Pearl Street</div>
                  <div>Denver, Colorado</div>
                  <div>Platt Park / Old South Pearl Neighborhood</div>
                </div>
              </div>
            </div>
          </div>

          {/* Historic Photo */}
          {/* Historic Photo */}
          <div className="relative h-80 sm:h-96 md:h-[500px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/images/23-history.jpg"
              alt="Historic Old South Pearl Street Photo (1893)"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white text-sm font-medium">Historic Old South Pearl Street (1893)</p>
            </div>
          </div>
        </div>
      </section>

      {/* South Pearl St Highlights */}
      <section id="highlights" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              South Pearl St Highlights
            </h2>
          </div>

          <div className="space-y-8">
            {/* Michelin Restaurants */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-full">
                  <Image
                    src="/images/24-food.webp"
                    alt="Michelin Restaurant - Kizaki or Margot"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Nationally Acclaimed Restaurants</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Old South Pearl Street has become a culinary hotspot, now boasting two Michelin-starred gems:
                    Kizaki for masterful sushi and Margot for innovative seasonal tasting menus.
                  </p>
                </div>
              </div>
            </div>
            {/* Trader Joe's */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2">
                <div className="p-8 sm:p-10 flex flex-col justify-center order-2 md:order-1">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Trader Joe's is Coming</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Exciting news for future residents of Liv1403: in 2026, a brand-new Trader Joe's is scheduled to
                    open just one block away. With its affordable organic options, specialty items, and
                    neighborhood-friendly vibe, having Trader Joe's within walking distance adds everyday
                    convenience and enhances the vibrant lifestyle of this sought-after Pearl Street location.
                  </p>
                </div>
                <div className="relative h-64 md:h-full order-1 md:order-2">
                  <Image
                    src="/images/25-TJs.jpg"
                    alt="Trader Joe's Store"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* RTD Light Rail */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-full">
                  <Image
                    src="/images/26-rtd.jpg"
                    alt="RTD Light Rail Station"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-5">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Convenient Rapid Transit</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Just blocks from Liv1403, the light rail station offers seamless access across the city-whether residents
                    are commuting downtown, exploring Denver's many attractions, or catching a flight at DIA. This
                    connectivity makes car-free living easy and adds comfortable convenience to an already prime
                    location.
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
            Contact
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="tel:+13033598337"
              className="bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105"
            >
              Call +1 (303) 359-8337
            </a>
            <a
              href="mailto:Lance.nading@liv1403.com"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Email Lance Nading
            </a>
          </div>

          {/* Contact Information */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-3xl mx-auto">
            <h4 className="font-semibold mb-8 text-center text-xl">Liv1403</h4>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-300 mb-2">Principal</div>
                <div className="font-bold text-white text-lg">Lance Nading</div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-300 mb-2">Phone</div>
                <a href="tel:+13033598337" className="font-bold text-white text-lg hover:text-yellow-400 transition-colors">
                  +1 (303) 359-8337
                </a>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-300 mb-2">Email</div>
                <a href="mailto:Lance.nading@liv1403.com" className="font-bold text-white text-base hover:text-yellow-400 transition-colors break-all">
                  Lance.nading@liv1403.com
                </a>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="text-sm text-gray-300 mb-2">Website</div>
              <a href="https://www.Liv1403.com" className="font-bold text-white text-base hover:text-yellow-400 transition-colors">
                www.Liv1403.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimers */}
      <section className="py-12 sm:py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              Disclosures
            </h2>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200">
            <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Investment Presentation</h3>
                <p>
                  The following statements apply to this Confidential Investment Presentation and any verbal or
                  written comments made by anyone presenting or describing this Confidential Investment Presentation.
                  All information in this investment presentation is as of the time of production, unless otherwise noted,
                  and is subject to updating, revision, and amendment.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Not an Offer to Sell Securities</h3>
                <p className="uppercase">
                  THIS INVESTMENT PRESENTATION DOES NOT CONSTITUTE AN OFFER TO SELL, OR A SOLICITATION OF AN OFFER TO BUY,
                  ANY SECURITY. THIS INVESTMENT PRESENTATION MAY NOT BE RELIED ON IN CONNECTION WITH THE PURCHASE OR SALE OF
                  ANY SECURITY. YOU SHOULD NOT USE ANY INFORMATION IN THIS INVESTMENT PRESENTATION AS THE BASIS FOR MAKING ANY
                  INVESTMENT-RELATED DECISION. THE TERMS SET FORTH HEREIN ARE SUBJECT TO CHANGE OR DELETION AT ANY TIME WITHOUT
                  NOTICE AND ARE QUALIFIED IN THEIR ENTIRETY BY THE COMPANY'S INVESTMENT DOCUMENTS.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Forward Looking Statements</h3>
                <p>
                  Certain information in this investment presentation is based on estimates, projections, and assumptions,
                  including, without limitation, construction costs, labor and materials costs, the availability of
                  governmental approvals and permits, values of assets that incorporate projected appreciation, cap rates,
                  and other data, such as interest rates, population growth, and macro-economic conditions. Neither the
                  Manager nor the Company provides any assurances that any estimate, projection, or assumption will prove
                  to be accurate.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Investment Documents</h3>
                <p>
                  Interests in the Company will be offered only pursuant to the terms of a subscription agreement and a
                  limited liability company operating agreement, each of which will be provided to qualified investors on
                  a confidential basis. Prospective investors should carefully consider all risks of any investment in the
                  Company. All investments in the Company are speculative, illiquid, and subject to restrictions on transfer.
                  There is no assurance that the Company will achieve any targeted investment returns, or any returns at all.
                  Investors in the Company could lose their entire investment.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Budgeted Amounts</h3>
                <p>
                  All budgeted amounts are estimates only and may materially differ in practice. Many construction costs
                  are outside of the Company's control. Changes in budgeted costs may materially and negatively impact
                  investor returns.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Timeline</h3>
                <p>
                  All future dates and anticipated milestones are estimates only. Actual timing may materially differ.
                  The Company does not guarantee any future performance, results, or timeframes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}