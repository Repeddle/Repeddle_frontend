import { IUser } from "./user"

export interface Review {
  // user: string
  user: IUser
  comment: string
  rating: number
  like?: string
}

export interface Share {
  user: string | null
  hashed: string
  time: Date | null
}

export interface ViewCount {
  hashed: string
  time: Date | string
}

export interface ISize {
  size: string
  quantity: number
}

export interface IProduct {
  _id: string
  name: string
  // seller: string;
  seller: Seller
  slug: string
  images: string[]
  tags: string[]
  video?: string
  brand?: string
  color?: string
  mainCategory: string
  category?: string
  subCategory?: string
  material?: string
  description: string
  sizes: ISize[]
  //   userBuy: any[];
  //   deliveryOption?: any[];
  condition: string
  keyFeatures?: string
  specification?: string
  overview?: string
  sellingPrice: number
  costPrice?: number
  rating: number
  likes: string[]
  shares: Share[]
  viewcount: ViewCount[]
  reviews: Review[]
  sold?: boolean
  badge?: boolean
  meta: object
  active?: boolean
  vintage?: boolean
  luxury?: boolean
  luxuryImage?: string
  countInStock: number
  region: "NGN" | "ZAR"
  isAvailable: boolean
  createdAt?: string | Date
  updatedAt?: string | Date
}

// temporary
export interface Seller {
  address: {
    street: string
    state: string
    zipcode: number
  }
  rebundle: {
    status: boolean
    count: number
  }
  _id: string
  username: string
  firstName: string
  lastName: string
  image: string
  email: string
  followers: string[]
  sold: string[]
  numReviews: number
  badge: boolean
  createdAt?: string | Date
  updatedAt?: string | Date
}
