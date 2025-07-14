// src/app/products/[id]/page.tsx

"use client";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useWishlist } from "@/components/WishlistContext";

type Product = {
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
};

export default function ProductPage() {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-64 text-xl font-semibold text-blue-700">Loading...</div>;
  if (!product) return notFound();

  const cartItem = cart.find((item) => item.id === product.id);
  const inCart = !!cartItem;
  const wishlisted = isWishlisted(product.id);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
    }
    setFeedback(`Added ${quantity} to cart!`);
    setTimeout(() => setFeedback(""), 1200);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
    setFeedback("Removed from cart!");
    setTimeout(() => setFeedback(""), 1200);
    setQuantity(1);
  };

  const handleUpdateQuantity = (amount: number) => {
    if (!cartItem) return;
    updateQuantity(product.id, amount);
    setFeedback("Quantity updated!");
    setTimeout(() => setFeedback(""), 1200);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-blue-50 to-white py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-10 border border-blue-100">
        <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center items-center relative">
          <div className="relative w-full flex justify-center items-center">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="rounded-xl object-contain bg-gray-50 p-4 border border-gray-200 shadow-sm"
            />
            <button
              className={`absolute top-5 right-5 z-20 p-2 rounded-full shadow-md border-2 transition-colors duration-200 focus:outline-none ${
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
              style={{ boxShadow: '0 2px 8px 0 rgba(30,41,59,0.15)' }}
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold mb-3 text-blue-800 leading-tight">{product.title}</h1>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">{product.category}</span>
            <p className="text-2xl font-bold text-green-600 mb-2">${product.price}</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm font-semibold flex items-center gap-1">
                <svg className="w-4 h-4 inline-block text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.176 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                {product.rating.rate}
              </span>
              <span className="text-gray-500 text-sm">({product.rating.count} reviews)</span>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {!inCart ? (
              <div className="flex items-center gap-3 mb-4">
                <button
                  className="px-3 py-2 bg-blue-200 text-blue-700 rounded-l-lg text-xl font-bold hover:bg-blue-300 transition disabled:opacity-50"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-16 text-center border border-blue-200 rounded h-12 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                />
                <button
                  className="px-3 py-2 bg-blue-200 text-blue-700 rounded-r-lg text-xl font-bold hover:bg-blue-300 transition disabled:opacity-50"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            ) : null}
            {inCart ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <button
                    className="px-3 py-2 bg-blue-200 text-blue-700 rounded-l-lg text-xl font-bold hover:bg-blue-300 transition"
                    onClick={() => handleUpdateQuantity(-1)}
                    aria-label="Decrease quantity"
                    disabled={cartItem.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-16 text-center border border-blue-200 rounded h-12 text-xl font-semibold flex items-center justify-center bg-gray-50">
                    {cartItem.quantity}
                  </span>
                  <button
                    className="px-3 py-2 bg-blue-200 text-blue-700 rounded-r-lg text-xl font-bold hover:bg-blue-300 transition"
                    onClick={() => handleUpdateQuantity(1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  className="px-6 py-3 rounded-full font-bold text-lg shadow transition focus:outline-none focus:ring-2 focus:ring-blue-400 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 animate-pulse"
                  onClick={handleRemove}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  Remove from Cart
                </button>
              </div>
            ) : (
              <button
                className="px-6 py-3 rounded-full font-bold text-lg shadow transition focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                onClick={handleAdd}
                disabled={quantity < 1}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" /></svg>
                Add to Cart
              </button>
            )}
            {feedback && (
              <span className="text-sm text-green-700 animate-pulse mt-2">{feedback}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
