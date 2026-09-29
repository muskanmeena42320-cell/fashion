import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, User } from 'lucide-react';
import { BrandConfig } from '../types';

interface HeaderProps {
  brand: BrandConfig;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onNavigateSection: (sectionId: string, filterCategory?: string) => void;
  activeSection?: string;
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  brand,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onNavigateSection,
  onOpenAccount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, category?: string) => {
    onNavigateSection(sectionId, category);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-[#FBFBF9]/95 backdrop-blur-md border-[#E7E7E2] shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-3'
            : 'bg-[#FBFBF9] border-[#EFEFEA] py-4'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Left Brand Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900"
            >
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#141413] transition-colors group-hover:text-[#1E40AF]">
                {brand.brandName}
              </span>
            </button>
          </div>

          {/* Zone 2: Center Editorial Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide uppercase text-neutral-600">
            <button
              onClick={() => handleNavClick('catalog', 'all')}
              className="hover:text-black transition-colors relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-black hover:after:w-full after:transition-all after:duration-200"
            >
              SHOP
            </button>
            <button
              onClick={() => handleNavClick('new-arrivals')}
              className="hover:text-black transition-colors relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-black hover:after:w-full after:transition-all after:duration-200"
            >
              NEW ARRIVALS
            </button>
            <button
              onClick={() => handleNavClick('style-edit')}
              className="hover:text-black transition-colors relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-black hover:after:w-full after:transition-all after:duration-200"
            >
              COLLECTIONS
            </button>
            <button
              onClick={() => handleNavClick('current-rotation')}
              className="hover:text-black transition-colors relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-black hover:after:w-full after:transition-all after:duration-200"
            >
              BESTSELLERS
            </button>
            <button
              onClick={() => handleNavClick('limited-drop')}
              className="text-[#1E40AF] font-semibold hover:text-[#172554] transition-colors relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
            >
              SALE
            </button>
          </nav>

          {/* Zone 3: Right Utility Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenSearch}
              aria-label="Search clothing catalog"
              className="flex items-center gap-1.5 p-2 text-neutral-700 hover:text-black transition-colors rounded-full hover:bg-neutral-200/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900"
            >
              <Search className="w-[18px] h-[18px] stroke-[1.8]" />
              <span className="hidden md:inline text-xs uppercase tracking-wider font-mono-tag">SEARCH</span>
            </button>

            <button
              onClick={onOpenWishlist}
              aria-label="View saved wishlist"
              className="relative p-2 text-neutral-700 hover:text-black transition-colors rounded-full hover:bg-neutral-200/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900"
            >
              <Heart className="w-[18px] h-[18px] stroke-[1.8]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#141413] text-white text-[10px] font-mono-tag flex items-center justify-center rounded-full leading-none">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenAccount}
              aria-label="Account details"
              className="hidden sm:flex items-center gap-1 p-2 text-neutral-700 hover:text-black transition-colors rounded-full hover:bg-neutral-200/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900"
            >
              <User className="w-[18px] h-[18px] stroke-[1.8]" />
              <span className="text-xs uppercase tracking-wider font-mono-tag">ACCOUNT</span>
            </button>

            <button
              onClick={onOpenCart}
              aria-label="View shopping bag"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-white bg-[#141413] hover:bg-neutral-800 transition-colors rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>BAG</span>
              <span className="font-mono-tag font-semibold text-white/90">
                ({cartCount})
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 text-neutral-800 hover:text-black focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-30 bg-[#FBFBF9] lg:hidden flex flex-col justify-between p-6 border-t border-[#EFEFEA] animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-6 pt-4">
            <button
              onClick={() => handleNavClick('catalog', 'all')}
              className="text-left text-2xl font-display font-bold uppercase tracking-tight text-[#141413]"
            >
              SHOP ALL
            </button>
            <button
              onClick={() => handleNavClick('new-arrivals')}
              className="text-left text-2xl font-display font-bold uppercase tracking-tight text-[#141413]"
            >
              NEW ARRIVALS
            </button>
            <button
              onClick={() => handleNavClick('style-edit')}
              className="text-left text-2xl font-display font-bold uppercase tracking-tight text-[#141413]"
            >
              COLLECTIONS & STYLE EDIT
            </button>
            <button
              onClick={() => handleNavClick('current-rotation')}
              className="text-left text-2xl font-display font-bold uppercase tracking-tight text-[#141413]"
            >
              BESTSELLERS
            </button>
            <button
              onClick={() => handleNavClick('limited-drop')}
              className="text-left text-2xl font-display font-bold uppercase tracking-tight text-[#1E40AF]"
            >
              LIMITED DROP & ARCHIVE
            </button>
            <button
              onClick={() => handleNavClick('store-section')}
              className="text-left text-lg font-medium tracking-wide text-neutral-600 uppercase"
            >
              VISIT PHYSICAL STORE
            </button>
          </div>

          <div className="border-t border-[#E7E7E2] pt-6 flex flex-col gap-3 text-xs uppercase font-mono-tag text-neutral-500">
            <div>LOCATION: {brand.cityCountry}</div>
            <div>FLAGSHIP: {brand.storeAddress}</div>
            <div>HOURS: {brand.storeHours}</div>
          </div>
        </div>
      )}
    </>
  );
};
