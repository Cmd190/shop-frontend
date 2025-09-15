import React, { useState } from 'react'
import { useLoaderData } from 'react-router'
import type { Product } from '~/types/types'

export default function Searchbar() {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filteredItems, setFilteredItems] = useState<Product[]>([])

    const searchProducts = () => {
        let searchResult = useLoaderData<typeof loader>()
    }

  return (
    <div>
        <input type='text' value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)}
        placeholder='search...' 
        />
        <button onClick={() => searchProducts()}>Search</button>
    </div>
  )
}
