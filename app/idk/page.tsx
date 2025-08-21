'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

// Hero slideshow images for commercial projects (not just the featured ones)
const HERO_IMAGES = [
  "/images/hero/Commercial.jpg",
  "/images/commercial/sloans-lake/2.jpg",
  "/images/commercial/ft-collins/5.jpg",
  "/images/commercial/ft-collins/2.webp",
  "/images/commercial/sloans-lake/4.jpg",
  "/images/commercial/sloans-lake/5.jpg"
];

const PROJECTS = [
  {
    name: "Sloans Lake CoWork & Event Space",
    slug: "merritt-cowork",
    description: "A modern co-working and event space steps from Denver's Sloans Lake",
    images: [
      "/images/hero/Commercial.jpg",
      "/images/commercial/sloans-lake/2.jpg",
      "/images/commercial/sloans-lake/3.jpg"
    ],
  },
  {
    name: "Ft. Collins Mixed Use Space",
    slug: "fort-collins",
    description: "A durable mixed-use development pairing street-level commercial with offices above",
    images: [
      "/images/commercial/ft-collins/1.jpg",
      "/images/commercial/ft-collins/2.webp",
      "/images/commercial/ft-collins/3.jpg"
    ],
  },
];

const CAPABILITIES = [
  {
    title: "Office Buildings",
    description: "Modern workspace solutions designed for productivity and collaboration"
  },
  {
    title: "Mixed-Use Development",
    description: "Integrated commercial and residential spaces that strengthen communities"
  },
  {
    title: "Retail Spaces",
    description: "Customer-focused environments that drive business success"
  },
  {
    title: "Event Venues",
    description: "Flexible spaces designed for gatherings, conferences, and celebrations"
  }
];

