import React from 'react'
import { fetchProductsByCategory, fetchProductsByName } from '~/ApiHelper'
import type { Product } from '~/types/types'
import type { Route } from './+types/Search'


export const clientLoader = async ({params}: Route.ClientLoaderArgs) : Promise<Product[] | null> => {
    return fetchProductsByName('milk chocolate')
}

export default function Search() {
  return (
    <div>Search</div>
  )
}
