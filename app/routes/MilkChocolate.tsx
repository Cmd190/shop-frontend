import { fetchProductsByCategory } from '~/ApiHelper';
import type { Product } from '../types/types';
import type { Route } from './+types/MilkChocolate';
import ProductGallery from '~/components/ProductGallery';

const caption = 'Milk Chocolate Products'
const subcaption = 'Delicious milk chocolate. Many many really delicious products'

export const clientLoader = async ({params}: Route.ClientLoaderArgs) : Promise<Product[] | null> => {
    return fetchProductsByCategory('milk chocolate')
}

 const MilkChocolate = ({loaderData} : Route.ComponentProps ) => {

    return (
      <ProductGallery products={loaderData} caption={caption} subcaption={subcaption} />
    )
}

export default MilkChocolate



