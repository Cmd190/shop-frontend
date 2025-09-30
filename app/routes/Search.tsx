import React, { useState, type ReactElement } from 'react'
import { fetchProductsByCategory, fetchProductsByName, searchProducts } from '~/ApiHelper'
import type { Product } from '~/types/types'
import type { Route } from './+types/Search'
import { useSearchParams } from 'react-router'
import ProductGallery from '~/components/ProductGallery'
import SearchCheckboxArea from '~/components/SearchCheckboxArea'
import { Box, Slider } from '@mui/material'
import SearchOptionsPanel from '~/components/SearchOptionsPanel'

const defaultPageSize=20

export enum searchUrlParams{
  productName='p',
  minPrice='min',
  maxPrice='max',
  category='c',
  manufacturer='m'
} 

function extractSearchParams(search: URLSearchParams) {
  const productName = search.get(searchUrlParams.productName) ?? '' 
  const minPrice = +(search.get(searchUrlParams.minPrice) ?? '0') 
  const maxPrice = +(search.get(searchUrlParams.maxPrice) ?? '0') 
  const category = search.get(searchUrlParams.category)
  const manufacturer = search.get(searchUrlParams.manufacturer) 

  return {productName, minPrice, maxPrice, category, manufacturer}
}



export const clientLoader = async ({params, request}: Route.ClientLoaderArgs) :  Promise<Product[] | null> => {

      const url = new URL(request.url);
      const searchParams = extractSearchParams(url.searchParams)
      const searchResults = searchProducts({productName:
      searchParams.productName ?? '', 
      category:searchParams.category ?? null,
      minPrice: searchParams.minPrice ?? 0,
      maxPrice:searchParams.maxPrice ?? null,
      manufacturer:searchParams.manufacturer ?? null,
      pageSize: defaultPageSize,
       pageNumber:1})


    return searchResults
}


  const min = 0;
  const max = 100;
const caption = "Results for "
const categoryLabels = ['Milk Chocolate', 'Dark Chocolate', 'White Chocolate']
const manufacturerLabels = [
'ChocoLux',
'Sweet Bliss',
'Cocoa Delights',
'Salty Sins',
'Fruity Sweets',
'Caramel Craze',
'Dessert Dreams',
'Sweet & Salty',
'Hot Drink Co.',
'Nutty Chocolates',
'Baked Goods',
'Peanut Pals']

export const Search = ({loaderData} : Route.ComponentProps ) => {
  const [search, setSearch] = useSearchParams();
  const [categories, setCategories] = useState<string[]>([]);
  const [manufacturer, setManufacturer] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([min, max]);

  const searchParams = extractSearchParams(search)

  
  function toggleManufacturer(m: string){
    toggleSearchParam(searchUrlParams.manufacturer, m)
  } 
   function toggleCategory(c: string) {
    toggleSearchParam(searchUrlParams.category, c)
  } 

  function handlePriceRangeChanged(values:number[]){
    const newSearchParams = search
    newSearchParams.set(searchUrlParams.minPrice, values[0].toString())
    newSearchParams.set(searchUrlParams.maxPrice, values[1].toString())
    setSearch(newSearchParams)
    setPriceRange(values)
  }
  

  const toggleSearchParam = (paramName:searchUrlParams, paramValue:string ) => {
    const newSearchParams = search
    if(search.has(paramName, paramValue)){
      newSearchParams.delete(paramName, paramValue)
    }
    else{
      newSearchParams.append(paramName, paramValue)
    }

    setSearch(newSearchParams)
  }

  
    // TODO set intial value of search controls depending on url
    // TODO fix scrollbar jump when changing search url
  return (
    
     <SearchOptionsPanel
       priceRange={priceRange}
       handlePriceRangeChanged={handlePriceRangeChanged}
       toggleCategory={toggleCategory}
       toggleManufacturer={toggleManufacturer}
       categoryLabels={categoryLabels}
       manufacturerLabels={manufacturerLabels}
       />

  )
}



export default Search;


