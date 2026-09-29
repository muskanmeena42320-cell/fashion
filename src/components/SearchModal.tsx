import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.silhouette.toLowerCase().includes(q)
        );
      })
    : [];

  const popularTags = [
    'Parachute Pant',
    'Utility Jacket',
    '500 GSM Hoodie',
    'Archive Tee',
    'Tactical Bag',
    'Camp Overshirt',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 md:p-10 flex items-start justify-center animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#FBFBF9] text-[#141413] shadow-2xl border border-neutral-300 mt-12 sm:mt-16 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EFEFEA] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-neutral-500" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search silhouettes, fabrics, cuts, categories..."
            className="flex-1 bg-transparent text-sm sm:text-base font-medium placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-neutral-400 hover:text-black">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono-tag uppercase text-neutral-400 hover:text-black px-2 py-1 bg-neutral-100 hover:bg-neutral-200 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <span className="text-xs font-mono-tag uppercase tracking-wider text-neutral-400 block mb-3">
                TRENDING SEARCHES:
              </span>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-[#F4F4F0] hover:bg-neutral-200 text-xs font-mono-tag uppercase text-neutral-700 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <span className="text-xs font-mono-tag uppercase text-neutral-400 block">
                NO SILHOUETTES FOUND FOR "{query}"
              </span>
              <p className="text-xs text-neutral-500 mt-1">
                Try searching for "Jacket", "Hoodie", "Pant", or "Tee".
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-[11px] font-mono-tag text-neutral-400 uppercase tracking-widest pb-1 border-b border-[#EFEFEA]">
                MATCHING PIECES ({filteredProducts.length})
              </div>
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(p);
                  }}
                  className="group flex items-center justify-between p-2.5 bg-white hover:bg-[#F4F4F0] border border-neutral-200 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 bg-neutral-100 overflow-hidden shrink-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono-tag text-neutral-400 uppercase block">
                        {p.categoryLabel}
                      </span>
                      <span className="text-xs font-semibold text-neutral-900 group-hover:text-[#1E40AF] block">
                        {p.name}
                      </span>
                      <span className="text-[11px] text-neutral-500 line-clamp-1">
                        {p.silhouette}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono-tag font-semibold text-neutral-900 tabular-nums">
                      ${p.price}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
