import { IProduct } from "./product";

export interface ICartItem {
  product: IProduct;
  quantity: number;
  selected: boolean;
  selectedSize?: string;
  meta: any;
  selectedColor?: string;
  deliverySelect?: { [key: string]: string | number };
}

export interface ICart {
  _id?: string;
  user?: string;
  guestId?: string;
  items: ICartItem[];
  subtotal: number;
  total: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  deliveryFee: number;
}

export interface ICartResponse {
  status: boolean;
  data: ICart;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  deliverySelect?: { [key: string]: string | number };
  guestId?: string;
  selected?: boolean;
}

export interface UpdateCartRequest {
  productId: string;
  quantity?: number;
  selectedSize?: string;
  selectedColor?: string;
  deliverySelect?: { [key: string]: string | number };
  guestId?: string;
  selected?: boolean;
}
