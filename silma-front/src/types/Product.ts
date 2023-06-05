export const productTypes = ["book", "article"] as const;
export type ProductType = (typeof productTypes)[number];
export type CurrentProductStockItem = {
  productId: string;
  productName: string;
  locationId: string;
  bodegaTotal: number;
  pisoTotal: number;
  internalCode: string;
}

export type CurrentProductItem = {
  internalCode: string,
  title: string,
  author: string,
  synopsis: string,
  salesPrice: number,
  authorPrice: number,
  genre: string[],
  language: string,
  format: string,
  numberPages: number,
  suggestedAges: string,
  weight: number,
  dimensions: string,
  isbn: string,
  publicationYear: number,
  edition: string,
  imageUrl: string,
  status: string,
  quantity: number,
  id: string
}

export type CurrentProductResponse = {
  data: CurrentProductItem[];
}

export type CurrentStockResponse = {
  data: CurrentProductStockItem[];
}

export type ProductStockMovementItem = {
  id: string;
  locationId: string;
  movedAt: Date,
  amount: number;
  notes: string;
  locationName: string;
};

export type ProductHistoryResponse = {
  data: ProductStockMovementItem[];
}

export type ProductSelectItem = {
  id: string;
  title: string;
  type: ProductType;
}

export type ProductSelectResponse = {
  data: ProductSelectItem[];
}