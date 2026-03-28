import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../services/cart";
import { AddToCartRequest, UpdateCartRequest } from "../types/cart";

const getGuestId = () => {
  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem("guestId", guestId);
  }
  console.log(guestId);
  return guestId;
};

export const useGetCart = () => {
  const guestId = getGuestId();
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(guestId),
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const guestId = getGuestId();
  return useMutation({
    mutationFn: (data: AddToCartRequest) => addToCart({ ...data, guestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const guestId = getGuestId();
  return useMutation({
    mutationFn: (data: UpdateCartRequest) => updateCart({ ...data, guestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const guestId = getGuestId();
  return useMutation({
    mutationFn: (data: { productId: string }) =>
      removeFromCart({ ...data, guestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const guestId = getGuestId();
  return useMutation({
    mutationFn: () => clearCart({ guestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
