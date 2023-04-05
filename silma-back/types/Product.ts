import Joi from 'joi';
import { longText } from 'utils'; 

export type ProductCreate = {
    title: string,
    author: string,
    type: ProductType,
    synopsis: string,
    quantity: number,
    salesPrice: number,
    authorPrice: number,
    gender: ProductGender,
    language: ProductLanguage,
    format: ProductFormat,
    numberPages: number,
    suggestedAges: string,
    weight: number,
    dimensions: string,
    internalCode: string,
    isbn: string,
    publicationYear: string,
    edition: string,
    imageUrl: string,
    status: ProductStatus,
};

export const ProductCreateSchema = Joi.object<ProductCreate>({
    quantity: Joi.number().min(0),
    salesPrice: Joi.number().min(0),
    authorPrice: Joi.number().optional().min(0),
    numberPages: Joi.number().optional().min(10),
    weight: Joi.number().optional().min(1)

    //ISBN (?): que cumpla con un patron estandar
    //Genero: que el genero sea un arreglo que puede tener de 1 a 3 valores (libro) o sea nulo (articulo)
});

export const productTypes = ["book", "sticker", "stickerPack"] as const;
export type ProductType = typeof productTypes[number];

export const productStatus = ["valid", "discontinued"] as const;
export type ProductStatus = typeof productStatus[number];
