export interface Review {
  user: string;
  comment: string;
  rating: number;
  like?: string;
}

export interface Share {
  user: string | null;
  hashed: string;
  time: Date | null;
}

export interface ViewCount {
  hashed: string;
  time: Date;
}

export interface ISize {
  size: string;
  quantity: number;
}

export interface IProduct {
  _id: string;
  name: string;
  seller: string;
  slug: string;
  images: string[];
  tags: string[];
  video?: string;
  brand?: string;
  color?: string;
  mainCategory: string;
  category?: string;
  subCategory?: string;
  material?: string;
  description: string;
  sizes: ISize[];
  //   userBuy: any[];
  //   deliveryOption?: any[];
  condition: string;
  keyFeatures?: string;
  specification?: string;
  overview?: string;
  sellingPrice: number;
  costPrice?: number;
  rating: number;
  likes: string[];
  shares: Share[];
  viewcount: ViewCount[];
  reviews: Review[];
  sold?: boolean;
  badge?: boolean;
  meta: object;
  active?: boolean;
  vintage?: boolean;
  luxury?: boolean;
  luxuryImage?: string;
  countInStock: number;
  region: 'NGN' | 'ZAR';
  isAvailable: boolean;
}
