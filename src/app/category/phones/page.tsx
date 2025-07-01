import PathnameDisplay from "@/components/PathnameDisplay";

export default function Phones() {
  const phones = [
    { id: 1, name: "iPhone", price: "1000", brand: "apple" },
    { id: 2, name: "Samsung Galaxy a24", price: "$500", brand: "Samsung" },
    { id: 3, name: "ipad", price: "1500", brand: "apple" },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Phones Category</h1>

      <div className="mb-6">
        <PathnameDisplay />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Available Phones:
        </h2>
        <ul className="space-y-2">
          {phones.map((item) => (
            <li
              key={item.id}
              className="border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition"
            >
              <span className="text-blue-600">{item.name}</span> – {item.price}
              <span className="text-sm text-gray-500 ml-2">({item.brand})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
