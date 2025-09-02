import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/products", "routes/ProductDemo.tsx"),
    route("/milk-chocolate", "routes/MilkChocolate.tsx"),
    route("/dark-chocolate", "routes/DarkChocolate.tsx"),
    route("/white-chocolate", "routes/WhiteChocolate.tsx")
] satisfies RouteConfig;
