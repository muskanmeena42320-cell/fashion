import { BrandConfig } from '../types';

export const defaultBrandConfig: BrandConfig = {
  brandName: '[BRAND NAME]',
  tagline: 'Contemporary streetwear designed for everyday individuality',
  cityCountry: '[CITY, COUNTRY]',
  instagramHandle: '[INSTAGRAM HANDLE]',
  storeName: '[BRAND NAME] FLAGSHIP',
  storeAddress: '[STORE ADDRESS]',
  storeHours: '[STORE HOURS]',
};

export const sampleAlternativeBrands: Record<string, BrandConfig> = {
  placeholder: defaultBrandConfig,
  tokyo: {
    brandName: 'ARCHIVE_01',
    tagline: 'Sculptural silhouettes and heavyweight garments',
    cityCountry: 'TOKYO, JAPAN',
    instagramHandle: 'archive01.tokyo',
    storeName: 'ARCHIVE_01 SHIBUYA',
    storeAddress: '14-2 JINGUMAE, SHIBUYA-KU, TOKYO',
    storeHours: 'MON–SUN / 11:00 — 20:00',
  },
  london: {
    brandName: 'KINETIC STUDIO',
    tagline: 'Tactical outerwear and oversized unisex staples',
    cityCountry: 'LONDON, UK',
    instagramHandle: 'kinetic.atelier',
    storeName: 'KINETIC REDCHURCH',
    storeAddress: '38 REDCHURCH ST, SHOREDITCH, LONDON E2 7DD',
    storeHours: 'TUE–SUN / 10:30 — 19:30',
  },
};
