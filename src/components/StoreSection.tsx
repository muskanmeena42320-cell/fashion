import React, { useState } from 'react';
import { ArrowRight, MapPin, Clock, Check } from 'lucide-react';
import { BrandConfig } from '../types';

interface StoreSectionProps {
  brand: BrandConfig;
}

export const StoreSection: React.FC<StoreSectionProps> = ({ brand }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(`${brand.storeName}, ${brand.storeAddress}, ${brand.cityCountry}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="store-section" className="w-full bg-[#FBFBF9] py-16 sm:py-24 border-b border-[#EFEFEA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Flagship Interior Photography (NO PEOPLE) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] bg-[#F4F4F0] overflow-hidden shadow-sm">
              <img
                src="/images/store_interior_minimalist.jpg"
                alt="Minimalist luxury flagship store interior"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />

              <div className="absolute top-4 left-4 bg-white/95 px-3 py-1.5 text-[10px] font-mono-tag uppercase tracking-wider text-neutral-800">
                FLAGSHIP SPACE / {brand.cityCountry}
              </div>

              <div className="absolute bottom-4 right-4 bg-neutral-900/90 text-white px-3 py-1.5 text-[10px] font-mono-tag uppercase tracking-widest">
                IN-STORE TRY-ON & ARCHIVE RACKS
              </div>
            </div>
          </div>

          {/* Right Column: Store Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-mono-tag tracking-widest text-[#1E40AF] uppercase mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>PHYSICAL EXPERIENCE</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] mb-6">
              VISIT THE STORE
            </h2>

            <div className="space-y-4 border-t border-[#EFEFEA] pt-6 mb-8 text-neutral-800">
              <div>
                <span className="text-[11px] font-mono-tag uppercase text-neutral-400 block tracking-wider">
                  LOCATION
                </span>
                <span className="font-display text-lg font-bold uppercase mt-0.5 block">
                  {brand.storeName}
                </span>
                <span className="text-sm text-neutral-600 block mt-0.5">
                  {brand.storeAddress}
                </span>
                <span className="text-xs font-mono-tag text-neutral-500 uppercase mt-0.5 block">
                  {brand.cityCountry}
                </span>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-mono-tag uppercase text-neutral-400 block tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-neutral-500" />
                  OPERATING SCHEDULE
                </span>
                <span className="text-sm font-semibold text-neutral-800 uppercase mt-0.5 block">
                  OPEN DAILY
                </span>
                <span className="text-xs font-mono-tag text-neutral-600 mt-0.5 block">
                  {brand.storeHours}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs uppercase font-medium tracking-wider text-white bg-[#141413] hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ADDRESS COPIED</span>
                  </>
                ) : (
                  <>
                    <span>GET DIRECTIONS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <span className="text-xs text-neutral-500 font-mono-tag uppercase">
                WALK-INS WELCOME
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
