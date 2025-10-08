import { IconButton } from "@mui/material";
import React, { useContext, useState, type ReactElement } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ShoppingCartContext } from "./ShoppingCartContext";
import { ProductCard } from "./ProductCard";

type ShoppingCartOverlayProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShoppingCartOverlay = ({
  isOpen,
  setIsOpen,
}: ShoppingCartOverlayProps): ReactElement => {
  // TODO mobile width w-full sm:w-2/3 lg:w-1/3
  const [itemCount, SetItemCount] = useState(0);
  const cart = useContext(ShoppingCartContext);

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* 🧡 Slide-In Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-1/3 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-orange-900">
            Your Shopping Cart
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto h-[calc(100%-4rem)]">
          {cart?.state.items.length == 0 ? (
            <p className="text-gray-700">Your shopping cart is empty</p>
          ) : (
               
             cart?.state.items.map(item => 
            <div key={item.product.id}>
                    <p>tdsf</p>
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
                  itemCount > 0 ? SetItemCount((count) => count - 1) : ""
                }
                sx={{
                  color: "#78350f",
                  borderColor: "#d4a373",
                  minWidth: "36px",
                }}
              >
                <RemoveIcon />
              </IconButton>
            </div>
                </div>
             ) 
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartOverlay;
