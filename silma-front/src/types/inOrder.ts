export const productEntryType = ["reimpresion", "resurtido", "devolucion"];
export type ProductEntryType = (typeof productEntryType)[number];

export type ProductInOrder = {
    id: string;
    amount: number;
    entryType: ProductEntryType;
    title: string;
    author: string;
    status: string;
    internalCode: string;
    imageUrl: string;
  };
  export type ProductInOrderItem = {
    title: string;
  } & ProductInOrder;
  
  export type InOrderItem = {
    id: string;
    internalCode: string;
    orderedAt: string;
    deliveredAt?: string;
    products: ProductInOrderItem[];
    location: string;
    totalAmount: number;
  };
  export type GetInOrderResponse = {
    data: InOrderItem[];
  };