import React from 'react';

interface GarmentVisualProps {
  type: 'tee' | 'jacket' | 'hoodie' | 'pants' | 'shirt' | 'accessory' | 'jeans' | 'shorts';
  variant?: string;
  className?: string;
  colorHex?: string;
}

export const GarmentVisual: React.FC<GarmentVisualProps> = ({
  type,
  className = 'w-full h-full',
  colorHex = '#27272A',
}) => {
  // Pure garment visual: crisp technical / studio silhouette with seam lines, textures, and details
  // Absolute rule: NO PEOPLE, NO MANNEQUINS, GARMENTS ONLY
  switch (type) {
    case 'tee':
      return (
        <div className={`relative flex items-center justify-center p-8 bg-[#F4F4F0] ${className}`}>
          <svg viewBox="0 0 300 320" className="w-4/5 h-4/5 drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]" fill="none">
            {/* Boxy dropped-shoulder tee silhouette */}
            <path
              d="M95 45 C110 58 190 58 205 45 L275 85 L245 140 L210 125 L210 280 C210 285 205 290 200 290 L100 290 C95 290 90 285 90 280 L90 125 L55 140 L25 85 Z"
              fill={colorHex}
            />
            {/* Collar band */}
            <path
              d="M95 45 C115 62 185 62 205 45 C190 54 110 54 95 45 Z"
              fill="#18181B"
              opacity="0.3"
            />
            {/* Avant-garde architectural chest graphic / typography */}
            <g opacity="0.85">
              <rect x="120" y="115" width="60" height="75" fill="#E4E4E7" opacity="0.15" />
              <line x1="125" y1="130" x2="175" y2="130" stroke="#F4F4F5" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="125" y1="145" x2="165" y2="145" stroke="#F4F4F5" strokeWidth="2" />
              <circle cx="150" cy="165" r="10" stroke="#F4F4F5" strokeWidth="1.5" />
              <text x="150" y="200" fill="#E4E4E7" fontSize="7" fontFamily="Space Mono" textAnchor="middle" letterSpacing="2">
                ARCHIVE / REF.09
              </text>
            </g>
            {/* Seam stitches */}
            <line x1="90" y1="125" x2="210" y2="125" stroke="#000" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" />
            <line x1="92" y1="285" x2="208" y2="285" stroke="#000" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
          </svg>
        </div>
      );

    case 'jacket':
      return (
        <div className={`relative flex items-center justify-center p-8 bg-[#F4F4F0] ${className}`}>
          <svg viewBox="0 0 300 320" className="w-4/5 h-4/5 drop-shadow-[0_16px_28px_rgba(0,0,0,0.1)]" fill="none">
            {/* Boxy workwear / utility jacket body */}
            <path
              d="M85 45 L115 50 L185 50 L215 45 L285 95 L250 160 L220 145 L220 290 L80 290 L80 145 L50 160 L15 95 Z"
              fill={colorHex}
            />
            {/* Tactical collar */}
            <path d="M115 50 L150 75 L115 95 L95 60 Z" fill="#2E2E32" />
            <path d="M185 50 L150 75 L185 95 L205 60 Z" fill="#2E2E32" />
            {/* Center metal zipper */}
            <line x1="150" y1="75" x2="150" y2="290" stroke="#CBD5E1" strokeWidth="3" />
            {/* 3D Utility pockets with storm flaps */}
            <rect x="95" y="115" width="45" height="50" rx="3" fill="#1C1C1F" opacity="0.6" stroke="#475569" strokeWidth="1" />
            <rect x="95" y="110" width="45" height="12" rx="2" fill="#334155" />
            <circle cx="117" cy="116" r="2" fill="#E2E8F0" />

            <rect x="160" y="115" width="45" height="50" rx="3" fill="#1C1C1F" opacity="0.6" stroke="#475569" strokeWidth="1" />
            <rect x="160" y="110" width="45" height="12" rx="2" fill="#334155" />
            <circle cx="182" cy="116" r="2" fill="#E2E8F0" />

            {/* Lower bellows pockets */}
            <rect x="95" y="185" width="48" height="55" rx="3" fill="#1C1C1F" opacity="0.7" stroke="#475569" strokeWidth="1" />
            <rect x="157" y="185" width="48" height="55" rx="3" fill="#1C1C1F" opacity="0.7" stroke="#475569" strokeWidth="1" />
            <line x1="95" y1="200" x2="143" y2="200" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="157" y1="200" x2="205" y2="200" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />

            {/* Waist cinch detail */}
            <line x1="82" y1="285" x2="218" y2="285" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 3" />
          </svg>
        </div>
      );

    case 'hoodie':
      return (
        <div className={`relative flex items-center justify-center p-8 bg-[#F4F4F0] ${className}`}>
          <svg viewBox="0 0 300 320" className="w-4/5 h-4/5 drop-shadow-[0_14px_24px_rgba(0,0,0,0.09)]" fill="none">
            {/* Heavyweight dropped-shoulder hoodie silhouette */}
            <path
              d="M85 65 L105 45 C125 35 175 35 195 45 L215 65 L280 115 L245 170 L215 150 L215 285 L85 285 L85 150 L55 170 L20 115 Z"
              fill={colorHex}
            />
            {/* Sculptural crossover hood structure */}
            <path
              d="M105 45 C120 30 180 30 195 45 C175 65 125 65 105 45 Z"
              fill="#18181B"
              opacity="0.35"
            />
            <path
              d="M115 55 C135 75 165 75 185 55 C160 85 140 85 115 55 Z"
              fill="#09090B"
              opacity="0.4"
            />
            {/* Kangaroo pocket */}
            <path
              d="M110 200 L190 200 L200 260 L100 260 Z"
              fill="#1A1A1E"
              opacity="0.5"
              stroke="#52525B"
              strokeWidth="1"
            />
            {/* Distressed ribbed hem & cuffs */}
            <rect x="85" y="275" width="130" height="15" fill="#18181B" opacity="0.3" />
            <line x1="85" y1="275" x2="215" y2="275" stroke="#3F3F46" strokeWidth="1" strokeDasharray="3 2" />
          </svg>
        </div>
      );

    case 'pants':
    case 'jeans':
      return (
        <div className={`relative flex items-center justify-center p-8 bg-[#F4F4F0] ${className}`}>
          <svg viewBox="0 0 300 320" className="w-4/5 h-4/5 drop-shadow-[0_14px_24px_rgba(0,0,0,0.08)]" fill="none">
            {/* Wide-leg / Parachute / Cargo silhouette */}
            <path
              d="M90 35 L210 35 L215 45 L225 285 L165 285 L150 120 L135 285 L75 285 L85 45 Z"
              fill={colorHex}
            />
            {/* Waistband with belt loops */}
            <rect x="88" y="35" width="124" height="18" fill="#1F2937" opacity="0.35" />
            <line x1="110" y1="35" x2="110" y2="53" stroke="#9CA3AF" strokeWidth="2" />
            <line x1="150" y1="35" x2="150" y2="53" stroke="#9CA3AF" strokeWidth="2" />
            <line x1="190" y1="35" x2="190" y2="53" stroke="#9CA3AF" strokeWidth="2" />
            {/* Cargo side pockets */}
            <rect x="68" y="130" width="22" height="45" rx="3" fill="#111827" opacity="0.6" stroke="#4B5563" strokeWidth="1" />
            <rect x="210" y="130" width="22" height="45" rx="3" fill="#111827" opacity="0.6" stroke="#4B5563" strokeWidth="1" />
            {/* Articulated knee darts */}
            <path d="M85 185 L135 190" stroke="#4B5563" strokeWidth="1.5" strokeDasharray="2 2" />
            <path d="M215 185 L165 190" stroke="#4B5563" strokeWidth="1.5" strokeDasharray="2 2" />
            {/* Drawstring bungee hems */}
            <circle cx="75" cy="285" r="3" fill="#E5E7EB" />
            <circle cx="225" cy="285" r="3" fill="#E5E7EB" />
          </svg>
        </div>
      );

    case 'shirt':
      return (
        <div className={`relative flex items-center justify-center p-8 bg-[#F4F4F0] ${className}`}>
          <svg viewBox="0 0 300 320" className="w-4/5 h-4/5 drop-shadow-[0_12px_22px_rgba(0,0,0,0.08)]" fill="none">
            {/* Boxy Camp Collar Overshirt */}
            <path
              d="M90 45 L115 50 L185 50 L210 45 L270 90 L240 145 L210 135 L210 280 L90 280 L90 135 L60 145 L30 90 Z"
              fill={colorHex}
            />
            {/* Camp Cuban Collar */}
            <path d="M115 50 L150 80 L115 95 L92 55 Z" fill="#374151" />
            <path d="M185 50 L150 80 L185 95 L208 55 Z" fill="#374151" />
            {/* Button Placket */}
            <line x1="150" y1="80" x2="150" y2="280" stroke="#1F2937" strokeWidth="2" />
            <circle cx="150" cy="110" r="3" fill="#F3F4F6" stroke="#374151" strokeWidth="1" />
            <circle cx="150" cy="150" r="3" fill="#F3F4F6" stroke="#374151" strokeWidth="1" />
            <circle cx="150" cy="190" r="3" fill="#F3F4F6" stroke="#374151" strokeWidth="1" />
            <circle cx="150" cy="230" r="3" fill="#F3F4F6" stroke="#374151" strokeWidth="1" />
            {/* Chest patch pocket */}
            <rect x="100" y="115" width="38" height="42" fill="#1F2937" opacity="0.3" stroke="#4B5563" strokeWidth="1" />
          </svg>
        </div>
      );

    case 'accessory':
      return (
        <div className={`relative flex items-center justify-center p-8 bg-[#F4F4F0] ${className}`}>
          <svg viewBox="0 0 300 320" className="w-4/5 h-4/5 drop-shadow-[0_12px_20px_rgba(0,0,0,0.08)]" fill="none">
            {/* Structured Tactical Crossbody Bag with hardware */}
            <path d="M70 120 L230 120 L220 230 L80 230 Z" fill={colorHex} rx="6" />
            {/* Heavy nylon webbing strap */}
            <path d="M50 70 C70 40 230 40 250 70 L240 125 L220 120 L235 75 C220 55 80 55 65 75 L80 120 L60 125 Z" fill="#18181B" />
            {/* Tactical Cobra buckle */}
            <rect x="135" y="150" width="30" height="20" rx="3" fill="#94A3B8" />
            <circle cx="143" cy="160" r="2" fill="#0F172A" />
            <circle cx="157" cy="160" r="2" fill="#0F172A" />
            {/* Waterproof taped zips */}
            <line x1="85" y1="135" x2="215" y2="135" stroke="#475569" strokeWidth="3" />
            <circle cx="95" cy="135" r="3" fill="#94A3B8" />
            <text x="150" y="205" fill="#E2E8F0" fontSize="7" fontFamily="Space Mono" textAnchor="middle" letterSpacing="1.5">
              MODULAR RIG / 01
            </text>
          </svg>
        </div>
      );

    default:
      return (
        <div className={`relative flex items-center justify-center p-8 bg-[#F4F4F0] ${className}`}>
          <div className="w-16 h-16 rounded bg-neutral-200" />
        </div>
      );
  }
};
