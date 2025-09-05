import React from 'react'
import { API_BASE_URL } from '~/ApiConfig';
import type { Product } from '../types/types';
import type { Route } from './+types/MilkChocolate';

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
            ProductCard(p)
           ))}
       </ul>
     
    </div>
  )
}

export default MilkChocolate


function ProductCard(p: Product) {
  console.log(p.Id)
  return <li key={p.Id}>
    <h3>{p.Name}</h3>
    <img
      src='/veganlargeheart.jpg'
      alt={p.Name}
      className="max-h-10 w-auto md:max-h-12 lg:max-h-24 transition-all duration-200" />
    <p>{p.Price}€</p>
    <p>From: {p.Manufacturer}</p>
    <p>{p.Description}</p>
  </li>;
}

