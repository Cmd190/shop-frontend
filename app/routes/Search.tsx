import React, { useState } from 'react'
import { fetchProductsByCategory, fetchProductsByName, searchProducts } from '~/ApiHelper'
import type { Product } from '~/types/types'
import type { Route } from './+types/Search'
import { useSearchParams } from 'react-router'
import ProductGallery from '~/components/ProductGallery'
import SearchCheckboxControl from '~/components/SearchCheckboxControl'
import RangeSlider from '~/components/RangeSlider'

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



export const clientLoader = async ({params, request}: Route.ClientLoaderArgs) :  Promise<Product[] | null> => {
    // const url = new URL(params.url);
    // TODO implement search controls
    // TODO replace + with whitespace again
    //  setSearch({ title: event.target.value });
      const url = new URL(request.url);
      const searchParams = extractSearchParams(url.searchParams)
      const searchResults = searchProducts({productName:
      searchParams.productName ?? '', 
      category:searchParams.category ?? null,
      minPrice:0,
      maxPrice:null,
      manufacturer:null,
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
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(80);

// TODO useRef vs useState
 const handleMinPriceChanged = (newValue:number) => setMinPrice(newValue)
 const handleMaxPriceChanged = (newValue:number) => setMaxPrice(newValue)

  const searchParams = extractSearchParams(search)

  
  function toggleManufacturer(m: string): void {
    setManufacturer(prev => prev.includes(m) ? prev.filter(cat => m !== cat) : [...prev, m])
  }

  function toggleCategory(c: string): void {
    setCategories(prev => prev.includes(c) ? prev.filter(cat => c !== cat) : [...prev, c])
  }

  return (
    <div className='flex flex-col md:flex-row gap-6'>
      {/* left filter panel */}
      <aside className='w-full md:w-1/4 bg-white shadow-md p-4 rounded-xl'>
        <SearchCheckboxControl header='Categories' items={categoryLabels} toggleItem={toggleCategory} />
        <SearchCheckboxControl header='Manufacturer' items={manufacturerLabels} toggleItem={toggleManufacturer} />

        <div className='mb-6'>
          <RangeSlider 
            title='Price:'
            initialMinValue={min} 
            initialMaxValue={max}
            min={min}
            max={max}
            onMinValueChanged={handleMinPriceChanged}
            onMaxValueChanged={handleMaxPriceChanged} />
           </div>
      
      </aside>
      <ProductGallery products={loaderData} caption={`${caption}${searchParams?.productName}`} subcaption={''} />
      
    </div>


  )
}


export default Search;


