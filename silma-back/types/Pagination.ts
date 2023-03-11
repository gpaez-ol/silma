import Joi from "joi";

/**
 * Meta is an object with four properties: totalItems, totalPages, page, and perPage.
 * @property {number} totalItems - The total number of items in the collection.
 * @property {number} totalPages - The total number of pages.
 * @property {number} page - The current page number.
 * @property {number} perPage - The number of items per page.
 */
export type Meta = {
  totalItems: number;
  totalPages: number;
  page: number;
  perPage: number;
};
/**
 * `PaginatedList` is a type that represents a list of items of type `T` with a `meta` property that
 * contains information about the list.
 * @property {T[]} list - The actual list that you want to display.
 * @property {Meta} meta - Meta{page,perPage,totalItems,currentPage}
 */
export type PaginatedList<T> = {
  list: T[];
  meta: Meta;
};
/**
 * `Pagination` is an object with a `page` property that is a number and a `pageSize` property that is
 * a number.
 * @property {number} page - The current page number.
 * @property {number} pageSize - The number of items to show per page.
 */
export type Pagination = {
  page: number;
  pageSize: number;
};

/**
 * It validates that the input object has a page and pageSize property, and that both properties are
 * positive integers.
 * @param {object} input - object - the object to validate
 * @returns The return value is an object with two properties:
 * - error: null if the validation succeeded, otherwise an object with details about the validation
 * failure.
 * - value: the value after validation.
 */
export const validateBasePagination = (input: object): Joi.ValidationResult => {
  const schema = Joi.object({
    page: Joi.number().required().min(0).integer().label("Page"),
    pageSize: Joi.number().required().min(0).integer().label("Page Size"),
  });
  return schema.validate(input);
};
