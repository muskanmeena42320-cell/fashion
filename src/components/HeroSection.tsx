import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BrandConfig } from '../types';

interface HeroSectionProps {
  brand: BrandConfig;
  onShopNewArrivals: () => void;
  onExploreCollection: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  brand,
  onShopNewArrivals,
  onExploreCollection,
}) => {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#FBFBF9] pt-6 pb-16 lg:py-20 border-b border-[#EFEFEA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Refined Editorial Copy */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10">
            {/* Small uppercase technical/editorial tag */}
            <div className="flex items-center gap-2 text-xs font-mono-tag tracking-widest text-[#1E40AF] uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-[#1E40AF]" />
              <span>NEW DROP / 01</span>
              <span className="text-neutral-400">·</span>
              <span className="text-neutral-500 font-sans tracking-normal">{brand.cityCountry}</span>
            </div>

            {/* Controlled, elegant display headline (not enormous, balanced) */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#141413] leading-[1.08] mb-6">
              NEW SEASON.<br />
              <span className="text-neutral-700">NEW ATTITUDE.</span>
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-md mb-8">
              {brand.tagline}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onShopNewArrivals}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-xs uppercase font-medium tracking-wider text-white bg-[#141413] hover:bg-neutral-800 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
              >
                <span>SHOP NEW ARRIVALS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreCollection}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs uppercase font-medium tracking-wider text-[#141413] bg-transparent border border-[#141413] hover:bg-neutral-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
              >
                EXPLORE COLLECTION
              </button>
            </div>

            {/* Editorial micro-specs bar */}
            <div className="mt-12 pt-6 border-t border-[#EFEFEA] grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block text-[11px] font-mono-tag text-neutral-400 uppercase tracking-wider">CUT</span>
                <span className="text-xs font-semibold text-neutral-800 uppercase mt-0.5 block">Boxy & Dropped</span>
              </div>
              <div>
                <span className="block text-[11px] font-mono-tag text-neutral-400 uppercase tracking-wider">FABRIC</span>
                <span className="text-xs font-semibold text-neutral-800 uppercase mt-0.5 block">320–500 GSM</span>
              </div>
              <div>
                <span className="block text-[11px] font-mono-tag text-neutral-400 uppercase tracking-wider">EDITION</span>
                <span className="text-xs font-semibold text-neutral-800 uppercase mt-0.5 block">Unisex Rotation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Clothing Composition (NO PEOPLE, Garments are the hero) */}
          <div className="lg:col-span-7 relative">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/11] bg-[#F4F4F0] overflow-hidden group shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
              {/* Clean high-res clothing composition */}
              <img
                src="/images/hero_clothing_composition.jpg"
                alt="Floating editorial clothing composition featuring oversized jacket, graphic tee, and parachute pants"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Minimal floating garment detail tag */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/90 backdrop-blur-md px-3.5 py-2.5 border border-neutral-200/80 shadow-sm max-w-[260px]">
                <div className="flex items-center justify-between text-[10px] font-mono-tag text-neutral-500 uppercase tracking-wider mb-1">
                  <span>SERIES REF. 01</span>
                  <span className="text-[#1E40AF]">FLOATING FIT</span>
                </div>
                <div className="text-xs font-semibold text-neutral-900 uppercase">
                  HEAVYWEIGHT MULTI-GARMENT SYSTEM
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5">
                  100% Cotton & Weatherproof Nylon
                </div>
              </div>

              {/* Top right subtle indicator */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <span className="bg-[#141413] text-white text-[10px] font-mono-tag uppercase tracking-widest px-2.5 py-1">
                  GARMENT ARCHIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
