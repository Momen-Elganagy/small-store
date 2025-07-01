"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();

  const navbarItems = [
    { link: "/", page: "Home" },
    { link: "/category", page: "Category" },
    { link: "/products", page: "Products" },
  ];

  const linkStyles = (path: string) =>
    `text-gray-800  mx-1 hover:text-blue-600 transition-colors ${
      pathname === path ? "text-blue-600 font-bold" : ""
    }`;

  const mobileLinkStyles = (path: string) =>
    `text-gray-600 hover:text-blue-600 transition-colors py-2 ${
      pathname === path ? "text-blue-600 font-bold" : ""
    }`;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold text-gray-800">
            <Link href="/">My Store</Link>
          </div>

          <div className="hidden md:flex space-x-8">
            {navbarItems.map((path) => (
              <Link
                key={path.link}
                href={path.link}
                className={linkStyles(path.link)}
              >
                {path.page}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button className="text-gray-600 hover:text-blue-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="flex flex-col space-y-2">
            <Link href="/" className={mobileLinkStyles("/")}>
              Home
            </Link>
            <Link href="/category" className={mobileLinkStyles("/category")}>
              Categories
            </Link>
            <Link href="/products" className={mobileLinkStyles("/products")}>
              Products
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
