import Joi from "joi";
import { longText } from "utils";

export type ProductInOrder = {
  id: string;
  amount: number;
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
};

export type InOrderItem = {
  orderedAt: Date;
  deliveredAt?: Date;
  products: ProductInOrderItem[];
};
export type InOrderDetails = { products: ProductInOrderDetails[] } & Omit<
  InOrderItem,
  "products"
>;

export const InOrderCreateSchema = Joi.object<InOrderCreate>({
  notes: Joi.string().optional().max(longText).label("Notes"),
  orderedAt: Joi.date().required().label("Ordered At"),
  deliveredAt: Joi.date().optional().label("Delivery Date"),
  products: Joi.array().min(1).items(Joi.any()).label("Products"),
});
