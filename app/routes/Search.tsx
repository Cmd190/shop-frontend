import React from 'react'
import { fetchProductsByCategory, fetchProductsByName, searchProducts } from '~/ApiHelper'
import type { Product } from '~/types/types'
import type { Route } from './+types/Search'
import { useSearchParams } from 'react-router'
import ProductGallery from '~/components/ProductGallery'
import type { A } from 'node_modules/react-router/dist/development/route-data-CqEmXQub.mjs'

const defaultPageSize=20

export enum searchUrlParams{
  productName='p',
  minPrice='minPrice',
  maxPrice='maxPrice',
  category='c',
  manufacturer='manufacturer'
} 

function extractSearchParams(search: URLSearchParams) {
  const productName = search.get(searchUrlParams.productName) ?? '' 
  const minPrice = +(search.get(searchUrlParams.minPrice) ?? '0') 
  const maxPrice = +(search.get(searchUrlParams.maxPrice) ?? '0') 
  const category = search.get(searchUrlParams.category)
  const manufacturer = search.get(searchUrlParams.manufacturer) 

  return {productName, minPrice, maxPrice, category, manufacturer}
}


export const clientLoader = async ({params}: Route.ClientLoaderArgs) : Promise<Product[] | null> => {
    // const url = new URL(params.url);
    // TODO implement search controls
    // TODO replace + with whitespace again
    //  setSearch({ title: event.target.value });
    
    return searchProducts({productName:
      params.product ?? '', 
      category:params.category ?? null,
      minPrice:0,
      maxPrice:null,
      manufacturer:null,
      pageSize: defaultPageSize,
       pageNumber:1})
}

const caption = "Results for "
export const Search = ({loaderData} : Route.ComponentProps ) => {
  const [search, setSearch] = useSearchParams();

  return (
         <ProductGallery products={loaderData} caption={`${caption}`} subcaption={''} />

  )
}


export default Search;

