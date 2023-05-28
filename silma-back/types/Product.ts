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

export type ProductSelectItem = {
  id: string;
  title: string;
  internalCode: string;
  imageUrl: string;
  type: ProductType;
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
  type: ProductType;
  synopsis: string;
  salesPrice: number;
  imageUrl: string;
  // Atributos de libro opcionales
  authorPrice?: number;
  numberPages?: number;
  weight?: number;
  dimensions?: string;
  suggestedAges?: string;
  isbn?: string;
  publicationYear?: number;
  edition?: string;
  author?: string;
  format?: ProductFormat;
  genre?: ProductGenre;
  language?: ProductLanguage;
};

export const ProductCreateSchema = Joi.object<ProductCreate>({
  salesPrice: Joi.number().min(0),
  title: Joi.string(),
  type: Joi.string(),
  synopsis: Joi.string(),
  imageUrl: Joi.string(),
  //Atributos de libro opcionales
  authorPrice: Joi.number().optional().allow(null).min(0),
  numberPages: Joi.number().optional().allow(null).min(1),
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

export type ProductUpdate = {
  id: string;
  internalCode: string;
  status: string;
  title: string;
  type: ProductType;
  synopsis: string;
  salesPrice: number;
  imageUrl: string;
  // Atributos de libro opcionales
  authorPrice?: number;
  numberPages?: number;
  weight?: number;
  dimensions?: string;
  suggestedAges?: string;
  isbn?: string;
  publicationYear?: number;
  edition?: string;
  author?: string;
  format?: ProductFormat;
  genre?: ProductGenre;
  language?: ProductLanguage;
}

export const ProductUpdateSchema = Joi.object<ProductUpdate>({
  id: Joi.string().required(),
  internalCode: Joi.string().required(),
  status: Joi.string(),
  salesPrice: Joi.number().min(0),
  title: Joi.string(),
  type: Joi.string(),
  synopsis: Joi.string(),
  imageUrl: Joi.string(),
  //Atributos de libro opcionales
  authorPrice: Joi.number().optional().allow(null).min(0),
  numberPages: Joi.number().optional().allow(null).min(1),
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
})

export const productTypes = ["book", "article"] as const;
export type ProductType = (typeof productTypes)[number];

export const productStatus = ["activo", "inactivo"] as const;
export type ProductStatus = (typeof productStatus)[number];

export const productGenre = [
  "fantasía",
  "magia",
  "aventura",
  "suspenso",
  "sobrenatural",
  "romance",
  null,
] as const;
export type ProductGenre = (typeof productGenre)[number];

export const productLanguage = ["español", "inglés", null] as const;
export type ProductLanguage = (typeof productLanguage)[number];

export const productFormat = [
  "pasta blanda",
  "pasta dura",
  "ebook",
  null,
] as const;
export type ProductFormat = (typeof productFormat)[number];

export const productEntryType = ["reimpresión", "resurtido", "devolución"];
export type ProductEntryType = (typeof productEntryType)[number];
