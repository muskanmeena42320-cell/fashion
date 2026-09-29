import React from 'react';
import { X, User, Package, Heart, MapPin, Clock } from 'lucide-react';
import { BrandConfig } from '../types';

interface InfoModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  title,
  content,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#FBFBF9] text-[#141413] shadow-2xl border border-neutral-300 p-6 sm:p-8 animate-in fade-in duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#EFEFEA] mb-4">
          <h3 className="font-display font-bold text-xl uppercase tracking-tight">
            {title}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-neutral-200 rounded-full">
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        <div className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
          {content}
        </div>

        <div className="mt-8 pt-4 border-t border-[#EFEFEA] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#141413] text-white text-xs font-mono-tag uppercase tracking-wider hover:bg-neutral-800"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: BrandConfig;
  wishlistCount: number;
  cartCount: number;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  brand,
  wishlistCount,
  cartCount,
  onOpenWishlist,
  onOpenCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#FBFBF9] text-[#141413] shadow-2xl border border-neutral-300 p-6 sm:p-8 animate-in fade-in duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#EFEFEA] mb-6">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-neutral-800" />
            <h3 className="font-display font-bold text-lg uppercase tracking-tight">
              MEMBER PROFILE
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-neutral-200 rounded-full">
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 border border-neutral-200">
            <div className="text-[10px] font-mono-tag text-neutral-400 uppercase">TIER STATUS</div>
            <div className="font-display font-bold text-base text-[#141413] uppercase mt-0.5">
              ARCHIVE VIP MEMBER
            </div>
            <div className="text-xs text-neutral-500 font-mono-tag mt-1">
              EARLY ACCESS TO ALL LIMITED DROPS
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono-tag">
            <button
              onClick={() => {
                onClose();
                onOpenCart();
              }}
              className="p-3 bg-white border border-neutral-200 hover:border-black text-left"
            >
              <span className="text-neutral-400 block uppercase">ACTIVE BAG</span>
              <span className="font-bold text-neutral-900 text-sm">{cartCount} ITEMS</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenWishlist();
              }}
              className="p-3 bg-white border border-neutral-200 hover:border-black text-left"
            >
              <span className="text-neutral-400 block uppercase">SAVED PIECES</span>
              <span className="font-bold text-neutral-900 text-sm">{wishlistCount} ITEMS</span>
            </button>
          </div>

          <div className="p-4 bg-[#F4F4F0] text-xs font-mono-tag text-neutral-600 space-y-1">
            <div className="text-neutral-800 font-semibold uppercase">STORE CONCIERGE</div>
            <div>{brand.storeName}</div>
            <div>{brand.storeAddress}</div>
            <div>SCHEDULE: {brand.storeHours}</div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#EFEFEA] flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#141413] text-white text-xs font-mono-tag uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            RETURN TO STORE
          </button>
        </div>
      </div>
    </div>
  );
};
