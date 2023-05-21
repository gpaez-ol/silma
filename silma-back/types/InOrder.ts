import Joi from "joi";
import { ProductEntryType } from "types";
import { longText } from "utils";

export type ProductInOrder = {
  id: string;
  amount: number;
  entryType: ProductEntryType;
};
export type ProductInOrderItem = {
  title: string;
} & ProductInOrder;
export type ProductInOrderDetails = {
  id: string;
  amount: number;
  title: string;
  description: string;
};
export type InOrderCreate = {
  orderedAt: Date;
  deliveredAt?: Date;
  products: ProductInOrder[];
  notes?: string;
  locationId?: string;
};

export type InOrderItem = {
  id: string;
  orderedAt: Date;
  deliveredAt?: Date;
  products: ProductInOrderItem[];
  totalAmount: number;
};
export type InOrderDetails = {
  products: ProductInOrderDetails[];
  notes?: string;
} & Omit<InOrderItem, "products" | "id">;

export const InOrderCreateSchema = Joi.object<InOrderCreate>({
  notes: Joi.string().optional().max(longText).label("Notes"),
  orderedAt: Joi.date().required().label("Ordered At"),
  deliveredAt: Joi.date().optional().label("Delivery Date"),
  products: Joi.array().min(1).items(Joi.any()).label("Products"),
  locationId: Joi.string().optional().label("Location"),
});
