import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Check, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color?: string, qty?: number) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  relatedProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  relatedProducts,
  onSelectProduct,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'details' | 'sizing' | 'shipping'>('details');

  const isWishlisted = wishlistIds.includes(product.id);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#FBFBF9] text-[#141413] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-neutral-300">
        {/* Sticky Modal Bar */}
        <div className="sticky top-0 z-20 bg-[#FBFBF9]/95 backdrop-blur-md px-6 py-3 border-b border-[#EFEFEA] flex items-center justify-between">
          <div className="text-xs font-mono-tag uppercase tracking-wider text-neutral-500">
            {product.categoryLabel} / REF. {product.id}
          </div>
          <button
            onClick={onClose}
            aria-label="Close product view"
            className="p-1.5 hover:bg-neutral-200 transition-colors rounded-full"
          >
            <X className="w-5 h-5 text-neutral-800" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Product Images Gallery (Strictly Clothing Only, NO PEOPLE) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="aspect-[4/5] bg-[#F4F4F0] overflow-hidden relative border border-neutral-200">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {product.badge && (
                  <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-mono-tag uppercase tracking-wider px-2.5 py-1">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Secondary Detail composition / fabric close-up shot */}
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-square bg-[#F4F4F0] overflow-hidden border border-neutral-200 relative">
                  <img
                    src={product.image}
                    alt={`${product.name} detail view`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-125 object-top"
                  />
                  <span className="absolute bottom-2 left-2 bg-white/90 text-[9px] font-mono-tag uppercase px-2 py-0.5">
                    FABRIC & HARDWARE
                  </span>
                </div>
                <div className="aspect-square bg-[#F4F4F0] overflow-hidden border border-neutral-200 relative">
                  <img
                    src={product.image}
                    alt={`${product.name} seam view`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-150 object-center"
                  />
                  <span className="absolute bottom-2 left-2 bg-white/90 text-[9px] font-mono-tag uppercase px-2 py-0.5">
                    STITCH REINFORCEMENT
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Purchase & Spec Module */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono-tag text-[#1E40AF] uppercase tracking-wider mb-1">
                  <span>CONTEMPORARY UNISEX</span>
                  <span>{product.weight || '320 GSM'}</span>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#141413]">
                  {product.name}
                </h1>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 mt-2 mb-4">
                  <span className="font-display text-2xl font-bold text-[#141413] font-mono-tag tabular-nums">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through font-mono-tag">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-xs text-rose-600 font-mono-tag uppercase">
                      SAVE ${(product.originalPrice - product.price)}
                    </span>
                  )}
                </div>

                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs font-mono-tag uppercase tracking-wider text-neutral-600 mb-2">
                      <span>COLORWAY:</span>
                      <span className="font-semibold text-neutral-900">{selectedColor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-7 h-7 rounded-full border-2 transition-transform ${
                            selectedColor === c.name
                              ? 'border-black scale-110'
                              : 'border-transparent hover:scale-105'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-mono-tag uppercase tracking-wider text-neutral-600 mb-2">
                    <span>SELECT SIZE:</span>
                    <button
                      onClick={() => setActiveTab('sizing')}
                      className="underline text-neutral-500 hover:text-black"
                    >
                      FIT GUIDE
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 text-xs font-mono-tag font-semibold uppercase tracking-wider transition-colors border ${
                          selectedSize === size
                            ? 'bg-[#141413] text-white border-[#141413]'
                            : 'bg-white text-neutral-800 border-neutral-200 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Buy Controls */}
                <div className="flex items-stretch gap-3 mb-6">
                  <div className="flex items-center border border-neutral-300 bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-neutral-600 hover:text-black font-mono-tag"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-mono-tag font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-neutral-600 hover:text-black font-mono-tag"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAdd}
                    className="flex-1 py-3.5 px-4 text-xs font-medium uppercase tracking-wider text-white bg-[#141413] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>ADD TO BAG · ${(product.price * quantity)}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product.id)}
                    aria-label="Wishlist toggle"
                    className={`p-3.5 border transition-colors ${
                      isWishlisted
                        ? 'border-rose-300 bg-rose-50 text-rose-600'
                        : 'border-neutral-300 bg-white text-neutral-700 hover:border-black'
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>

              {/* Informational Tabs */}
              <div className="border-t border-[#EFEFEA] pt-4">
                <div className="flex items-center gap-6 border-b border-[#EFEFEA] pb-2 text-xs font-mono-tag uppercase tracking-wider text-neutral-500">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-1 transition-colors ${
                      activeTab === 'details'
                        ? 'text-black border-b-2 border-black font-bold'
                        : 'hover:text-black'
                    }`}
                  >
                    GARMENT SPECS
                  </button>
                  <button
                    onClick={() => setActiveTab('sizing')}
                    className={`pb-1 transition-colors ${
                      activeTab === 'sizing'
                        ? 'text-black border-b-2 border-black font-bold'
                        : 'hover:text-black'
                    }`}
                  >
                    FIT & MEASUREMENT
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-1 transition-colors ${
                      activeTab === 'shipping'
                        ? 'text-black border-b-2 border-black font-bold'
                        : 'hover:text-black'
                    }`}
                  >
                    DELIVERY
                  </button>
                </div>

                <div className="pt-3 text-xs text-neutral-600 leading-relaxed min-h-[90px]">
                  {activeTab === 'details' && (
                    <ul className="space-y-1.5 list-disc list-inside">
                      <li>Silhouette: {product.silhouette}</li>
                      <li>Fabric: {product.fabric}</li>
                      {product.features?.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'sizing' && (
                    <div>
                      <p className="font-semibold text-neutral-800">{product.fit}</p>
                      <p className="mt-1 text-neutral-500">
                        Cut with exaggerated drop shoulder and boxy drape. Model measurements not applicable—garment is designed to fit fluidly unisex across frames.
                      </p>
                    </div>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="space-y-1">
                      <p className="flex items-center gap-1.5 text-neutral-800 font-semibold">
                        <Truck className="w-3.5 h-3.5 text-blue-600" />
                        Dispatches within 24 hours
                      </p>
                      <p className="text-neutral-500">
                        Worldwide expedited shipping. 30-day complimentary returns on all orders.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related / Complete the Look */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#EFEFEA]">
              <span className="text-xs font-mono-tag uppercase tracking-widest text-neutral-400 block mb-4">
                COMPLETE THE ROTATION
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedProducts.slice(0, 4).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProduct(rel)}
                    className="group cursor-pointer bg-white p-2 border border-neutral-200 hover:border-black transition-colors"
                  >
                    <div className="aspect-[3/4] bg-[#F4F4F0] overflow-hidden mb-2">
                      <img
                        src={rel.image}
                        alt={rel.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[10px] font-mono-tag text-neutral-400 uppercase block">
                      {rel.categoryLabel}
                    </span>
                    <span className="text-xs font-semibold text-neutral-900 block truncate">
                      {rel.name}
                    </span>
                    <span className="text-xs font-mono-tag text-neutral-700 tabular-nums">
                      ${rel.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
