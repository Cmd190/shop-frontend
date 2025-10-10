import { Button, IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import type { Product } from "~/types/types";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { ShoppingCartContext } from "./ShoppingCartContext";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h2>
          {error.status} {error.statusText}
        </h2>
        <p>{error.data}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Something went wrong</h2>
      <pre>{(error as Error)?.message}</pre>
    </div>
  );
}

interface ProductDetailProps {
  p: Product;
}

export const ProductDetailCard: React.FC<ProductDetailProps> = ({ p }) => {
  const price =
    p.discount > p.price - p.price * (p.discount / 100) ? 0 : p.price;

  const [itemCount, SetItemCount] = useState<number>(1);
  const cart = useContext(ShoppingCartContext);

  return (
    <div className="max-w-5xl x-auto p-6 bg-white shadow-xl rounded-2xl">
      {/* // Image and info right of the image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <img
            src="/veganlargeheart.jpg"
            alt={p.name}
            className="rounded-xl max-h-[300px] object-cover"
          />
        </div>
        {/* right side content */}
        <div className="flex flex-col space-y-4 justify-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{p.name}</h2>
            <p className="text-gray-500 text-sm">
              By <span className="font-semibold">{p.manufacturer}</span>
            </p>
          </div>
          {/* //categories */}
          <div className="flex flex-wrap gap-2">
            {p.categories.map((c) => (
              <span
                key={c}
                className="bg-gray-200 text-gray-700 px-3 py-1 text-xs rounded-full"
              >
                {c}
              </span>
            ))}
          </div>
          {/* //price */}
          <div className="flex items-center space-x-3">
            {p.discount > 0 && <span>{p.price.toFixed(2)}€</span>}
            <span className="text-2xl font-bold text-green-600">
              {price.toFixed(2)}€
            </span>
            {p.discount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                -{p.discount}%
              </span>
            )}
          </div>
          <p
            className={`text-sm font-semibold 
                ${p.stockCount > 0 ? "text-green-600" : "text-red-500"}`}
          >
            {p.stockCount > 0 ? "Available" : "Out of stock"}
          </p>
          <p className="text-gray-500 text-sm">
            Ships in {p.shipDuration} days
          </p>
          <div className="flex items-center gap-4">
            <IconButton
              onClick={() => SetItemCount((count) => count + 1)}
              sx={{
                color: "#78350f",
                borderColor: "#d4a373",
                minWidth: "36px",
              }}
            >
              <AddIcon />
            </IconButton>
            <span className="text-gray-500 text-sm">{itemCount}</span>
            <IconButton
              onClick={() =>
                itemCount > 1 ? SetItemCount((count) => count - 1) : ""
              }
              sx={{
                color: "#78350f",
                borderColor: "#d4a373",
                minWidth: "36px",
              }}
            >
              <RemoveIcon />
            </IconButton>

            <Button
              variant="contained"
              endIcon={<AddShoppingCartIcon />}
              onClick={() => cart?.addItem(p, itemCount)}
              disabled={itemCount == 0}
              sx={{
                color: "#78350f",
                backgroundColor: "white",
                borderColor: "#d4a373",
                minWidth: "36px",
              }}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-10">
        <p className="text-gray-700 space-y-4">{p.description}</p>
      </div>
    </div>
  );
};
