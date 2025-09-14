import type React from "react";
import type { Product } from "~/types/types";

export const ProductCard = ({ p }: { p: Product }) => (
  
  <li className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105 duration-300">
    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{p.name}</h3>
    <img
      src="/veganlargeheart.jpg"
      alt={p.name}
      className="rounded-lg max-h-10 w-auto md:max-h-12 lg:max-h-24 transition-all duration-200"
    />
    <p className="text-xl font-medium text-emerald-600 mb-2">
      {p.price.toFixed(2)}€
    </p>
    {p.discount > 0 ? <p className="font-large text-bold">Sale!</p> : <></>}
    <p className="text-sm text-gray-500 mb-1">From: {p.manufacturer}</p>
  </li>
);
