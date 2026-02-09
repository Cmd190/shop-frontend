import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import { msalInstance } from "./root";
import type { Product } from "./types/types";
import { loginRequest, apiConfig } from "./authConfig";

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

enum API_Params{
  pageNumber='PageNumber',
  pageSize='PageSize',
  minPrice='MinPrice',
  maxPrice='MaxPrice',
  productName='ProductName',
  category='Categories',
  manufacturer='Manufacturers'

}

type searchProductsParams = {
  pageSize: number;
  pageNumber: number;
  productName: string;
  category: string | null;
  manufacturer: string | null;
  minPrice: number;
  maxPrice: number | null;
};

export type ApiResponse<T> = {
  data: T | null;
  status: number;
  ok: boolean;
}

// TODO would be cleaner but we can't use them in a function
const fetchWithAuth = async(url:string) : Promise<any> => {
  await msalInstance.initialize()
  const account = msalInstance.getActiveAccount();
    if (!account) {
        throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
    }
    const clientId = apiConfig.auth.clientId;
    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
        scopes: [
                  `api://${clientId}/${apiConfig.auth.readScope}`
                 
        ]
    });

    const headers = new Headers();
    const bearer = `Bearer ${response.accessToken}`;

    headers.append("Authorization", bearer);
      const options = {
        method: "GET",
        headers: headers
    };

    return fetch(url, options)

    
}

//search for possible undefined
export const searchProducts = async (searchParams: searchProductsParams): Promise<ApiResponse<Product[]>> => {
  const {pageSize, pageNumber, productName, category, manufacturer, maxPrice, minPrice} = searchParams
  try {
    const url = `${API_BASE_URL}/${API_PRODUCT}/all?` +
    `${API_Params.pageNumber}=${pageNumber}` +
    `&${API_Params.pageSize}=${pageSize}` +
    `&${API_Params.minPrice}=${minPrice}` +
    (productName ? `&${API_Params.productName}=${encodeURIComponent(productName)}` : '') +
    (maxPrice ? `&${API_Params.maxPrice}=${maxPrice}` : '' ) +
    (category ? `&${API_Params.category}=${encodeURIComponent(category)}` : '') +
    (manufacturer ? `&${API_Params.manufacturer}=${encodeURIComponent(manufacturer)}` : '') 

    console.log('Search triggered. Calling API with: ' + url)
    
    const res = await fetchWithAuth(url);
    const response = await res;
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    return {
      data,
      status: response.status,
      ok: response.ok
    };
    
  } catch (error) {
    console.log(`Error while searching products: ${error}`);
    return {
      data: null,
      ok: false,
      status: 500
    };
  }
};

export const fetchProductsByName = async (
  startsWith: string
): Promise<Product[] | null> => {
  try {
    const url = `${API_BASE_URL}/${API_PRODUCT}/startsWith=${startsWith}`;
    const res = await fetch(url);
    const products = await res.json();
    return products as Promise<Product[]>;
  } catch (error) {
    console.log(`Error while fetching: ${error}`);
    return null;
  }
};
