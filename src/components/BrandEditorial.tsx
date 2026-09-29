import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BrandConfig } from '../types';

interface BrandEditorialProps {
  brand: BrandConfig;
  onExploreArchive: () => void;
}

export const BrandEditorial: React.FC<BrandEditorialProps> = ({
  brand,
  onExploreArchive,
}) => {
  return (
    <section className="w-full bg-[#F5F5F0] py-20 sm:py-28 border-b border-[#EFEFEA] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Controlled Large Fashion Typography & Manifesto */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-mono-tag tracking-widest text-[#1E40AF] uppercase mb-4">
              EDITORIAL ESSAY / 01
            </span>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#141413] leading-[1.08] mb-6">
              DRESS DIFFERENT.<br />
              <span className="text-neutral-500">KEEP IT YOURS.</span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-xl mb-6">
              Designed around contemporary silhouettes, expressive graphics, and everyday versatility. We treat streetwear not as disposable novelty, but as a deliberate architectural form crafted from heavyweight fabrics, raw hems, and functional utility.
            </p>

            <div className="space-y-3 text-sm text-neutral-600 mb-8 border-l-2 border-[#1E40AF] pl-4">
              <p>
                Every garment is cut oversized by intention—tested for natural shoulder drop, fluid movement, and unforced layering.
              </p>
              <div className="text-xs font-mono-tag text-neutral-400 uppercase pt-1">
                — {brand.brandName} DESIGN ATELIER / {brand.cityCountry}
              </div>
            </div>

            <div>
              <button
                onClick={onExploreArchive}
                className="inline-flex items-center gap-2 text-xs font-mono-tag uppercase tracking-widest text-[#141413] hover:text-[#1E40AF] transition-colors border-b border-[#141413] hover:border-[#1E40AF] pb-1"
              >
                <span>EXPLORE BRAND ARCHIVE & PHILOSOPHY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Large Artistic Clothing Composition (NO PEOPLE) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-[#ECECE6] overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.06)]">
              <img
                src="/images/style_edit_outfit.jpg"
                alt="Artistic garment flat-lay composition on limestone floor"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-mono-tag uppercase tracking-wider text-neutral-800">
                PROPORTION / VOLUME / DRAPE
              </div>

              <div className="absolute bottom-4 right-4 bg-neutral-900 text-white px-3 py-1.5 text-[10px] font-mono-tag uppercase tracking-widest">
                CLOTHING ARCHITECTURE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
