export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-4">About My Store</h1>
      <p className="text-lg text-gray-700 mb-6">
        Welcome to <span className="font-bold text-blue-700">My Store</span>! We are passionate about bringing you the best products at the best prices. Our mission is to make online shopping easy, enjoyable, and accessible for everyone.
      </p>
      <ul className="list-disc pl-6 text-gray-600 mb-6">
        <li>🛒 Wide selection of electronics, fashion, and more</li>
        <li>🚚 Fast and reliable shipping</li>
        <li>💳 Secure payment options</li>
        <li>🤝 Friendly customer support</li>
      </ul>
      <p className="text-gray-700 mb-2">
        Whether you're looking for the latest gadgets, stylish clothing, or everyday essentials, we've got you covered. Thank you for choosing us for your shopping needs!
      </p>
      <p className="text-gray-500 text-sm mt-8">&copy; {new Date().getFullYear()} My Store. All rights reserved.</p>
    </div>
  );
} 