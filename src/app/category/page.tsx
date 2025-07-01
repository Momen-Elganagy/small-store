import Link from "next/link";
import { Metadata } from "next";
import PathnameDisplay from "@/components/PathnameDisplay";

export const metadata: Metadata = {
  title: "Categories",
};

export default function Category() {
  const categories = [
    {
      id: 1,
      name: "Phones",
      description: "newest electronics",
      slug: "phones",
    },
    { id: 2, name: "Laptops", description: "pcs", slug: "laptops" },
  ];

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Categories</h1>
        <PathnameDisplay />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-3">{category.name}</h2>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="flex justify-between items-center">
              <Link
                href={`/category/${category.slug}`}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                View Category
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
