import {
  AddToCartRequest,
  ICart,
  ICartResponse,
  UpdateCartRequest,
} from "../types/cart";
import { getBackendErrorMessage } from "../utils/error";
import api from "./api";

export const getCart = async (guestId?: string): Promise<ICart> => {
  try {
    const url = guestId ? `/cart?guestId=${guestId}` : "/cart";
    const resp: ICartResponse = await api.get(url);

    if (!resp.status) {
      throw new Error("Fetch cart failed: " + getBackendErrorMessage(resp));
    }

    return resp.data;
  } catch (error) {
    console.error("Fetch cart error:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const addToCart = async (data: AddToCartRequest): Promise<ICart> => {
  try {
    const resp: ICartResponse = await api.post("/cart/add", data);

    if (!resp.status) {
      throw new Error("Add to cart failed: " + getBackendErrorMessage(resp));
    }

    return resp.data;
  } catch (error) {
    console.error("Add to cart error:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const updateCart = async (data: UpdateCartRequest): Promise<ICart> => {
  try {
    const resp: ICartResponse = await api.put("/cart/update", data);

    if (!resp.status) {
      throw new Error("Update cart failed: " + getBackendErrorMessage(resp));
    }

    return resp.data;
  } catch (error) {
    console.error("Update cart error:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const removeFromCart = async ({
  productId,
  guestId,
}: {
  productId: string;
  guestId?: string;
}): Promise<ICart> => {
  try {
    const url = guestId
      ? `/cart/remove/${productId}?guestId=${guestId}`
      : `/cart/remove/${productId}`;
    const resp: ICartResponse = await api.delete(url);

    if (!resp.status) {
      throw new Error(
        "Remove from cart failed: " + getBackendErrorMessage(resp),
      );
    }

    return resp.data;
  } catch (error) {
    console.error("Remove from cart error:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};

export const clearCart = async ({
  guestId,
}: {
  guestId?: string;
}): Promise<boolean> => {
  try {
    const resp: { status: boolean } = await api.post("/cart/clear", {
      guestId,
    });

    if (!resp.status) {
      throw new Error("Clear cart failed: " + getBackendErrorMessage(resp));
    }

    return resp.status;
  } catch (error) {
    console.error("Clear cart error:", getBackendErrorMessage(error));
    throw getBackendErrorMessage(error);
  }
};
