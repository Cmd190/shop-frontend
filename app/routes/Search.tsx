import React from 'react'
import { fetchProductsByCategory, fetchProductsByName } from '~/ApiHelper'
import type { Product } from '~/types/types'
import type { Route } from './+types/Search'
import { useSearchParams } from 'react-router'
import ProductGallery from '~/components/ProductGallery'


export const clientLoader = async ({params}: Route.ClientLoaderArgs) : Promise<Product[] | null> => {
  const [search, setSearch] = useSearchParams();
    //  setSearch({ title: event.target.value });
    //  value={search.get("title") as string}
    
    return fetchProductsByName('milk chocolate')
}

export enum searchUrlParams{
  productName='productName'
} 

export const Search = ({loaderData} : Route.ComponentProps ) => {

  return (
         <ProductGallery products={loaderData} caption={caption} subcaption={subcaption} />

  )
}


export default Search;
