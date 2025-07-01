import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "home page of my app",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-6">
          Explore the Best Deals
        </h1>
        <p className="text-xl text-blue-600 mb-10 max-w-3xl mx-auto">
          Dive into a world of top-notch products, handpicked just for you. From
          trending tech to timeless fashion — start your journey now.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 px-4">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-3">Top Picks</h2>
            <p className="text-gray-600">
              Explore items everyone’s talking about this season.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-3">
              Fresh Finds
            </h2>
            <p className="text-gray-600">
              Just landed! Be the first to shop our newest arrivals.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-3">
              Hot Discounts
            </h2>
            <p className="text-gray-600">
              Save big on selected items for a limited time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
