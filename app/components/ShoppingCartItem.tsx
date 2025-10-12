import { Button, IconButton } from "@mui/material";
import React from "react";
import { ProductCard } from "./ProductCard";
import type { CartItem } from "./ShoppingCartContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type ShoppingCartItemProps = {
  item: CartItem;
  handleIncreaseCount: (item: CartItem) => void;
  handleDecreaseCount: (item: CartItem) => void;
  handleRemoveItem: (item: CartItem) => void;
};

export default function ShoppingCartItem(props: ShoppingCartItemProps) {
  const { item, handleIncreaseCount, handleDecreaseCount, handleRemoveItem } = props;
  const p = item.product;

  return (
    <li className="flex flex-col bg-white border-b border-gray-400 py-4 px-6 space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => handleRemoveItem(item)}
          className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          ×
        </button>
      </div>
      <div className="flex flex-col items-center text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{p.name}</h3>
        <img
          src="/veganlargeheart.jpg"
          alt={p.name}
          className="rounded-lg max-h-20 w-auto md:max-h-20 object-contain transition-transform duration-200"
        />
        <p className="text-xl font-medium text-emerald-600">
          {p.price.toFixed(2)}€
        </p>
      </div>

      <div className="flex items-center gap-4">
        <IconButton
          onClick={() => handleIncreaseCount(item)}
          sx={{
            color: "#78350f",
            borderColor: "#d4a373",
            minWidth: "36px",
          }}
        >
          <AddIcon />
        </IconButton>
        <span className="text-gray-500 text-sm">{item.quantity}</span>
        <IconButton
          onClick={() => handleDecreaseCount(item)}
          sx={{
            color: "#78350f",
            borderColor: "#d4a373",
            minWidth: "36px",
          }}
        >
          <RemoveIcon />
        </IconButton>
      </div>
    </li>
  );
}
