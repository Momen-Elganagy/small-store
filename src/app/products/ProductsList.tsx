"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FilterBar from "@/components/FilterBar";

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
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="h-40 bg-gray-100 rounded overflow-hidden mb-3">
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
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
        ))}
      </div>
    </div>
  );
}
