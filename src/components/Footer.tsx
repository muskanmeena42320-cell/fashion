import React from 'react';
import { ArrowUp } from 'lucide-react';
import { BrandConfig } from '../types';

interface FooterProps {
  brand: BrandConfig;
  onNavigateSection: (sectionId: string, category?: string) => void;
  onOpenInfoModal: (title: string, content: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  brand,
  onNavigateSection,
  onOpenInfoModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#141413] text-white pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-neutral-800">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="font-display text-xl font-bold tracking-tight uppercase block">
                {brand.brandName}
              </span>
              <p className="text-sm text-neutral-400 mt-2 max-w-sm">
                Contemporary streetwear for the new generation. Engineered silhouettes, heavy fabric weights, and everyday individuality.
              </p>
            </div>

            <div className="mt-8">
              <span className="text-xs font-mono-tag uppercase tracking-wider text-neutral-400 block mb-2">
                JOIN THE ARCHIVE (PRIVATE DROPS)
              </span>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing to private archive drops.');
                }}
                className="flex items-stretch max-w-sm"
              >
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="bg-neutral-900 border border-neutral-700 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white flex-1"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-black px-4 text-xs font-mono-tag uppercase font-semibold hover:bg-neutral-200 transition-colors"
                >
                  JOIN
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono-tag uppercase tracking-widest text-neutral-400 mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <button
                  onClick={() => onNavigateSection('new-arrivals')}
                  className="hover:text-white transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('catalog', 'tees')}
                  className="hover:text-white transition-colors"
                >
                  Tees
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('catalog', 'shirts')}
                  className="hover:text-white transition-colors"
                >
                  Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('catalog', 'outerwear')}
                  className="hover:text-white transition-colors"
                >
                  Outerwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('catalog', 'bottoms')}
                  className="hover:text-white transition-colors"
                >
                  Bottoms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('catalog', 'accessories')}
                  className="hover:text-white transition-colors"
                >
                  Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: INFORMATION */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono-tag uppercase tracking-widest text-neutral-400 mb-4">
              INFORMATION
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <button
                  onClick={() => onOpenInfoModal('About The Atelier', 'Founded with a focus on oversized cuts, garment wash experimentation, and architectural silhouettes. All garments are designed unisex.')}
                  className="hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInfoModal('Contact & Support', 'Inquiries: contact@brand.com\nWholesale: studio@brand.com\nPhone: +1 (555) 019-2831')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInfoModal('Shipping Policy', 'Worldwide express delivery via DHL. Domestic orders deliver within 2-4 business days. Free shipping on orders over $150.')}
                  className="hover:text-white transition-colors"
                >
                  Shipping
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInfoModal('Returns & Exchanges', 'Complimentary 30-day return window on all unworn items with original security tags attached.')}
                  className="hover:text-white transition-colors"
                >
                  Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInfoModal('Frequently Asked Questions', 'Q: How do sizes run?\nA: All tops and outerwear are cut boxy and oversized. If you prefer a tailored fit, we recommend sizing down.\n\nQ: Are garments pre-shrunk?\nA: Yes, all garments undergo enzyme and vintage wash processing.')}
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: VISIT */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono-tag uppercase tracking-widest text-neutral-400 mb-4">
              VISIT
            </h4>
            <div className="text-sm text-neutral-300 space-y-2">
              <p className="font-semibold text-white uppercase">{brand.storeName}</p>
              <p className="text-xs text-neutral-400">{brand.storeAddress}</p>
              <p className="text-xs font-mono-tag text-neutral-400 pt-1">{brand.storeHours}</p>
              <p className="text-xs font-mono-tag text-[#93C5FD] pt-1">{brand.cityCountry}</p>
            </div>
          </div>

          {/* Column 5: SOCIAL */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono-tag uppercase tracking-widest text-neutral-400 mb-4">
              SOCIAL
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <a
                  href="#instagram"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Instagram</span>
                  <span className="text-[10px] font-mono-tag text-neutral-500">@{brand.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a
                  href="#tiktok"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>TikTok</span>
                  <span className="text-[10px] font-mono-tag text-neutral-500">@{brand.instagramHandle}</span>
                </a>
              </li>
              <li className="pt-4">
                <button
                  onClick={scrollToTop}
                  className="flex items-center gap-1.5 text-xs font-mono-tag uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
                >
                  <span>BACK TO TOP</span>
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tag text-neutral-500">
          <div>
            © 2026 {brand.brandName}. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>UNISEX CONTEMPORARY STREETWEAR</span>
            <span>·</span>
            <span>PRIVACY & COOKIES</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
