import { createContext } from "react";
import type { Product } from "./types";

type ShoppingContextContent = {
    cartItems: {product:Product, count:number}[],
    addItem: (item:Product, count:number) => void,
    removeItem: (item:Product, count: number) => void,
    clearCart: () => void
}

const ShoppingContext = createContext<ShoppingContextContent>({
  // fake default value
  book: { name: '' },
  changeName: () => null,
});