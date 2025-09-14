import React from 'react'
import type { Route } from './+types/WhiteChocolate'
import { fetchProductsByCategory } from '~/ApiHelper'
import ProductGallery from '~/components/ProductGallery'
import type { Product } from '~/types/types'

const caption = 'White chocolate products'
const subcaption = 'It\'s white chocolate'

export const clientLoader = async ({params}: Route.ClientLoaderArgs) : Promise<Product[] | null> => {
    return fetchProductsByCategory('white chocolate')
}

 const WhiteChocolate = ({loaderData} : Route.ComponentProps ) => {

    return (
      <ProductGallery products={loaderData} caption={caption} subcaption={subcaption} />
    )
}

export default WhiteChocolate
