import Joi from 'joi';
import { longText } from 'utils'; 

export type ProductArticleItem = {
    title: string,
    description: string,
    quantity: number,
    salesPrice: number,
    internalCode: string,
    imageUrl: string,
    status: ProductStatus,
}

export type ProductBookItem = {
    title: string,
    author: string,
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
}

export type ProductCreate = {
    title: string,
    author: string,
    type: ProductType,
    synopsis: string,
    quantity: number,
    salesPrice: number,
    authorPrice?: number,
    gender: ProductGender,
    language: ProductLanguage,
    format: ProductFormat,
    numberPages?: number,
    suggestedAges?: string,
    weight?: number,
    dimensions?: string,
    internalCode: string,
    isbn?: string,
    publicationYear?: number,
    edition?: string,
    imageUrl: string,
    status: ProductStatus,
};

export const ProductCreateSchema = Joi.object<ProductCreate>({
    quantity: Joi.number().min(0),
    salesPrice: Joi.number().min(0),
    //Atributos de libro opcionales
    authorPrice: Joi.number().optional().min(0),
    numberPages: Joi.number().optional().min(10),
    weight: Joi.number().optional().min(1),
    dimensions: Joi.string().optional(),
    suggestedAges: Joi.string().optional(),
    isbn: Joi.string().optional(),
    publicationYear: Joi.number().optional(),
    edition: Joi.string().optional()
});

export const productTypes = ["book", "sticker", "stickerPack"] as const;
export type ProductType = typeof productTypes[number];

export const productStatus = ["activo", "inactivo"] as const;
export type ProductStatus = typeof productStatus[number];

export const productGender = ["fantasía", "magia", "aventura", "suspenso", "sobrenatural","romance"] as const;
export type ProductGender = typeof productGender[number];

export const productLanguage = ["español", "inglés"] as const;
export type ProductLanguage = typeof productLanguage[number];

export const productFormat = ["pasta blanda", "pasta dura", "ebook"] as const;
export type ProductFormat = typeof productFormat[number];