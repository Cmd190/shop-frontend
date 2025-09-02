import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
  <>
    <h2>Chocolate Shop with heart</h2>
    <nav>
        <a href="/milk-chocolate">Milk Chocolate</a>
        <a href="/dark-chocolate">Dark Chocolate</a>
        <a href="/white-chocolate">White Chocolate</a>
    </nav>
  </>);
}
