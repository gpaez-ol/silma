import Joi from "joi";
import { longText } from "utils";

export type ProductInOrder = {
  id: string;
  amount: number;
};
export type InOrderCreate = {
  deliveredAt?: Date;
  products: ProductInOrder[];
  notes?: string;
};

export const InOrderCreateSchema = Joi.object<InOrderCreate>({
  notes: Joi.string().optional().max(longText).label("Notes"),
  deliveredAt: Joi.date().optional().label("Delivery Date"),
  products: Joi.array().min(1).items(Joi.any()).label("Products"),
});
