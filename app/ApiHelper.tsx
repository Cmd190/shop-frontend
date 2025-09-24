import type { Product } from "./types/types";

export const API_BASE_URL = "http://localhost:5212";

export const API_PRODUCT = "products";
export const fetchProductsByCategory = async (
  category: string
): Promise<Product[] | null> => {
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

type searchProductsParams = {
  pageSize: number;
  pageNumber: number;
  productName: string;
  category: string | null;
  manufacturer: string | null;
  minPrice: number;
  maxPrice: number | null;
};

//search for possible undefined
export const searchProducts = async (searchParams: searchProductsParams): Promise<Product[] | null> => {
  const {pageSize, pageNumber, productName, category, manufacturer, maxPrice, minPrice} = searchParams
  try {
    const url = `${API_BASE_URL}/${API_PRODUCT}/all?PageNumber=${pageNumber}&PageSize=${pageSize}&ProductName=${productName}
    &MinPrize=${minPrice}${productName === null ? '' : "p"}`;
    const res = await fetch(url);
    const products = await res.json();
    return products as Promise<Product[]>;
  } catch (error) {
    console.log(`Error while searching products: ${error}`);
    return null;
  }
};

export const fetchProductsByName = async (
  startsWith: string
): Promise<Product[] | null> => {
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
};
