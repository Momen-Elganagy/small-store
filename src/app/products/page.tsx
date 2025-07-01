import { Metadata } from "next";
import ProductsList from "./ProductsList";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Products",
};

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <Suspense
      fallback={
        <p className="text-center text-blue-600">Loading products...</p>
      }
    >
      <ProductsList products={products} />
    </Suspense>
  );
}
