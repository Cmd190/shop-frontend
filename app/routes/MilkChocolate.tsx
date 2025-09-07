import React from 'react'
import { API_BASE_URL } from '~/ApiConfig';
import type { Product } from '../types/types';
import type { Route } from './+types/MilkChocolate';
import { ProductCard } from './ProductCard';

export const clientLoader = async ({params}: Route.ClientLoaderArgs) : Promise<Product[]> => {
       const url = `${API_BASE_URL}/products/milk chocolate`;
        const res = await fetch(url);
        const products = await res.json();
        return products as Promise<Product[]>;
}

    
 const MilkChocolate = ({loaderData} : Route.ComponentProps ) => {
  console.log("loader data:")
  console.log(loaderData)
  return (
    <div className=''>
       <h2>Products </h2> 
       <p>Delicious milk chocolate. Many many really delicious products</p>
       <ul>
           {loaderData.map(p => (
            ProductCard({ p })
           ))}
       </ul>
     
    </div>
  )
}

export default MilkChocolate



