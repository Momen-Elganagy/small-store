"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type WishlistItemType = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type WishlistContextType = {
  wishlist: WishlistItemType[];
  addToWishlist: (item: WishlistItemType) => void;
  removeFromWishlist: (id: number) => void;
  isWishlisted: (id: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItemType[]>([]);

  const addToWishlist = (item: WishlistItemType) => {
    setWishlist((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev, item]));
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isWishlisted = (id: number) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}; 