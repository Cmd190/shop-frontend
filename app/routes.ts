import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { createRoutesFromElements } from "react-router";
import { createBrowserRouter, Route } from "react-router-dom";

export enum RouteName{
    Home,
    MilkChocolate,
    DarkChocolate,
    WhiteChocolate,
    Products,
    Search
}

export const hostUrl = `http://localhost:5173`
export const getRoute = (name: RouteName) : string => RoutePaths[name] ?? RoutePaths[RouteName.Home]

 const RoutePaths: Record<RouteName, string> = {
  [RouteName.MilkChocolate]: "/milk-chocolate",
  [RouteName.DarkChocolate]: "/dark-chocolate",
  [RouteName.WhiteChocolate]: "/white-chocolate",
  [RouteName.Products]: "/products",
  [RouteName.Search]: "/products/search",
  [RouteName.Home]: "/home", 
};


//    productName, minPrice, maxPrice, category, manufacturer


export default [
    index("routes/home.tsx"),
    route("/products", "routes/ProductDemo.tsx"),
    route("/products/search/p=?/:product?/c=?/:category?", "routes/Search.tsx"),

    route("/products/:productLink", "routes/ProductDetail.tsx"),
    route("/milk-chocolate", "routes/MilkChocolate.tsx"),
    route("/dark-chocolate", "routes/DarkChocolate.tsx"),
    route("/white-chocolate", "routes/WhiteChocolate.tsx"),
    route("*", "routes/NoMatch.tsx")
] satisfies RouteConfig;
