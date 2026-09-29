import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBFBF9] text-[#141413] shadow-2xl flex flex-col border-l border-neutral-300 animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#EFEFEA] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
              <span className="font-display font-bold uppercase text-sm tracking-wide">
                SAVED PIECES ({wishlistProducts.length})
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close wishlist"
              className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-neutral-700" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#EFEFEA]">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <Heart className="w-10 h-10 stroke-[1.2] text-neutral-300 mb-3" />
                <span className="font-display text-base font-bold uppercase text-neutral-800">
                  NO SAVED ITEMS
                </span>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                  Tap the heart icon on any garment to save items to your personal wishlist.
                </p>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div key={product.id} className="py-4 flex gap-4 items-center">
                  <div
                    onClick={() => {
                      onClose();
                      onSelectProduct(product);
                    }}
                    className="w-16 h-20 bg-[#F4F4F0] shrink-0 overflow-hidden cursor-pointer border border-neutral-200"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono-tag text-neutral-400 uppercase">
                      {product.categoryLabel}
                    </span>
                    <h4
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="text-xs font-semibold text-neutral-900 truncate cursor-pointer hover:text-[#1E40AF]"
                    >
                      {product.name}
                    </h4>
                    <span className="text-xs font-mono-tag text-neutral-800 font-semibold tabular-nums mt-0.5 block">
                      ${product.price}
                    </span>

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => onAddToCart(product, product.sizes[0])}
                        className="text-[11px] font-mono-tag text-black font-semibold uppercase underline hover:text-[#1E40AF]"
                      >
                        ADD TO BAG
                      </button>
                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="text-[11px] font-mono-tag text-neutral-400 uppercase hover:text-rose-600"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
