"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useWishlist } from "@/components/WishlistContext";
import { useCart } from "@/components/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const navbarItems = [
    { link: "/", page: "Home" },
    { link: "/category", page: "Category" },
    { link: "/products", page: "Products" },
    { link: "/cart", page: "Cart" },
    { link: "/about", page: "About" },
  ];

  const linkStyles = (path: string) =>
    `text-gray-100 mx-2 px-3 py-2 rounded transition-colors duration-200 hover:bg-blue-900 hover:text-white ${
      pathname === path ? "bg-blue-950 text-white font-bold" : ""
    }`;

  const mobileLinkStyles = (path: string) =>
    `text-gray-100 px-3 py-2 rounded transition-colors duration-200 hover:bg-blue-900 hover:text-white ${
      pathname === path ? "bg-blue-950 text-white font-bold" : ""
    }`;

  return (
    <nav
      style={{
        background: "#1e293b",
        boxShadow: "0 2px 8px 0 rgba(30,41,59,0.15)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-extrabold text-white tracking-wide flex items-center gap-3">
            <Image src="/logo.svg" alt="logo" width={36} height={36} className="rounded bg-white p-1 shadow-sm border border-blue-200" />
            <Link href="/" className="hover:text-blue-400 transition-colors duration-200">
              My Store
            </Link>
          </div>

          <div className="hidden md:flex space-x-2 items-center">
            {navbarItems.filter((item) => item.link !== "/cart").map((path) => (
              <Link
                key={path.link}
                href={path.link}
                className={linkStyles(path.link)}
              >
                {path.page}
              </Link>
            ))}
            <Link href="/wishlist" className="relative group ml-2">
              <span className="inline-flex items-center justify-center p-2 rounded-full hover:bg-pink-100 transition">
                <svg className="w-6 h-6 text-pink-500 group-hover:text-pink-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </span>
            </Link>
            <Link href="/cart" className="relative group ml-2">
              <span className="inline-flex items-center justify-center p-2 rounded-full hover:bg-blue-100 transition">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-blue-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </span>
            </Link>
          </div>

          <div className="md:hidden">
            <button className="text-white hover:text-blue-300">
              <svg
                className="w-7 h-7"
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

          <div className="flex items-center gap-3">
            {session ? (
              <>
                <Link href="/profile" className="flex items-center gap-2 group">
                  {session.user?.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-8 h-8 rounded-full border-2 border-blue-600 shadow-sm group-hover:scale-105 transition"
                    />
                  )}
                  <span className="text-white font-semibold mr-2 group-hover:underline">
                    {session.user?.name || session.user?.email}
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <span className="px-4 py-1 rounded border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition">Login</span>
                </Link>
              </>
            )}
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
