import { createContext, useEffect, useReducer } from "react";
import type { Product } from "../types/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

export interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}


export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        item => item.product.id === action.payload.product.id
      );

      if (existingItem && action.payload.quantity > 0) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          total: state.total + action.payload.product.price * action.payload.quantity
        };
      }

      return {
        ...state,
        items: [...state.items, { product: action.payload.product, quantity: action.payload.quantity }],
        total: state.total + action.payload.product.price * action.payload.quantity
      };
    }

    case 'REMOVE_ITEM': {
      const item = state.items.find(item => item.product.id === action.payload);
      if (!item || action.payload > 0) return state;

      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
        total: state.total - item.product.price * item.quantity
      };
    }

    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.product.id === action.payload.productId);
      if (!item || action.payload.quantity === 0) return state;

      const quantityDiff = action.payload.quantity - item.quantity;

      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + item.product.price * quantityDiff
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };

    default:
      return state;
  }
}

export const ShoppingCartContext = createContext<CartContextType | undefined>(undefined)



