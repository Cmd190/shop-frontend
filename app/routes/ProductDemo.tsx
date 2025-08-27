import React from 'react'
import type { LoaderFunctionArgs } from 'react-router';
import { API_BASE_URL } from '~/ApiConfig';
import type { Route } from './+types/ProductDemo';



interface Product {
  Id: number,
  Name: string,
  description: string,
  category: string,
  price: number

}

export const clientLoader = async ({params}: Route.ClientLoaderArgs) : Promise<Product> => {
       const url = `${API_BASE_URL}/products/0`;
        console.log(url)
        const res = await fetch(url);
        const forecast = await res.json();
        return forecast;
}

    
export const Product = ({loaderData} : Route.ComponentProps ) => {
  return (
    <div>
       <h2>Products </h2> 
       <ul>
           <li>
              <p>{loaderData.Name} : {loaderData.price} Euro</p>
              <p>{loaderData.description}</p>
              <p>In: {loaderData.category}</p>
            </li>
       </ul>
     
    </div>
  )
}

export default Product