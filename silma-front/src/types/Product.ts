export const productTypes = ["book", "article"] as const;
export type ProductType = (typeof productTypes)[number];
export type CurrentProductStockItem = {
  productId:string;
  productName:string;
  locationId:string;
  bodegaTotal:number;
  pisoTotal:number;
  internalCode:string;
}
export type CurrentStockResponse = {
  data: CurrentProductStockItem[];
}
