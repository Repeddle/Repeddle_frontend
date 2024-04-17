import { IProduct } from "./product"

export interface IAddress {
  apartment?: string
  street?: string
  state?: string
  zipcode?: number
}

export interface IRebundle {
  status: boolean
  count: number
}

export interface IUser {
  _id: string
  username: string
  firstName: string
  lastName: string
  image?: string
  email: string
  isAdmin: boolean
  isSeller: boolean
  followers: string[]
  following: string[]
  // likes: string[];
  likes: IProduct[]
  saved: string[]
  sold: string[]
  about?: string
  dob?: Date
  activeLastUpdate: Date
  usernameLastUpdate?: Date
  buyers: string[]
  rating: number
  accountNumber?: number
  phone?: string
  accountName?: string
  newsletter: boolean
  bankName?: string
  earnings: number
  address?: IAddress
  numReviews: number
  badge: boolean
  active: boolean
  influencer: boolean
  isVerifiedEmail: boolean
  region: "NGN" | "ZAR"
  rebundle: IRebundle
  createdAt?:string|Date
  updatedAt?:string|Date
}

export interface UpdateFields {
  username: string
  firstName: string
  lastName: string
  image?: string
}
