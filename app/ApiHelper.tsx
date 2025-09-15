import type { Product } from "./types/types";

export const API_BASE_URL= 'http://localhost:5212';

export const API_PRODUCT = 'products';
export const fetchProductsByCategory = async (category: string): Promise<Product[] | null> => {

  try {
    const url = `${API_BASE_URL}/${API_PRODUCT}/${category}`;
    const res = await fetch(url);
    const products = await res.json();
    return products as Promise<Product[]>;

  } catch (error) {
    console.log(`Error while fetching: ${error}`);
    return null;
  }
};

export const fetchProductsByName = async (startsWith: string) : Promise<Product[] | null> => {
  try {
    // TODO implement search API
    const url = `${API_BASE_URL}/${API_PRODUCT}/startsWith=${startsWith}`;
    const res = await fetch(url);
    const products = await res.json();
    return products as Promise<Product[]>;

  } catch (error) {
    console.log(`Error while fetching: ${error}`);
    return null;
  }
}
