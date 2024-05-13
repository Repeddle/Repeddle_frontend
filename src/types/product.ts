import { IUser } from "./user"

export interface IReview {
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
  buyers: string[]
  deliveryOption: DeliveryOption[]
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
  meta: Meta
  active?: boolean
  vintage?: boolean
  luxury?: boolean
  luxuryImage?: string
  countInStock: number
  region: "NGN" | "ZAR"
  isAvailable: boolean
  sellingPriceHistory: SellingPriceHistory[]
  costPriceHistory: CostPriceHistory[]
  createdAt: string
  updatedAt: string
}

export type ProductWithPagination = Pagination & { products: IProduct[] }

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
  createdAt: string
  updatedAt: string
}

export interface Pagination {
  totalCount: number
  currentPage: number
  totalPages: number
}

export interface DeliveryOption {}

export interface Review {
  user: string
  comment: string
  rating: number
  like: string
}

export interface Meta {}

export interface SellingPriceHistory {
  value: number
  updatedAt: string
}

export interface CostPriceHistory {
  value: number
  updatedAt: string
}

export type ICreateProduct = Omit<
  IProduct,
  | "_id"
  | "seller"
  | "slug"
  | "buyers"
  | "deliveryOption"
  | "rating"
  | "likes"
  | "shares"
  | "viewcount"
  | "sold"
  | "badge"
  | "active"
  | "region"
  | "isAvailable"
  | "sellingPriceHistory"
  | "costPriceHistory"
  | "createdAt"
  | "updatedAt"
>

export type IBrand = {
  name: string
  alpha: string
  type: "SYSTEM" | "USER"
  published: boolean
  _id: string
  createdAt: string
  updatedAt: string
}

export type ICreateBrand = {
  published: boolean
  name: string
}
