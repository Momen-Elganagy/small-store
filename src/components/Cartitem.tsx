import React from "react";

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  onQuantityChange: (id: number, amount: number) => void;
  onRemove: (id: number) => void;
}

export default function Cartitem({
  id,
  title,
  price,
  image,
  quantity,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center bg-white rounded-lg shadow p-4">
      <img
        src={image}
        alt={title}
        className="w-20 h-20 object-contain rounded mr-4 border"
      />
      <div className="flex-1">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-green-700 font-bold">${price}</p>
        <div className="flex items-center mt-2">
          <button
            className="px-2 py-1 bg-blue-700 text-white rounded-l hover:bg-blue-800"
            onClick={() => onQuantityChange(id, -1)}
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            className="px-2 py-1 bg-blue-700 text-white rounded-r hover:bg-blue-800"
            onClick={() => onQuantityChange(id, 1)}
          >
            +
          </button>
        </div>
      </div>
      <button
        className="ml-4 text-red-600 hover:underline"
        onClick={() => onRemove(id)}
      >
        Remove
      </button>
    </div>
  );
}
