import { type RouteConfig, index, route } from "@react-router/dev/routes";

export enum RouteName{
    Home,
    MilkChocolate,
    DarkChocolate,
    WhiteChocolate,
    Products
}

export const RoutePaths = (name:RouteName) : string =>  {
    if(name === RouteName.MilkChocolate){
        return "/milk-chocolate"
    } else if(name === RouteName.DarkChocolate){
        return "/dark-chocolate"
    } else if(name === RouteName.WhiteChocolate){
        return "/white-chocolate"
    } else if(name === RouteName.Products){
        return "/products"
    } else {
        return "/home"
    }
}
   

export default [
    index("routes/home.tsx"),
    route("/products", "routes/ProductDemo.tsx"),
    // TODO why does this not work?
    // route("/products/:productLink", "routes/ProductDetail.tsx"),
    route("/milk-chocolate", "routes/MilkChocolate.tsx"),
    route("/dark-chocolate", "routes/DarkChocolate.tsx"),
    route("/white-chocolate", "routes/WhiteChocolate.tsx"),
    route("*", "routes/NoMatch.tsx")
] satisfies RouteConfig;
