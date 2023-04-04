export const productTypes = ["libro", "calcomanía", "separador", "postal", "llavero", "pulsera", "chibi-silma", "tarjetas de presentación"] as const;
export type ProductType = typeof productTypes[number];

export const productStatus = ["activo", "inactivo"] as const;
export type ProductStatus = typeof productStatus[number];

export const productGender = ["fantasía", "magia", "aventura", "suspenso", "sobrenatural","romance"] as const;
export type ProductGender = typeof productGender[number];

export const productLanguage = ["español", "inglés"] as const;
export type ProductLanguage = typeof productLanguage[number];

export const productFormat = ["pasta blanda", "pasta dura", "ebook"] as const;
export type ProductFormat = typeof productFormat[number];