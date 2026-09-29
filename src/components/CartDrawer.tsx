import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag, CheckCircle, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
  onExploreShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreShop,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [orderNumber, setOrderNumber] = useState<string>('');

  // Shipping threshold: $150
  const FREE_SHIPPING_THRESHOLD = 150;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const eligibleForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = eligibleForFreeShipping || subtotal === 0 ? 0 : 15;
  const finalTotal = subtotal - discountAmount + shippingFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ARCHIVE10' || promoCode.trim().toUpperCase() === 'GENZ10') {
      setDiscountPercent(10);
      setPromoMessage('10% ARCHIVE PROMO APPLIED');
    } else {
      setPromoMessage('INVALID CODE. TRY "ARCHIVE10"');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderNum = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(newOrderNum);
    setCheckoutStep('confirmed');
    onClearCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBFBF9] text-[#141413] shadow-2xl flex flex-col border-l border-neutral-300 animate-in slide-in-from-right duration-200">
          {/* Drawer Header */}
          <div className="px-6 py-4 border-b border-[#EFEFEA] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-neutral-800" />
              <span className="font-display font-bold uppercase text-sm tracking-wide">
                YOUR BAG ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart drawer"
              className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-neutral-700" />
            </button>
          </div>

          {/* FREE SHIPPING PROGRESS BAR */}
          <div className="bg-[#F4F4F0] px-6 py-2.5 border-b border-[#EFEFEA] text-xs font-mono-tag">
            {eligibleForFreeShipping ? (
              <div className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>UNLOCKED COMPLIMENTARY EXPRESS SHIPPING</span>
              </div>
            ) : (
              <div>
                <span>ADD </span>
                <strong className="text-neutral-900">${FREE_SHIPPING_THRESHOLD - subtotal}</strong>
                <span> MORE FOR FREE WORLDWIDE SHIPPING</span>
                <div className="w-full bg-neutral-200 h-1 mt-1.5 overflow-hidden">
                  <div
                    className="bg-[#1E40AF] h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Body Content based on Step */}
          {checkoutStep === 'cart' && (
            <>
              {/* Itemized List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#EFEFEA]">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
                      <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                    </div>
                    <span className="font-display text-lg font-bold uppercase text-neutral-800">
                      YOUR BAG IS EMPTY
                    </span>
                    <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                      Discover new season cuts, heavyweight hoodies, and wide-leg silhouettes.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onExploreShop();
                      }}
                      className="mt-6 px-6 py-3 bg-[#141413] text-white text-xs uppercase font-mono-tag tracking-wider hover:bg-neutral-800 transition-colors"
                    >
                      EXPLORE NEW ARRIVALS
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="py-4 flex gap-4 items-start"
                    >
                      <div className="w-20 h-24 bg-[#F4F4F0] shrink-0 overflow-hidden border border-neutral-200">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between h-24">
                        <div>
                          <div className="flex items-start justify-between">
                            <span className="text-xs font-semibold text-[#141413] leading-snug line-clamp-1">
                              {item.product.name}
                            </span>
                            <button
                              onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                              className="text-neutral-400 hover:text-rose-600 transition-colors pl-2"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[11px] font-mono-tag text-neutral-500 uppercase mt-0.5">
                            SIZE: {item.selectedSize} · {item.selectedColor || 'DEFAULT'}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-neutral-300 bg-white">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                              className="px-2 py-0.5 text-xs text-neutral-600 hover:text-black font-mono-tag"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-mono-tag font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                              className="px-2 py-0.5 text-xs text-neutral-600 hover:text-black font-mono-tag"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-xs font-mono-tag font-bold tabular-nums">
                            ${item.product.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer with Calculations */}
              {cartItems.length > 0 && (
                <div className="px-6 py-4 bg-white border-t border-[#EFEFEA] space-y-3">
                  {/* Promo Code input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="PROMO CODE (e.g. ARCHIVE10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs font-mono-tag uppercase bg-[#FBFBF9] border border-neutral-300 focus:outline-none focus:border-black"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-mono-tag uppercase"
                    >
                      APPLY
                    </button>
                  </form>
                  {promoMessage && (
                    <div className="text-[10px] font-mono-tag text-[#1E40AF]">
                      {promoMessage}
                    </div>
                  )}

                  <div className="space-y-1.5 text-xs font-mono-tag">
                    <div className="flex justify-between text-neutral-500">
                      <span>SUBTOTAL</span>
                      <span className="tabular-nums text-neutral-800">${subtotal}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>DISCOUNT ({discountPercent}%)</span>
                        <span className="tabular-nums">-${discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-neutral-500">
                      <span>ESTIMATED DELIVERY</span>
                      <span className="tabular-nums text-neutral-800">
                        {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-[#141413] pt-2 border-t border-neutral-100">
                      <span>TOTAL</span>
                      <span className="tabular-nums">${finalTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full py-3.5 bg-[#141413] hover:bg-neutral-800 text-white text-xs uppercase font-mono-tag tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>PROCEED TO CHECKOUT · ${finalTotal}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono-tag text-neutral-400 uppercase">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                    <span>ENCRYPTED & AUTHENTICATED TRANSACTION</span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Step 2: Instant Simulated Checkout */}
          {checkoutStep === 'checkout' && (
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
              <div>
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="text-xs font-mono-tag text-neutral-500 hover:text-black mb-4 flex items-center gap-1"
                >
                  ← BACK TO BAG
                </button>
                <h3 className="font-display text-xl font-bold uppercase mb-4">
                  CHECKOUT DETAILS
                </h3>

                <form id="checkout-form" onSubmit={handleCompleteOrder} className="space-y-3 text-xs font-mono-tag">
                  <div>
                    <label className="block text-neutral-500 mb-1">EMAIL FOR RECEIPT</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 focus:outline-none focus:border-black font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-500 mb-1">FULL RECIPIENT NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 focus:outline-none focus:border-black font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-500 mb-1">SHIPPING ADDRESS</label>
                    <input
                      type="text"
                      required
                      placeholder="Apt 4B, 102 Shibuya Dori"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 focus:outline-none focus:border-black font-sans"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-neutral-500 mb-1">CITY</label>
                      <input
                        type="text"
                        required
                        placeholder="Tokyo"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 focus:outline-none focus:border-black font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-500 mb-1">POSTAL CODE</label>
                      <input
                        type="text"
                        required
                        placeholder="150-0001"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 focus:outline-none focus:border-black font-sans"
                      />
                    </div>
                  </div>
                  <div className="pt-2">
                    <label className="block text-neutral-500 mb-1">PAYMENT DEMO METHOD</label>
                    <div className="p-3 bg-neutral-100 border border-neutral-200 text-neutral-700">
                      <span>✓ Express Card / Apple Pay Simulation</span>
                    </div>
                  </div>
                </form>
              </div>

              <div className="pt-6 border-t border-[#EFEFEA]">
                <div className="flex justify-between font-mono-tag text-xs font-bold mb-3">
                  <span>AMOUNT DUE:</span>
                  <span>${finalTotal}</span>
                </div>
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full py-3.5 bg-[#141413] hover:bg-neutral-800 text-white text-xs uppercase font-mono-tag tracking-wider font-semibold transition-colors"
                >
                  PLACE ORDER · ${finalTotal}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Order Confirmed State */}
          {checkoutStep === 'confirmed' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono-tag text-emerald-600 uppercase tracking-widest block mb-1">
                ORDER CONFIRMED
              </span>
              <h3 className="font-display text-2xl font-bold uppercase text-[#141413]">
                THANK YOU FOR YOUR ORDER
              </h3>
              <p className="text-xs font-mono-tag text-neutral-500 mt-2">
                REFERENCE: {orderNumber}
              </p>
              <p className="text-xs text-neutral-600 mt-3 max-w-xs">
                Your garments are being prepared for dispatch from our logistics hub. A confirmation dispatch email has been simulated.
              </p>
              <button
                onClick={() => {
                  setCheckoutStep('cart');
                  onClose();
                }}
                className="mt-8 px-6 py-3 bg-[#141413] text-white text-xs uppercase font-mono-tag tracking-wider"
              >
                CONTINUE BROWSING
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
