import Joi from 'joi';
import { longText } from 'utils'; 

export type ProductCreate = {
    createdAt?: Date;
};

export const ProductCreateSchema = Joi.object<ProductCreate>({
    createdAt: Joi.date().optional().label("Creation date"),
});

export const productTypes = ["book", "sticker", "stickerPack"] as const;
export type ProductType = typeof productTypes[number];

export const productStatus = ["valid", "discontinued"] as const;
export type ProductStatus = typeof productStatus[number];
