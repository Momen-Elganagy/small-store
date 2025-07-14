"use client";
import React from "react";
import Cartitem from "@/components/Cartitem";
import { useCart } from "@/components/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
          <Link href="/products">
            <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold">Continue Shopping</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <Cartitem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              quantity={item.quantity}
              onQuantityChange={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <span className="text-xl font-bold text-blue-800">Total:</span>
            <span className="text-2xl font-bold text-green-700">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-end mt-4">
            <Link href="/products">
              <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold">Continue Shopping</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
