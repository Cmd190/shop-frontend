import { useState } from "react";
import { NavLink } from "react-router";
import type { Product } from "../types/types";
import { ProductCard } from "./ProductCard";
import { getRoute, RouteName } from "~/routes";

// TODO how do we map different options?
type ProductGalleryProps = {
  products: Product[] | null,
  caption : string,
  subcaption: string,
};

const ProductGallery = ({ products, caption, subcaption}: ProductGalleryProps) => {
  // TODO error handling for data fetching with react router
  const [error, setError] = useState<string>("");
  return (
    <div className="p-8 font-sans bg-white dark:bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {caption}
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        {subcaption}
      </p>
      {products == null ? (
        <p>An error has occured while loading</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products &&
            products.map((p) => (
              <NavLink key={p.id} to={`${getRoute(RouteName.Products)}/${p.productLink}`}>
                <ProductCard p={p} />
              </NavLink>
            ))}
        </ul>
      )}
    </div>
  );
};

export default ProductGallery
