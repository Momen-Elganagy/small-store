"use client";
import { useWishlist } from "@/components/WishlistContext";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-pink-700 text-center">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-600 text-lg">Your wishlist is empty.</p>
          <Link href="/products">
            <span className="inline-block bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition font-semibold">Browse Products</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {wishlist.map((item) => (
            <div key={item.id} className="flex items-center bg-white rounded-lg shadow p-4 border border-pink-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain rounded mr-4 border"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-pink-700 font-bold">${item.price}</p>
              </div>
              <button
                className="ml-4 text-pink-600 hover:underline font-semibold"
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 