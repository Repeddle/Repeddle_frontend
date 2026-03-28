import React, { createContext, useState, useEffect, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export type PaymentType = "Card" | "Wallet";

// Define the CartContextData
type CartContextData = {
  paymentMethod: PaymentType;
  changePaymentMethod: (method: PaymentType) => void;
  clearCart: () => void;
};

// Create the CartContext
export const CartContext = createContext<CartContextData | undefined>(
  undefined,
);

// CartProvider component
export const CartProvider: React.FC<Props> = ({ children }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>("Card");

  const changePaymentMethod = (method: PaymentType) => {
    setPaymentMethod(method);
    localStorage.setItem("paymentMethod", JSON.stringify(method));
  };

  useEffect(() => {
    const savedMethod = localStorage.getItem("paymentMethod");
    if (savedMethod) {
      setPaymentMethod(JSON.parse(savedMethod));
    }
  }, []);

  const clearCart = () => {
    localStorage.removeItem("paymentMethod");
    setPaymentMethod("Card");
  };

  return (
    <CartContext.Provider
      value={{
        clearCart,
        paymentMethod,
        changePaymentMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
