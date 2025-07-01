"use client";

export default function ErrorPage({ error }: { error: Error }) {
  console.error("Product Page Error:", error);

  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6">
      <div>
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-700 mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
