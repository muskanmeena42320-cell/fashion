import React from 'react';
import { Heart, Plus, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';

interface NewArrivalsProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  // Take 6 products
  const arrivalItems = products.slice(0, 6);

  return (
    <section id="new-arrivals" className="w-full bg-[#FBFBF9] py-16 sm:py-20 border-b border-[#EFEFEA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#EFEFEA]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tag tracking-widest text-[#1E40AF] uppercase mb-2">
              <span>EDITION 2026</span>
              <span className="text-neutral-400">/</span>
              <span>VOLUME 01</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#141413]">
              NEW ARRIVALS
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 max-w-lg">
              Fresh pieces. Contemporary silhouettes. Made for your rotation.
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-xs font-mono-tag text-neutral-500 uppercase">
            <span>[ 06 SELECTED GARMENTS ]</span>
          </div>
        </div>

        {/* 6 Products Grid with Editorial Rhythm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {arrivalItems.map((product, index) => {
            const isWishlisted = wishlistIds.includes(product.id);
            // Alternate subtle card composition heights/styles for an editorial look
            const aspectStyle = index === 0 || index === 4 ? 'aspect-[3/4]' : 'aspect-[4/5]';

            return (
              <div
                key={product.id}
                className="group flex flex-col cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                {/* Product Image Frame */}
                <div className={`relative w-full ${aspectStyle} bg-[#F4F4F0] overflow-hidden transition-all duration-300`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {product.badge && (
                      <span className="bg-white/95 backdrop-blur-sm text-[#141413] text-[10px] font-mono-tag uppercase tracking-wider px-2 py-0.5 border border-neutral-200">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    aria-label={`Save ${product.name} to wishlist`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all z-10 ${
                      isWishlisted
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-white/90 text-neutral-700 hover:text-black hover:bg-white'
                    } shadow-sm`}
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={isWishlisted ? 'currentColor' : 'none'}
                    />
                  </button>

                  {/* Quick Add Overlay on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-200 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono-tag text-white/90 uppercase tracking-wider pl-1">
                      QUICK ADD SIZES:
                    </span>
                    <div className="flex items-center gap-1.5">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product, size);
                          }}
                          className="px-2 py-1 bg-white/95 hover:bg-white text-[11px] font-mono-tag font-semibold text-[#141413] rounded-none hover:scale-105 transition-transform"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Product Meta */}
                <div className="mt-3.5 flex flex-col">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] font-mono-tag text-neutral-500 uppercase tracking-wider">
                      {product.categoryLabel} · {product.weight || 'COTTON'}
                    </span>
                    <div className="flex items-center gap-2">
                      {product.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through font-mono-tag">
                          ${product.originalPrice}
                        </span>
                      )}
                      <span className="text-sm font-semibold text-[#141413] font-mono-tag tabular-nums">
                        ${product.price}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-sm font-semibold text-[#141413] mt-1 group-hover:text-[#1E40AF] transition-colors flex items-center justify-between">
                    <span>{product.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#1E40AF]" />
                  </h3>

                  <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
                    {product.silhouette}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
