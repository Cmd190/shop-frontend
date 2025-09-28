import React, { useState } from 'react'
import { NavLink, useLoaderData, useSearchParams } from 'react-router'
import { getRoute, RouteName } from '~/routes';
import { searchUrlParams } from '~/routes/Search';
import type { Product } from '~/types/types'

export default function Searchbar() {
  const [search, setSearch] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>('')
      
     const createSearchParameter = (term : string) : string => term.toLowerCase().replace(' ', '+')
  
    return (
      <div className='flex items-center gap-2 w-full max-w-md mx-auto'>
        <input 
          type='text' 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder='search'
          className='flex-1 px-4 py-1 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-800 transition'
           />
           <NavLink to={`${getRoute(RouteName.Search)}?${searchUrlParams.productName}=${createSearchParameter(searchTerm)}`}>
              <button
        className='px-4 py-1 bg-orange-900 text-white font-medium rounded-xl hover:bg-orange-800 active:scale-95 transition'
         >Search</button>

           </NavLink>
        
      </div>
    )
}
