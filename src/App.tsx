/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { NewArrivals } from './components/NewArrivals';
import { CategorySection } from './components/CategorySection';
import { CurrentRotation } from './components/CurrentRotation';
import { BrandEditorial } from './components/BrandEditorial';
import { StyleEdit } from './components/StyleEdit';
import { LimitedDrop } from './components/LimitedDrop';
import { BrandStatement } from './components/BrandStatement';
import { StoreSection } from './components/StoreSection';
import { SocialFeed } from './components/SocialFeed';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CatalogView } from './components/CatalogView';
import { InfoModal, AccountModal } from './components/InfoModal';

import { defaultBrandConfig } from './data/brandDefaults';
import { products, styleEditLooks } from './data/products';
import { Product, CartItem, BrandConfig } from './types';

export default function App() {
  // Brand Configuration state (defaulting to placeholder requirements)
  const [brand, setBrand] = useState<BrandConfig>(() => {
    const saved = localStorage.getItem('streetwear_brand_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultBrandConfig;
      }
    }
    return defaultBrandConfig;
  });

  const handleUpdateBrand = (newConfig: BrandConfig) => {
    setBrand(newConfig);
    localStorage.setItem('streetwear_brand_config', JSON.stringify(newConfig));
  };

  // E-Commerce States
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('streetwear_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    // Seed with 1 initial stylish item to showcase bag counter
    return [
      {
        product: products[0],
        selectedSize: 'L',
        selectedColor: 'Washed Olive',
        quantity: 1,
      },
    ];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('streetwear_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return ['prod-utility-jacket', 'prod-archive-tee'];
  });

  // UI Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [infoModalData, setInfoModalData] = useState<{ title: string; content: string } | null>(null);

  // Dedicated Catalog View Mode
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [catalogInitialCategory, setCatalogInitialCategory] = useState<string>('all');

  // Persistence
  useEffect(() => {
    localStorage.setItem('streetwear_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('streetwear_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Cart operations
  const handleAddToCart = (product: Product, size?: string, color?: string, qty = 1) => {
    const chosenSize = size || product.sizes[0] || 'M';
    const chosenColor = color || (product.colors?.[0]?.name) || 'Standard';

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === chosenSize
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += qty;
        return copy;
      }
      return [...prev, { product, selectedSize: chosenSize, selectedColor: chosenColor, quantity: qty }];
    });
  };

  const handleAddLookToCart = (lookProducts: Product[]) => {
    lookProducts.forEach((p) => {
      handleAddToCart(p, p.sizes[0]);
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.selectedSize === size))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Navigation handlers
  const handleNavigateSection = (sectionId: string, filterCategory?: string) => {
    if (sectionId === 'catalog') {
      setCatalogInitialCategory(filterCategory || 'all');
      setCatalogOpen(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCatalogOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSelectCategory = (category: string) => {
    setCatalogInitialCategory(category);
    setCatalogOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));
  const limitedGarment = products.find((p) => p.isLimitedDrop) || products[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#141413]">
      {/* 07 — HEADER */}
      <Header
        brand={brand}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateSection={handleNavigateSection}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      {/* Main Body: Either Full Catalog Directory OR Homepage Editorial Flow */}
      <main className="flex-1">
        {catalogOpen ? (
          <CatalogView
            products={products}
            initialCategory={catalogInitialCategory}
            onClose={() => setCatalogOpen(false)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        ) : (
          <>
            {/* 08 — HERO SECTION */}
            <HeroSection
              brand={brand}
              onShopNewArrivals={() => handleNavigateSection('new-arrivals')}
              onExploreCollection={() => handleNavigateSection('catalog', 'all')}
            />

            {/* 09 — NEW ARRIVALS */}
            <NewArrivals
              products={products}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />

            {/* 11 — SHOP BY CATEGORY */}
            <CategorySection onSelectCategory={handleSelectCategory} />

            {/* 12 — TRENDING PIECES (THE CURRENT ROTATION) */}
            <CurrentRotation
              products={products}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />

            {/* 13 — EDITORIAL BRAND SECTION */}
            <BrandEditorial
              brand={brand}
              onExploreArchive={() => handleNavigateSection('catalog', 'all')}
            />

            {/* 14 — THE STYLE EDIT */}
            <StyleEdit
              looks={styleEditLooks}
              allProducts={products}
              onAddLookToCart={handleAddLookToCart}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />

            {/* 15 — LIMITED DROP */}
            <LimitedDrop
              limitedProduct={limitedGarment}
              onShopDrop={() => handleNavigateSection('catalog', 'all')}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />

            {/* 16 — BRAND STATEMENT */}
            <BrandStatement />

            {/* 17 — STORE EXPERIENCE */}
            <StoreSection brand={brand} />

            {/* 18 — SOCIAL / INSTAGRAM */}
            <SocialFeed brand={brand} />
          </>
        )}
      </main>

      {/* 19 — FOOTER */}
      <Footer
        brand={brand}
        onNavigateSection={handleNavigateSection}
        onOpenInfoModal={(title, content) => setInfoModalData({ title, content })}
      />

      {/* Product Detail Modal (PDP) */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          relatedProducts={products.filter((p) => p.id !== selectedProduct.id)}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onExploreShop={() => handleNavigateSection('catalog', 'all')}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Account Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brand={brand}
        wishlistCount={wishlistIds.length}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Info Modal */}
      {infoModalData && (
        <InfoModal
          isOpen={true}
          title={infoModalData.title}
          content={infoModalData.content}
          onClose={() => setInfoModalData(null)}
        />
      )}
    </div>
  );
}
