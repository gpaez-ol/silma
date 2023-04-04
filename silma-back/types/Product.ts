export const productTypes = ["libro", "sticker", "separador"] as const;
export type ProductType = typeof productTypes[number];

export const productStatus = ["activo", "inactivo"] as const;
export type ProductStatus = typeof productStatus[number];

export const productGender = ["aventura", "ficción", "fantasia"] as const;
export type ProductGender = typeof productGender[number];

export const productFormat = ["pasta blanda", "pasta dura", "ebook"] as const;
export type ProductFormat = typeof productFormat[number];