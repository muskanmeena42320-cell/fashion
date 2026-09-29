export interface Product {
  id: string;
  name: string;
  category: 'tees' | 'shirts' | 'outerwear' | 'bottoms' | 'hoodies' | 'accessories';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  badge?: 'NEW DROP' | 'LIMITED RUN' | 'ARCHIVE' | 'SELLING FAST';
  isNewArrival?: boolean;
  isTrending?: boolean;
  isLimitedDrop?: boolean;
  image: string;
  secondaryImage?: string;
  detailImages?: string[];
  silhouette: string;
  fit: string;
  fabric: string;
  weight: string;
  description: string;
  features: string[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'OS')[];
  colors: { name: string; hex: string }[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor?: string;
  quantity: number;
}

export interface BrandConfig {
  brandName: string;
  tagline: string;
  cityCountry: string;
  instagramHandle: string;
  storeName: string;
  storeAddress: string;
  storeHours: string;
}

export interface StyleEditLook {
  id: string;
  code: string;
  title: string;
  vibe: string;
  description: string;
  productIds: string[];
  image: string;
}
