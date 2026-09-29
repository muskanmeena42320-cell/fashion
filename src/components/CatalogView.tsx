import React, { useState, useMemo } from 'react';
import { Heart, SlidersHorizontal, ArrowUpRight, Check, X } from 'lucide-react';
import { Product } from '../types';

interface CatalogViewProps {
  products: Product[];
  initialCategory?: string;
  onClose: () => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  initialCategory = 'all',
  onClose,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'ALL PRODUCTS' },
    { id: 'tees', label: 'TEES' },
    { id: 'shirts', label: 'SHIRTS' },
    { id: 'outerwear', label: 'OUTERWEAR' },
    { id: 'bottoms', label: 'BOTTOMS' },
    { id: 'hoodies', label: 'HOODIES' },
    { id: 'accessories', label: 'ACCESSORIES' },
  ];

  const filteredAndSorted = useMemo(() => {
    let result = products.filter((p) => {
      if (selectedCategory === 'all') return true;
      return p.category === selectedCategory;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result = [...result].sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }
    return result;
  }, [products, selectedCategory, sortBy]);

  const handleQuickAdd = (product: Product, size: string) => {
    onAddToCart(product, size);
    setQuickAddedId(product.id);
    setTimeout(() => setQuickAddedId(null), 1200);
  };

  return (
    <div className="w-full bg-[#FBFBF9] min-h-screen py-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with back and title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#EFEFEA]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tag text-[#1E40AF] uppercase tracking-wider mb-2">
              <span>CATALOG DIRECTORY</span>
              <span className="text-neutral-400">/</span>
              <span>{filteredAndSorted.length} GARMENTS AVAILABLE</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#141413]">
              COLLECTION ARCHIVE
            </h1>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs font-mono-tag uppercase">
              <span className="text-neutral-400">SORT BY:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-neutral-300 px-3 py-1.5 text-neutral-800 text-xs font-mono-tag uppercase focus:outline-none focus:border-black"
              >
                <option value="featured">CURATED / FEATURED</option>
                <option value="newest">NEW RELEASES FIRST</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
              </select>
            </div>

            <button
              onClick={onClose}
              className="p-2 border border-neutral-300 hover:bg-neutral-200 transition-colors"
              title="Return to Main Page"
            >
              <X className="w-4 h-4 text-neutral-800" />
            </button>
          </div>
        </div>

        {/* Filter Tabs (Interactive buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-mono-tag uppercase tracking-wider transition-colors whitespace-nowrap border ${
                selectedCategory === cat.id
                  ? 'bg-[#141413] text-white border-[#141413]'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-black hover:text-black'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {filteredAndSorted.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isAdded = quickAddedId === product.id;

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white border border-[#EFEFEA] p-4 transition-all duration-300 hover:shadow-lg"
              >
                <div
                  className="relative aspect-[3/4] bg-[#F4F4F0] overflow-hidden cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-mono-tag uppercase px-2 py-0.5">
                      {product.badge}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                      isWishlisted
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-white/90 text-neutral-700 hover:text-black hover:bg-white'
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div className="mt-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-tag text-neutral-500 uppercase">
                      <span>{product.categoryLabel}</span>
                      <span className="font-semibold text-neutral-900 tabular-nums">
                        ${product.price}
                      </span>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-display text-sm font-semibold text-[#141413] mt-1 cursor-pointer hover:text-[#1E40AF] transition-colors flex items-center justify-between"
                    >
                      <span>{product.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#1E40AF]" />
                    </h3>

                    <p className="text-xs text-neutral-500 line-clamp-1 mt-1">
                      {product.silhouette}
                    </p>
                  </div>

                  {/* Size buttons */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    {isAdded ? (
                      <span className="text-[11px] font-mono-tag text-emerald-600 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> ADDED TO BAG
                      </span>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono-tag text-neutral-400 uppercase mr-1">
                          SIZES:
                        </span>
                        {product.sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={() => handleQuickAdd(product, sz)}
                            className="px-2 py-1 text-[10px] font-mono-tag font-semibold border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-colors"
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
