import { useEffect, useReducer } from "react";
import type { Product } from "~/types/types";
import { cartReducer, ShoppingCartContext } from "./ShoppingCartContext";

export function ShoppingCartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 }, () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
    }
    return { items: [], total: 0 };
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };


  return (
    <ShoppingCartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}