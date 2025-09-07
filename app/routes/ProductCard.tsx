import type React from 'react';
import type { Product } from '~/types/types';

export const ProductCard = ({ p }: { p: Product; }) => {
  console.log(p.Id);
  return <li key={p.Id}>
    <h3>{p.Name}</h3>
    <img
      src='/veganlargeheart.jpg'
      alt={p.Name}
      className="max-h-10 w-auto md:max-h-12 lg:max-h-24 transition-all duration-200" />
    <p>{p.Price}€</p>
    <p>From: {p.Manufacturer}</p>
    <p>{p.Description}</p>
  </li>;
};
