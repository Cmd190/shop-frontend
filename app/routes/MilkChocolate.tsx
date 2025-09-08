import React, { useState } from 'react'
import { API_BASE_URL } from '~/ApiConfig';
import type { Product } from '../types/types';
import type { Route } from './+types/MilkChocolate';
import { ProductCard } from '../components/ProductCard';

export const clientLoader = async ({params}: Route.ClientLoaderArgs) : Promise<Product[] | null> => {

  try {
     const url = `${API_BASE_URL}/products/milk chocolate`;
      const res = await fetch(url);
      const products = await res.json();
      return products as Promise<Product[]>;
    
  } catch (error) {
    console.log(`Error while fetching: ${error}`)
    return null
  }
      
}

    
 const MilkChocolate = ({loaderData} : Route.ComponentProps ) => {
 
  // TODO error handling for data fetching with react router
  const [error, setError] = useState<string>("")
  return (
    <div className='p-8 font-sans bg-white dark:bg-white min-h-screen'>
       <h2 className='text-3xl font-bold text-gray-800 mb-6'>Milk Chocolate Products </h2> 
       <p className='text-lg text-gray-600 mb-8'>Delicious milk chocolate. Many many really delicious products</p>
       {loaderData == null
       ? <p>An error has occured while loading</p>
       :   <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
           {loaderData && loaderData.map(p => (
            <ProductCard key={p.id} p={p}/>
           ))}
       </ul>
       }
     
    </div>
  )
}

export default MilkChocolate



