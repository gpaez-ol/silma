import Joi from "joi";
import { longText } from "utils";

export type StockMovementCreate = {
    productId:string;
    amount:number;
    notes?: string;
    prevLocationId?:string;
    locationId: string;
};
export type ProductStockMovementItem = {
    id: string;
    locationId:string;
    movedAt:Date,
    amount:number;
    notes:string;
    locationName:string;
  };

export const StockMovementCreateSchema = Joi.object<StockMovementCreate>({
    notes: Joi.string().optional().max(longText).label("Notes"),
    productId: Joi.string().required().label("Product Id"),
    prevLocationId: Joi.string().required().label("Previous Location"),
    locationId: Joi.string().required().label("Location"),
    amount: Joi.number().positive().required().label("Amount")
  });