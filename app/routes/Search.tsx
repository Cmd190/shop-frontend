import React, { useState } from 'react'
import { fetchProductsByCategory, fetchProductsByName, searchProducts } from '~/ApiHelper'
import type { Product } from '~/types/types'
import type { Route } from './+types/Search'
import { useSearchParams } from 'react-router'
import ProductGallery from '~/components/ProductGallery'
import SearchCheckboxControl from '~/components/SearchCheckboxControl'
import { Box, Slider } from '@mui/material'

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
    // setManufacturer(prev => prev.includes(m) ? prev.filter(cat => m !== cat) : [...prev, m])
   function toggleCategory(c: string) {
    // setCategories(prev => prev.includes(c) ? prev.filter(cat => c !== cat) : [...prev, c])
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
    <div className='flex flex-col md:flex-row gap-6'>
      {/* left filter panel */}
      <aside className='w-full md:w-1/4 bg-white dark:bg-white shadow-md p-4 rounded-xl'>
        

        <div className='mb-6 ml-2'>
          <h3 className="font-medium mb-10 text-gray-800">Price (€):</h3>
          <Box sx={{ width: 300 }}>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={priceRange}
              onChange={(_, newValue) => handlePriceRangeChanged(newValue)}
              valueLabelDisplay="on"
              getAriaValueText={(value) => `${value}€`}
             />
          </Box>
        </div> 
        <SearchCheckboxControl header='Categories' items={categoryLabels} toggleItem={toggleCategory} />
        <SearchCheckboxControl header='Manufacturer' items={manufacturerLabels} toggleItem={toggleManufacturer} />
      
      </aside>
      <ProductGallery products={loaderData} caption={`${caption}${searchParams?.productName}`} subcaption={''} />
      
    </div>


  )
}


export default Search;


