export interface Product {
  id: number,
  productId: number,
  name: string,
  description: string,
  categories: string[],
  price: number,
  discount: number,
  manufacturer: string,
  shipDuration: number,
  stockCount: number,
  productLink: string
}
