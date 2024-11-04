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
