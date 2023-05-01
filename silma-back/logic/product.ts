import { ProductAttributes } from "database/models";
import { ProductArticleItem, ProductBookItem } from "types";

//Get articulos
export const getArticlesList = (
  products: ProductAttributes[]
): ProductArticleItem[] => {
  const articles: ProductArticleItem[] = products.map((products) => {
    return {
      id: products.id,
      title: products.title,
      description: products.synopsis,
      quantity: products.quantity,
      salesPrice: products.salesPrice,
      internalCode: products.internalCode,
      imageUrl: products.imageUrl,
      status: products.status,
    };
  });
  return articles;
};

//Get libros
export const getBooksList = (
  products: ProductAttributes[]
): ProductBookItem[] => {
  const books: ProductBookItem[] = products.map((products) => {
    return {
      id: products.id,
      title: products.title,
      author: products.author,
      synopsis: products.synopsis,
      quantity: products.quantity,
      salesPrice: products.salesPrice,
      authorPrice: products.authorPrice,
      genre: products.genre,
      language: products.language,
      format: products.format,
      numberPages: products.numberPages,
      suggestedAges: products.suggestedAges,
      weight: products.weight,
      dimensions: products.dimensions,
      internalCode: products.internalCode,
      isbn: products.isbn,
      publicationYear: products.publicationYear,
      edition: products.edition,
      imageUrl: products.imageUrl,
      status: products.status,
    };
  });
  return books;
};

/**
 * This  function builds an internal code using the author's name and item number.
 * @param {string} authorName - A string representing the name of the author of a particular item.
 * @param {number} itemNumber - The itemNumber parameter is a number that represents the unique
 * identifier of an item.
 * @returns The function `buildInternalCode` returns a string that is a combination of the capital
 * letters in the `authorName` parameter and the `itemNumber` parameter, separated by a hyphen.
 */
export const buildInternalCode = (
  itemNumber: number,
  authorName: string | null
): string => {
  // TODO: Add validation for authors that have similar Names in order for the internal code to be created correctly
  const capitalLetters =
    authorName === null
      ? "ART"
      : authorName.replace(/[a-z]/g, "").replace(/\s/g, "");
  const internalCode = `${capitalLetters}-${itemNumber}`;
  return internalCode;
};
