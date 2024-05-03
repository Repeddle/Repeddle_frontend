export type Summary = {
  users: {
    _id: string | null
    numUsers: number
  }[]
  orders: {
    _id: string | null
    numOrders: number
    numSales: number
  }[]
  dailyOrders: []
  products: {
    _id: string | null
    numProducts: number
  }[]
  productCategories: {
    _id: string
    count: number
  }[]
  earnings: {
    _id: string | null
    numOrders: number
    numSales: number
  }[]
}

export type BestSeller = {
  _id: string
  score: number
  numViews: number
  userId: {
    _id: string
    username: string
    image: string
    email: string
    sold: string[]
    earnings: number
    badge: boolean
  }
  region: string
  createdAt: string
  updatedAt: string
}

export type ViewedProducts = {
  _id: string
  score: number
  numViews: number
  productId: {
    _id: string
    name: string
    slug: string
    image: string
  }
  region: string
  createdAt: string
  updatedAt: string
}
