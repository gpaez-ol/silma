export const productTypes = ["book", "sticker", "stickerPack"] as const;
export type ProductType = typeof productTypes[number];

export const productStatus = ["valid", "discontinued"] as const;
export type ProductStatus = typeof productStatus[number];
