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
  // saved: string[]
  saved: IProduct[]
  sold: string[]
  about?: string
  dob?: string | Date
  activeLastUpdate: string | Date
  usernameLastUpdate?: string | Date
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
  createdAt: string
  updatedAt?: string | Date
  role: string
}

export interface UpdateFields {
  // TODO: ask about username
  // username: string
  firstName: string
  lastName: string
  image?: string
  about: string
  dob: string
  phone: string
  address: {
    apartment: string
    street: string
    state: string
    zipcode: number
  }
  rebundle: {
    status: boolean
    count: number
  }
}

export type UserBalance = {
  currency: string
  balance: number
  userId: string
}
