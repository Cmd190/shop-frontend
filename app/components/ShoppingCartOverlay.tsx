import { Button, IconButton } from "@mui/material";
import React, { useContext, useState, type ReactElement } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ShoppingCartContext, type CartItem } from "./ShoppingCartContext";
import { ProductCard } from "./ProductCard";
import type { Product } from "~/types/types";
import ShoppingCartItem from "./ShoppingCartItem";

type ShoppingCartOverlayProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShoppingCartOverlay = ({
  isOpen,
  setIsOpen,
}: ShoppingCartOverlayProps): ReactElement => {
  // TODO mobile width w-full sm:w-2/3 lg:w-1/3
  const cart = useContext(ShoppingCartContext);
  const handleShoppingItemIncrease = (item: CartItem) =>
    cart?.updateQuantity(item.product.id, item.quantity + 1);

  const removeItem = (item:CartItem) =>{
    console.log(`remove item ${item.product.name} with id ${item.product.id}`)
  cart?.removeItem(item.product.id)
  console.log('item removed')
  }


  const reduceItemCount = (item: CartItem) => {
    if (item.quantity > 1) {
      cart?.updateQuantity(item.product.id, item.quantity - 1);
    }
  };

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-grey-100 bg-opacity-50 z-40"
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
            <ul className="grid grid-cols-1 gap-8 h-[calc(100%-8rem)] overflow-y-auto">
              {cart?.state.items.map((item) => (
                <ShoppingCartItem
                  key={item.product.id}
                  item={item}
                  handleIncreaseCount={handleShoppingItemIncrease}
                  handleDecreaseCount={reduceItemCount}
                  handleRemoveItem={removeItem}
                />
              ))}
            </ul>
          )}
          <div className=" absolute bottom-0 left-0 w-full border-t border-gray-200 bg-white flex flex-col items-center px-6 py-4  ">
            <span className="text-gray-500 font-bold text-lg">
              Total: {cart?.state.total.toFixed(2)}€{" "}
            </span>
            <div className="flex flex-row gap-12 mt-6">
            <Button>Buy Now</Button>
            <Button
            variant="contained"
            onClick={() => cart?.clearCart()}
            sx={{
              color: "#cb3300ff",
              backgroundColor: "white",
              borderColor: "#e8dfd6ff",
              minWidth: "36px",
            }}
          >
            Clear cart
          </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartOverlay;
