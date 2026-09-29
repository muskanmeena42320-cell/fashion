import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory: (category: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'outerwear',
      title: 'OUTERWEAR',
      subtitle: 'Bombers, tactical shells, work jackets',
      itemsCount: '14 PIECES',
      image: '/images/product_utility_jacket.jpg',
      colSpan: 'lg:col-span-7',
      aspect: 'aspect-[16/10]',
    },
    {
      id: 'hoodies',
      title: 'HOODIES',
      subtitle: '500 GSM loopback French terry',
      itemsCount: '08 PIECES',
      image: '/images/product_graphic_hoodie.jpg',
      colSpan: 'lg:col-span-5',
      aspect: 'aspect-[4/3] lg:aspect-auto',
    },
    {
      id: 'bottoms',
      title: 'BOTTOMS',
      subtitle: 'Parachute pants, wide-leg cargos, baggy denim',
      itemsCount: '12 PIECES',
      image: '/images/hero_clothing_composition.jpg',
      colSpan: 'lg:col-span-4',
      aspect: 'aspect-[4/5]',
    },
    {
      id: 'tees',
      title: 'TEES',
      subtitle: 'Oversized combed jersey & cracked prints',
      itemsCount: '16 PIECES',
      image: '/images/hero_clothing_composition.jpg',
      colSpan: 'lg:col-span-4',
      aspect: 'aspect-[4/5]',
    },
    {
      id: 'shirts',
      title: 'SHIRTS',
      subtitle: 'Boxy camp collars & abstract overshirts',
      itemsCount: '06 PIECES',
      image: '/images/style_edit_outfit.jpg',
      colSpan: 'lg:col-span-4',
      aspect: 'aspect-[4/5]',
    },
  ];

  return (
    <section id="categories" className="w-full bg-[#FBFBF9] py-16 sm:py-20 border-b border-[#EFEFEA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#EFEFEA]">
          <div>
            <span className="text-xs font-mono-tag tracking-widest text-[#1E40AF] uppercase">
              INDEX 02 / CATEGORY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#141413] mt-1">
              SHOP THE COLLECTION
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="group flex items-center gap-1.5 text-xs font-mono-tag uppercase tracking-wider text-neutral-600 hover:text-black mt-3 sm:mt-0"
          >
            <span>VIEW COMPLETE CATALOG</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative overflow-hidden bg-[#F4F4F0] cursor-pointer ${cat.colSpan} ${cat.aspect} min-h-[260px]`}
            >
              <img
                src={cat.image}
                alt={cat.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient scrim ensuring 4.5:1 text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity" />

              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between text-[11px] font-mono-tag tracking-wider text-neutral-300 uppercase mb-1">
                  <span>{cat.itemsCount}</span>
                  <span className="text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    EXPLORE <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 max-w-sm">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Accessories Banner Link */}
        <div
          onClick={() => onSelectCategory('accessories')}
          className="mt-6 p-6 sm:p-8 bg-[#141413] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900 transition-colors"
        >
          <div>
            <span className="text-[11px] font-mono-tag text-[#93C5FD] uppercase tracking-wider">
              ACCESSORIES & HARDWARE
            </span>
            <h4 className="font-display text-xl sm:text-2xl font-bold uppercase mt-1">
              CAPS, BEANIES, CROSSBODY BAGS & UTILITY RIGS
            </h4>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono-tag uppercase tracking-wider text-neutral-300">
            <span>SHOP ACCESSORIES</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};