export default function Commercial() {
  // Hero slideshow
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % HERO_IMAGES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleHeroKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') setHeroIndex(prev => (prev + 1) % HERO_IMAGES.length);
    if (e.key === 'ArrowLeft') setHeroIndex(prev => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  }, []);
  
  useEffect(() => {
    window.addEventListener('keydown', handleHeroKey);
    return () => window.removeEventListener('keydown', handleHeroKey);
  }, [handleHeroKey]);

  // Featured projects hover slideshows
  const [indexes, setIndexes] = useState<number[]>([0, 0]);
  const intervals = useRef<Array<number | null>>([null, null]);

  const handleMouseEnter = (idx: number) => {
    intervals.current[idx] = window.setInterval(() => {
      setIndexes((current) => {
        const updated = [...current];
        updated[idx] = (updated[idx] + 1) % PROJECTS[idx].images.length;
        return updated;
      });
    }, 1200);
  };

  const handleMouseLeave = (idx: number) => {
    if (intervals.current[idx]) {
      clearInterval(intervals.current[idx]!);
      intervals.current[idx] = null;
    }
    setIndexes((current) => {
      const updated = [...current];
      updated[idx] = 0;
      return updated;
    });
  };

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "C3H Construction",
    "url": "https://c3hconstruction.com",
    "description": "Leading commercial construction company in Denver and Colorado specializing in office buildings, retail spaces, and mixed-use developments",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Colorado",
      "addressCountry": "US"
    },
    "serviceArea": ["Denver", "Boulder", "Fort Collins", "Colorado"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Commercial Construction Services",
      "itemListElement": CAPABILITIES.map(capability => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": capability.title,
          "description": capability.description,
          "provider": {
            "@type": "Organization",
            "name": "C3H Construction"
          }
        }
      }))
    }
  };

  const projectsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Commercial Construction Projects",
    "itemListElement": PROJECTS.map((project, index) => ({
      "@type": "CreativeWork",
      "position": index + 1,
      "name": project.name,
      "description": project.description,
      "creator": {
        "@type": "Organization",
        "name": "C3H Construction"
      }
    }))
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://c3hconstruction.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Commercial",
        "item": "https://c3hconstruction.com/commercial"
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Commercial Construction Denver Colorado | Office Buildings & Mixed Use | C3H Construction</title>
        <meta name="description" content="C3H Construction builds commercial properties in Denver & Colorado. Office buildings, retail spaces, mixed-use developments. 30+ years experience. Contact us today." />
        <meta name="keywords" content="commercial construction Denver, office building contractor Colorado, retail construction Boulder, mixed use development, commercial contractor Denver, business construction Colorado" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://c3hconstruction.com/commercial" />
        
        <meta property="og:title" content="Commercial Construction Denver | Office & Retail Builder Colorado | C3H Construction" />
        <meta property="og:description" content="Leading commercial construction company in Denver & Colorado. We build office buildings, retail spaces, and mixed-use developments with 30+ years of experience." />
        <meta property="og:image" content="https://c3hconstruction.com/images/hero/Commercial.jpg" />
        <meta property="og:url" content="https://c3hconstruction.com/commercial" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="C3H Construction" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Commercial Construction Denver | Office & Retail Builder Colorado | C3H Construction" />
        <meta name="twitter:description" content="Leading commercial construction company in Denver & Colorado. Office buildings, retail spaces, mixed-use developments." />
        <meta name="twitter:image" content="https://c3hconstruction.com/images/hero/Commercial.jpg" />
        
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Denver, Colorado" />
        <meta name="geo.position" content="39.7392;-104.9903" />
        <meta name="ICBM" content="39.7392, -104.9903" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
      </Head>

      <main className="min-h-screen bg-black text-white font-sans">
        <section className="w-full h-[75vh] sm:h-[95vh] relative flex items-center justify-center overflow-hidden">
          {HERO_IMAGES.map((img, idx) => (
            <Image
              key={img}
              src={img}
              alt={`Commercial construction project by C3H in Denver Colorado - ${idx + 1}`}
              fill
              className={`object-cover absolute inset-0 transition-opacity duration-1000 ${idx === heroIndex ? "opacity-100 z-0" : "opacity-0 z-0"}`}
              priority={idx === 0}
              sizes="100vw"
            />
          ))}
          
          <div className="absolute inset-0 bg-black/60 z-10" />
          
          <div className="z-20 absolute inset-0 flex flex-col items-center justify-center px-6">
            <div className="text-center max-w-4xl">
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 text-white drop-shadow-2xl leading-tight">
                Commercial
              </h1>
              <p className="text-lg sm:text-xl text-gray-100 font-medium max-w-3xl mx-auto leading-relaxed mb-8 drop-shadow-lg">
                Delivering excellence in commercial development: office, retail, and mixed-use spaces for Colorado's business leaders.
              </p>
              
              <Link 
                href="#featured-projects" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center bg-white text-black px-8 py-4 rounded-sm font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Our Projects
              </Link>
            </div>

            <div className="flex gap-2 mt-8">
              {HERO_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroIndex(idx)}
                  className={`h-2 w-7 rounded-full transition-all duration-300 ${idx === heroIndex ? "bg-white/90" : "bg-white/40"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          
          <button
            onClick={() => setHeroIndex(prev => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/60 hover:bg-white/90 text-black p-2 rounded-full shadow transition"
            aria-label="Previous slide"
          >
            &#8592;
          </button>
          <button
            onClick={() => setHeroIndex(prev => (prev + 1) % HERO_IMAGES.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/60 hover:bg-white/90 text-black p-2 rounded-full shadow transition"
            aria-label="Next slide"
          >
            &#8594;
          </button>
        </section>

        <section id="featured-projects" className="bg-zinc-950 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Featured Projects</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Explore our portfolio of successful commercial developments that have transformed Colorado communities and businesses.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {PROJECTS.map((project, idx) => (
                <Link
                  href={`/commercial/${project.slug}`}
                  key={project.slug}
                  className="group relative block rounded-sm overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-zinc-900 border border-zinc-800"
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={project.images[indexes[idx]]}
                      alt={`${project.name} - Commercial construction by C3H Construction`}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 drop-shadow-lg">
                        {project.name}
                      </h3>
                      <p className="text-gray-100 text-sm leading-relaxed drop-shadow">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-6 text-white">Why Choose C3H Commercial?</h3>
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                C3H Construction brings a wealth of expertise to Colorado's commercial sector. We are trusted by clients for timely delivery, strict quality standards, and innovative solutions for every commercial need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-zinc-900 rounded-sm border border-zinc-800">
                <div className="text-3xl font-bold text-white mb-2">30+</div>
                <div className="text-gray-300 font-medium">Years Experience</div>
              </div>
              <div className="text-center p-6 bg-zinc-900 rounded-sm border border-zinc-800">
                <div className="text-3xl font-bold text-white mb-2">10+</div>
                <div className="text-gray-300 font-medium">Commercial Projects</div>
              </div>
              <div className="text-center p-6 bg-zinc-900 rounded-sm border border-zinc-800">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-gray-300 font-medium">On-Time Delivery</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}