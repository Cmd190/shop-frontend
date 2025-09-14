import React from 'react'
import type { Route } from './+types/DarkChocolate'
import type { Product } from '~/types/types'
import { fetchProductsByCategory } from '~/ApiHelper'
import ProductGallery from '~/components/ProductGallery'

const caption = 'Products made of dark chocolate'
const subcaption = 'Delicious and excellently refined dark chocolate. Many many really decadent products'

export const clientLoader = async ({params}: Route.ClientLoaderArgs) : Promise<Product[] | null> => {
    return fetchProductsByCategory('dark chocolate')
}

 const DarkChocolate = ({loaderData} : Route.ComponentProps ) => {

    return (
      <ProductGallery products={loaderData} caption={caption} subcaption={subcaption} />
    )
}

export default  DarkChocolate


