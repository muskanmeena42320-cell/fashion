import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Layers, Check } from 'lucide-react';
import { StyleEditLook, Product } from '../types';

interface StyleEditProps {
  looks: StyleEditLook[];
  allProducts: Product[];
  onAddLookToCart: (products: Product[]) => void;
  onSelectProduct: (product: Product) => void;
}

export const StyleEdit: React.FC<StyleEditProps> = ({
  looks,
  allProducts,
  onAddLookToCart,
  onSelectProduct,
}) => {
  const [selectedLookId, setSelectedLookId] = useState<string>(looks[0]?.id || 'look-everyday');
  const [addedLookId, setAddedLookId] = useState<string | null>(null);

  const activeLook = looks.find((l) => l.id === selectedLookId) || looks[0];

  // Resolve products in the current look
  const lookProducts = activeLook.productIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const lookTotalPrice = lookProducts.reduce((sum, p) => sum + p.price, 0);

  const handleAddLook = () => {
    onAddLookToCart(lookProducts);
    setAddedLookId(activeLook.id);
    setTimeout(() => setAddedLookId(null), 1500);
  };

  return (
    <section id="style-edit" className="w-full bg-[#FBFBF9] py-16 sm:py-24 border-b border-[#EFEFEA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#EFEFEA]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tag tracking-widest text-[#1E40AF] uppercase mb-1">
              <span>CURATED ROTATIONS</span>
              <span className="text-neutral-400">·</span>
              <span>NO GUESSWORK</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#141413]">
              THE STYLE EDIT
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Complete silhouettes engineered to work harmoniously together.
            </p>
          </div>

          {/* Look Selector Tabs */}
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            {looks.map((look) => (
              <button
                key={look.id}
                onClick={() => setSelectedLookId(look.id)}
                className={`px-3 py-1.5 text-xs font-mono-tag uppercase tracking-wider transition-colors border ${
                  selectedLookId === look.id
                    ? 'bg-[#141413] text-white border-[#141413]'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-black hover:text-black'
                }`}
              >
                {look.code}
              </button>
            ))}
          </div>
        </div>

        {/* Look Display Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Look Artwork: Pure Garment Flatlay / Composition */}
          <div className="lg:col-span-7 bg-[#F4F4F0] relative overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
            <img
              src={activeLook.image}
              alt={activeLook.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />

            <div className="absolute top-4 left-4 bg-white/95 px-3 py-1.5 border border-neutral-200">
              <span className="text-xs font-mono-tag font-bold uppercase tracking-wider text-[#141413]">
                {activeLook.code}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#141413]/90 backdrop-blur-md text-white p-4 max-w-md">
              <div className="text-[10px] font-mono-tag uppercase tracking-widest text-neutral-400">
                AESTHETIC NOTE
              </div>
              <div className="text-xs sm:text-sm font-medium mt-1">
                "{activeLook.vibe}"
              </div>
            </div>
          </div>

          {/* Right Column: Breakdown of Items in this Look */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full bg-white border border-[#EFEFEA] p-6">
            <div>
              <div className="flex items-baseline justify-between border-b border-[#EFEFEA] pb-4">
                <div>
                  <span className="text-xs font-mono-tag text-[#1E40AF] uppercase tracking-wider">
                    COMPLETE SILHOUETTE
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#141413] mt-0.5">
                    {activeLook.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono-tag text-neutral-400 uppercase block">SET TOTAL</span>
                  <span className="font-display text-xl font-bold text-[#141413] font-mono-tag tabular-nums">
                    ${lookTotalPrice}
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-600 mt-3 mb-6">
                {activeLook.description}
              </p>

              {/* Items List */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono-tag text-neutral-400 uppercase tracking-widest block">
                  GARMENTS IN THIS OUTFIT ({lookProducts.length}):
                </span>

                {lookProducts.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectProduct(item)}
                    className="group flex items-center justify-between p-2.5 bg-[#FBFBF9] hover:bg-[#F4F4F0] border border-neutral-100 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 bg-white overflow-hidden shrink-0 border border-neutral-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono-tag text-neutral-400 uppercase block">
                          {item.categoryLabel}
                        </span>
                        <span className="text-xs font-semibold text-[#141413] group-hover:text-[#1E40AF] transition-colors block">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-neutral-500">
                          {item.silhouette}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#141413] font-mono-tag tabular-nums">
                        ${item.price}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-4 border-t border-[#EFEFEA]">
              <button
                type="button"
                onClick={handleAddLook}
                className="w-full py-3.5 px-4 text-xs font-medium uppercase tracking-wider text-white bg-[#141413] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
              >
                {addedLookId === activeLook.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>ENTIRE LOOK ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD COMPLETE LOOK TO BAG · ${lookTotalPrice}</span>
                  </>
                )}
              </button>
              <div className="text-[11px] text-center text-neutral-400 mt-2 font-mono-tag uppercase">
                COMPLIMENTARY DOMESTIC SHIPPING INCLUDED
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
