import React from 'react';
import { ArrowRight, Instagram, ExternalLink } from 'lucide-react';
import { BrandConfig } from '../types';

interface SocialFeedProps {
  brand: BrandConfig;
}

export const SocialFeed: React.FC<SocialFeedProps> = ({ brand }) => {
  // 6 editorial shots: Garment details, flat-lays, store interior, packaging, textures. ZERO PEOPLE.
  const feedItems = [
    {
      id: 'feed-1',
      title: 'HEAVYWEIGHT FABRIC DRAPE',
      tag: '#ARCHIVE_SERIES',
      image: '/images/hero_clothing_composition.jpg',
    },
    {
      id: 'feed-2',
      title: 'TACTICAL STORM POCKET DETAIL',
      tag: '#HARDWARE',
      image: '/images/product_utility_jacket.jpg',
    },
    {
      id: 'feed-3',
      title: '500 GSM LOOPBACK WAFFLE',
      tag: '#HEAVYWEIGHT',
      image: '/images/product_graphic_hoodie.jpg',
    },
    {
      id: 'feed-4',
      title: 'DAILY ROTATION FLAT-LAY',
      tag: '#STYLE_EDIT',
      image: '/images/style_edit_outfit.jpg',
    },
    {
      id: 'feed-5',
      title: 'FLAGSHIP ARCHITECTURAL SPACE',
      tag: '#ATELIER',
      image: '/images/store_interior_minimalist.jpg',
    },
    {
      id: 'feed-6',
      title: 'SEAMLESS DROPPED SHOULDERS',
      tag: '#GARMENT_CUT',
      image: '/images/hero_clothing_composition.jpg',
    },
  ];

  return (
    <section className="w-full bg-[#FBFBF9] py-16 sm:py-24 border-b border-[#EFEFEA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#EFEFEA]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tag tracking-widest text-[#1E40AF] uppercase mb-1">
              <Instagram className="w-3.5 h-3.5" />
              <span>DIGITAL GALLERY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#141413]">
              SEEN ON THE FEED
            </h2>
            <p className="text-sm font-mono-tag text-neutral-500 mt-1">
              @{brand.instagramHandle}
            </p>
          </div>

          <a
            href={`#instagram`}
            onClick={(e) => e.preventDefault()}
            className="group flex items-center gap-2 text-xs font-mono-tag uppercase tracking-wider text-[#141413] hover:text-[#1E40AF] mt-4 sm:mt-0"
          >
            <span>FOLLOW THE BRAND</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 6-Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {feedItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square bg-[#F4F4F0] overflow-hidden cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-white">
                <div className="flex justify-end">
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-300" />
                </div>
                <div>
                  <span className="text-[9px] font-mono-tag text-[#93C5FD] block uppercase">
                    {item.tag}
                  </span>
                  <span className="text-[11px] font-semibold uppercase leading-tight line-clamp-2 mt-0.5 block">
                    {item.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
