export const productEntryType = ["reimpresión", "resurtido", "devolución"];
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
    notes: string;
    orderedAt: Date;
    deliveredAt?: Date;
    products: ProductInOrderItem[];
    location: string;
    totalAmount: number;
  };

  export type InOrderCreate ={
    orderedAt: Date;
    deliveredAt?: Date;
    notes: string,
    locationId: string,
    products: ProductInOrderCreate[],
  }

  export type GetInOrderResponse = {
    data: InOrderItem[];
  };

  export type ProductInOrderCreate = {
    id: string;
    amount: number;
    entryType: ProductEntryType;
  };
