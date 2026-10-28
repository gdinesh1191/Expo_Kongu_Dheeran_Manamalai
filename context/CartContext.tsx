import { Profile } from "@/constants/SampleProfile";
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type CartContextValue = {
  cart: Profile[];
  isInCart: (id: string) => boolean;
  addToCart: (profile: Profile) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Profile[]>([]);

  const isInCart = useCallback((id: string) => cart.some((p) => p.id === id), [cart]);

  const addToCart = useCallback((profile: Profile) => {
    setCart((list) => (list.some((p) => p.id === profile.id) ? list : [profile, ...list]));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((list) => list.filter((p) => p.id !== id));
  }, []);

  const value = useMemo(
    () => ({ cart, isInCart, addToCart, removeFromCart }),
    [cart, isInCart, addToCart, removeFromCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
