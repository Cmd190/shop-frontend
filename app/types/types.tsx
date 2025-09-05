export interface Product {
  Id: number,
  ProductId: number,
  Name: string,
  Description: string,
  Categories: string[],
  Price: number,
  Discount: number,
  Manufacturer: string,
  ShipDuration: number,
  InStock: number
}
