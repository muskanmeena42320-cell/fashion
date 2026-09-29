import React from 'react';

export const BrandStatement: React.FC = () => {
  return (
    <section className="w-full bg-[#FBFBF9] py-24 sm:py-32 border-b border-[#EFEFEA]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 text-center">
        <span className="text-xs font-mono-tag tracking-widest text-[#1E40AF] uppercase mb-4 block">
          THE PHILOSOPHY
        </span>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#141413] leading-[1.1] mb-6">
          WEAR WHAT FEELS LIKE YOU.
        </h2>

        <p className="text-base sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-2xl mx-auto">
          Contemporary streetwear for a generation that values individuality over uniformity. No rigid gender rules, no disposable hype cycles—just sculptural cuts, honest weights, and pieces that mature with wear.
        </p>

        <div className="mt-12 flex items-center justify-center gap-8 text-xs font-mono-tag text-neutral-400 uppercase tracking-widest">
          <span>COMFORT</span>
          <span>·</span>
          <span>WEIGHT</span>
          <span>·</span>
          <span>VOLUME</span>
          <span>·</span>
          <span>LONGEVITY</span>
        </div>
      </div>
    </section>
  );
};
