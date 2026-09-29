import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';

interface CurrentRotationProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const CurrentRotation: React.FC<CurrentRotationProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  const trendingPieces = products.filter((p) => p.isTrending).slice(0, 4);
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleQuickAdd = (product: Product, size: string) => {
    onAddToCart(product, size);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1400);
  };

  return (
    <section id="current-rotation" className="w-full bg-[#FBFBF9] py-16 sm:py-20 border-b border-[#EFEFEA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#EFEFEA]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tag tracking-widest text-[#1E40AF] uppercase mb-1">
              <span>HIGH DEMAND</span>
              <span className="text-neutral-400">·</span>
              <span>DAILY WEAR</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#141413]">
              THE CURRENT ROTATION
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Most saved and styled pieces curated by our community.
            </p>
          </div>

          <span className="text-xs font-mono-tag text-neutral-400 uppercase mt-2 sm:mt-0">
            [ 04 ESSENTIAL CUTS ]
          </span>
        </div>

        {/* 4 Standout Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingPieces.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isJustAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white border border-[#EFEFEA] p-3 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1"
              >
                {/* Visual Area */}
                <div
                  className="relative w-full aspect-[3/4] bg-[#F4F4F0] overflow-hidden cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Wishlist toggle */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all ${
                      isWishlisted
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-white/90 text-neutral-700 hover:text-black hover:bg-white'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5" fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-black text-white text-[9px] font-mono-tag tracking-wider uppercase px-2 py-0.5">
                      {product.badge}
                    </span>
                  )}

                  {/* Quick View Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="absolute bottom-2.5 right-2.5 p-2 bg-white/95 text-neutral-900 hover:bg-black hover:text-white transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="mt-3 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono-tag text-neutral-500 uppercase">
                      <span>{product.categoryLabel}</span>
                      <span className="font-semibold text-neutral-900 tabular-nums">${product.price}</span>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-display text-sm font-semibold text-[#141413] mt-1 cursor-pointer hover:text-[#1E40AF] transition-colors"
                    >
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                      {product.fabric}
                    </p>
                  </div>

                  {/* Size buttons / Add feedback */}
                  <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between gap-1.5">
                    {isJustAdded ? (
                      <div className="w-full py-1.5 bg-neutral-900 text-white text-[11px] font-mono-tag uppercase flex items-center justify-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        <span>ADDED TO BAG</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-1">
                          {product.sizes.map((sz) => (
                            <button
                              key={sz}
                              onClick={() => handleQuickAdd(product, sz)}
                              className="w-7 h-7 flex items-center justify-center border border-neutral-200 text-[10px] font-mono-tag font-semibold text-neutral-800 hover:border-black hover:bg-neutral-900 hover:text-white transition-colors"
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => handleQuickAdd(product, product.sizes[0])}
                          className="p-1.5 text-neutral-700 hover:text-black transition-colors"
                          title="Quick add default size"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
