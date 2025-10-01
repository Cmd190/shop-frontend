import { fetchProductsByCategory } from "~/ApiHelper";
import ProductGallery from "~/components/ProductGallery";
import type { Product } from "~/types/types";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chocolate shop" },
    { name: "description", content: "Welcome to the chocolate shop with heart" },
  ];
}

const caption = 'Delicious chocolate '
const subcaption = 'Manufactured chocolate made with a lot of love to provide the finest quality'

export const clientLoader = async ({params}: Route.ClientLoaderArgs) : Promise<Product[]> => {
    return Promise.all([
      fetchProductsByCategory('dark chocolate'),
      fetchProductsByCategory('milk chocolate'),
      fetchProductsByCategory('white chocolate')])
      .then(res => res.flatMap(r => r ?? [])) 
}



export default function Home({loaderData} : Route.ComponentProps ) {
  return (
  <>
    <ProductGallery products={loaderData} caption={caption} subcaption={subcaption} />
  </>);
}
