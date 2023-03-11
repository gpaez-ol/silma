import { APIGatewayEvent } from "aws-lambda";
import { Meta, Pagination } from "types";

/**
 * It takes a pagination object and returns a sequelize options object
 * @param {Pagination} pagination - Pagination
 * @returns An object with two properties: limit and offset.
 */
export function getPaginationSequelizeOptions(pagination: Pagination): {
  limit: number;
  offset: number;
} {
  return {
    limit: pagination.pageSize,
    offset: pagination.page * pagination.pageSize,
  };
}

/**
 * It takes an API Gateway event object and returns a pagination object
 * @param {APIGatewayEvent} event - APIGatewayEvent - this is the event object that is passed to the
 * lambda function.
 * @returns A function that returns a Pagination object {page,pageSize}
 */
export function getPaginationQuery(event: APIGatewayEvent): Pagination {
  const { page, pageSize } = event.queryStringParameters;
  const pagination: Pagination = {
    page: Number(page ?? 0),
    pageSize: Number(pageSize ?? 10),
  };
  return pagination;
}

/**
 * It takes a pagination object and a count, and returns a meta object
 * @param {Pagination} pagination - Pagination = {page and pageSize}
 * @param {number} count - number - the total number of items in the database
 * @returns A function that returns a Meta object. {page,perPage,totalItems,totalPages}
 */
export function getMeta(pagination: Pagination, count: number): Meta {
  const meta: Meta = {
    page: pagination.page + 1,
    perPage: pagination.pageSize,
    totalItems: count,
    totalPages: Math.ceil(count / pagination.pageSize),
  };
  return meta;
}
