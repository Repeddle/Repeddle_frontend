export type Payments = {
  _id: string
  userId: {
    _id: string
    username: string
  }
  amount: number
  status: string
  reason: string
  to: string
  orderId: string
  createdAt: string
  updatedAt: string
}

export type PaymentResponse = {
  _id: string
  userId: {
    _id: string
    username: string
    image: string
  }
  amount: number
  status: string
  reason: string
  to: string
  orderId: string
  createdAt: string
  updatedAt: string
  meta?: {
    detail?: {
      accountName?: string
      accountNumber?: string
      bankName?: string
    }
  }
}

export type PaymentWithPagination = {
  payments: Payments[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
  }
}
