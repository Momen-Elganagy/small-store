// src/app/products/[id]/page.tsx

import Image from "next/image";
import { notFound } from "next/navigation";

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

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);

  if (!res.ok) return notFound();

  const product: Product = await res.json();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">{product.title}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 w-full md:w-1/2">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex-1">
          <p className="text-lg font-semibold text-green-600 mb-2">
            ${product.price}
          </p>

          <p className="text-gray-700 mb-4">{product.description}</p>

          <ul className="text-sm text-gray-600 space-y-1 mb-6">
            <li>
              <strong>Category:</strong> {product.category}
            </li>
            <li>
              <strong>Rating:</strong> ★ {product.rating.rate} (
              {product.rating.count} reviews)
            </li>
          </ul>

          <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
