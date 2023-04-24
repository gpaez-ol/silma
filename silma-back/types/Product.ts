import Joi from "joi";

export type ProductArticleItem = {
  title: string;
  description: string;
  quantity: number;
  salesPrice: number;
  internalCode: string;
  imageUrl: string;
  status: ProductStatus;
};

export type ProductBookItem = {
  title: string;
  author: string;
  synopsis: string;
  quantity: number;
  salesPrice: number;
  authorPrice: number;
  genre: ProductGenre;
  language: ProductLanguage;
  format: ProductFormat;
  numberPages: number;
  suggestedAges: string;
  weight: number;
  dimensions: string;
  internalCode: string;
  isbn: string;
  publicationYear: number;
  edition: string;
  imageUrl: string;
  status: ProductStatus;
};

export type ProductCreate = {
  title: string;
  author?: string;
  type: ProductType;
  synopsis: string;
  quantity: number;
  salesPrice: number;
  authorPrice?: number;
  genre?: ProductGenre;
  language?: ProductLanguage;
  format?: ProductFormat;
  numberPages?: number;
  suggestedAges?: string;
  weight?: number;
  dimensions?: string;
  internalCode: string;
  isbn?: string;
  publicationYear?: number;
  edition?: string;
  imageUrl: string;
  status: ProductStatus;
};

export const ProductCreateSchema = Joi.object<ProductCreate>({
  quantity: Joi.number().min(0),
  salesPrice: Joi.number().min(0),
  title:Joi.string(),
  type: Joi.string(),
  synopsis: Joi.string(),
  imageUrl: Joi.string(),
  internalCode: Joi.string(),
  status: Joi.string(),
  //Atributos de libro opcionales
  authorPrice: Joi.number().optional().allow(null).min(0),
  numberPages: Joi.number().optional().allow(null).min(0),
  weight: Joi.number().optional().allow(null).min(1),
  dimensions: Joi.string().optional().allow(null),
  suggestedAges: Joi.string().optional().allow(null),
  isbn: Joi.string().optional().allow(null),
  publicationYear: Joi.number().optional().allow(null),
  edition: Joi.string().optional().allow(null),
  author: Joi.string().optional().allow(null),
  format: Joi.string().optional().allow(null),
  genre: Joi.string().optional().allow(null),
  language: Joi.string().optional().allow(null),
});

export const productTypes = ["book", "article"] as const;
export type ProductType = typeof productTypes[number];

export const productStatus = ["activo", "inactivo"] as const;
export type ProductStatus = typeof productStatus[number];

export const productGenre = [
  "fantasía",
  "magia",
  "aventura",
  "suspenso",
  "sobrenatural",
  "romance", 
  null
] as const;
export type ProductGenre = typeof productGenre[number];

export const productLanguage = ["español", "inglés", null] as const;
export type ProductLanguage = typeof productLanguage[number];

export const productFormat = ["pasta blanda", "pasta dura", "ebook", null] as const;
export type ProductFormat = typeof productFormat[number];
