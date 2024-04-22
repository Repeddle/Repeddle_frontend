import { CartItem } from "../context/CartContext"
import { IUser } from "./user"

export type DeliverStatus =
  | "In Transit"
  | "Processing"
  | "Dispatched"
  | "Return Logged"
  | "Received"
  | "Delivered"

export type OrderItem = CartItem & {
  onHold: boolean
  deliveredAt: string | Date
  deliveryStatus: DeliverStatus
  trackingNumber?: string
  deliverySelect: { cost: number }
}

export type Order = {
  orderItems: OrderItem[]
  user: IUser
  isPaid: boolean
  paymentMethod: string
  deliveryMethod: string
  createdAt: string | Date
  deliveredAt: string | Date
  itemsPrice: number
  shippingPrice: number
  totalPrice: number
}

export enum DeliverStatusEnum {
  Processing = 1,
  Dispatched = 2,
  "In Transit" = 3,
  Delivered = 4,
  Received = 5,
  "Return Logged" = 6,
  "Return Approved" = 8,
  "Return Declined" = 7,
  "Return Dispatched" = 9,
  "Return Delivered" = 10,
  "Return Received" = 11,
  Refunded = 12,
  "Payment to Seller Initiated" = 13,
}
