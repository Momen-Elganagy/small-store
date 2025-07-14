"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FilterBar from "@/components/FilterBar";
import { useWishlist } from "@/components/WishlistContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductsList({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const category = searchParams.get("category")?.toLowerCase() || "";

  const filtered = category
    ? products.filter((product) =>
        product.category.toLowerCase().includes(category)
      )
    : products;

  return (
    <div className="min-h-screen p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <FilterBar />
        {category && (
          <p className="text-sm text-gray-600 mt-2">
            Showing category: {category}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => {
          const wishlisted = isWishlisted(product.id);
          return (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition relative"
            >
              <div className="h-40 bg-gray-100 rounded overflow-hidden mb-3 relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <button
                  className={`absolute top-2 right-2 z-10 p-1 rounded-full shadow-md border-2 transition-colors duration-200 focus:outline-none ${
                    wishlisted
                      ? "bg-pink-600 border-pink-600 text-white hover:bg-pink-700"
                      : "bg-white border-gray-200 text-pink-500 hover:bg-pink-100"
                  }`}
                  title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  onClick={() =>
                    wishlisted
                      ? removeFromWishlist(product.id)
                      : addToWishlist({
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          image: product.image,
                        })
                  }
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </button>
              </div>

              <h3 className="text-lg font-semibold truncate">{product.title}</h3>
              <p className="text-sm text-gray-500 mb-1 capitalize">
                Category: {product.category}
              </p>

              <div className="flex justify-between items-center mt-2">
                <span className="text-blue-600 font-bold">${product.price}</span>
                <span className="text-sm text-green-600">
                  ★ {product.rating.rate}
                </span>
              </div>

              <Link href={`/products/${product.id}`}>
                <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                  Details
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
