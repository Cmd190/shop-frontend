import React from 'react'
import { API_BASE_URL } from '~/ApiConfig';
import type { Product } from '~/types/types';
import type { Route } from './+types/ProductDetail';
import { ProductCard } from '~/components/ProductCard';


export const clientLoader = async ({params}: Route.ClientLoaderArgs) : Promise<Product | null> => {

  try {
      const url = `${API_BASE_URL}/products/${params.productLink}`;
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
            <>
            <ProductCard p={loaderData}/> 
            <p className='text-gray-700'>{loaderData.description}</p>
            </>
            
          

          
        } 
    </div>
  )
}
