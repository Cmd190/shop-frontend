import React from 'react'
import { API_BASE_URL, API_PRODUCT } from '~/ApiHelper';
import type { Product } from '~/types/types';
import type { Route } from './+types/ProductDetail';
import { ProductDetailCard } from '~/components/ProductDetailCard';


export const clientLoader = async ({params}: Route.ClientLoaderArgs) : Promise<Product | null> => {

  try {
      const url = `${API_BASE_URL}/${API_PRODUCT}?name=${params.productLink}`;
      const res = await fetch(url);
      const products = await res.json();
      return products as Promise<Product>;
    
  } catch (error) {
    console.log(`Error while fetching: ${error}`)
    return null
  }
      
}

export const ProductDetail = ({loaderData} : Route.ComponentProps ) =>   {
  return (
    <div>
        {
          loaderData == null 
          ? <p>Product not found</p>
          : 
            <ProductDetailCard p={loaderData} /> 
        } 
    </div>
  )
}

export default ProductDetail
