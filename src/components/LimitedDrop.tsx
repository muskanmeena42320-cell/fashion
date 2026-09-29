import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { Product } from '../types';

interface LimitedDropProps {
  onShopDrop: () => void;
  onSelectProduct: (product: Product) => void;
  limitedProduct?: Product;
}

export const LimitedDrop: React.FC<LimitedDropProps> = ({
  onShopDrop,
  onSelectProduct,
  limitedProduct,
}) => {
  return (
    <section id="limited-drop" className="w-full bg-[#141413] text-white py-16 sm:py-24 border-b border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Visual Focus (Standout garment, no people) */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div
              className="relative aspect-[4/3] sm:aspect-[16/11] bg-neutral-900 overflow-hidden cursor-pointer group border border-neutral-800"
              onClick={() => limitedProduct && onSelectProduct(limitedProduct)}
            >
              <img
                src={limitedProduct?.image || '/images/product_utility_jacket.jpg'}
                alt="Limited Drop Spotlight Garment"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute top-4 left-4 bg-white text-black px-2.5 py-1 text-[10px] font-mono-tag font-bold uppercase tracking-widest">
                ARCHIVE RUN / 120 UNITS
              </div>

              <div className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-md px-3 py-1.5 text-xs font-mono-tag text-neutral-300">
                SERIES 01 SPOTLIGHT
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Urgency */}
          <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2 lg:pl-6">
            <div className="flex items-center gap-2 text-xs font-mono-tag tracking-widest text-[#93C5FD] uppercase mb-3">
              <Flame className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>LIMITED / 01</span>
              <span className="text-neutral-500">·</span>
              <span>NO RESTOCKS SCHEDULED</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5 leading-tight">
              NOT HERE FOR LONG.
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 max-w-lg">
              Explore the latest limited pieces before they're gone. Individually numbered garments constructed from archive deadstock wool and custom hardware accents.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={onShopDrop}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs uppercase font-medium tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>SHOP THE DROP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {limitedProduct && (
                <button
                  onClick={() => onSelectProduct(limitedProduct)}
                  className="text-xs uppercase font-mono-tag tracking-wider text-neutral-400 hover:text-white transition-colors underline underline-offset-4"
                >
                  VIEW GARMENT SPECS →
                </button>
              )}
            </div>

            {/* Micro Counter / Details */}
            <div className="mt-10 pt-6 border-t border-neutral-800 grid grid-cols-3 gap-4 text-xs font-mono-tag text-neutral-400">
              <div>
                <span className="text-[10px] uppercase text-neutral-500 block">PRODUCTION</span>
                <span className="text-white font-semibold mt-0.5 block">120 PIECES</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-neutral-500 block">STATUS</span>
                <span className="text-amber-400 font-semibold mt-0.5 block">78% ALLOCATED</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-neutral-500 block">DISPATCH</span>
                <span className="text-white font-semibold mt-0.5 block">24H PRIORITY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
