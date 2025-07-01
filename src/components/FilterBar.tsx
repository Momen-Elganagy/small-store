"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React from "react";

const categories = [
  "men's clothing",
  "women's clothing",
  "electronics",
  "jewelery",
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentCategory = searchParams.get("category") || "";

  function handleFilter(category: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => handleFilter("")}
        className={`text-sm px-4 py-1 rounded ${
          !currentCategory
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleFilter(cat)}
          className={`capitalize text-sm px-4 py-1 rounded ${
            currentCategory === cat
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
