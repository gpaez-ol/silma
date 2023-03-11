import { APIGatewayProxyResult } from "aws-lambda";
import { PaginatedList, Response } from "types";

/**
 * "If the value is null, return undefined, otherwise return the value."
 *
 * The replacer function is passed to JSON.stringify() as the second argument
 * @param _k - The key of the current property being processed.
 * @param v - The value to be stringified.
 */
//TODO: Remove this Any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const replacer = (_k: any, v: any) => (v === null ? undefined : v);

/**
 * It returns an APIGatewayProxyResult object with a status code of 200 and a body of the object passed
 * in
 * @param {object} [body] - The body of the response.
 * @returns A function that returns an object of type APIGatewayProxyResult
 */
export function successResponse<T>(
  body?: Response<T> | PaginatedList<T>
): APIGatewayProxyResult {
  const response: APIGatewayProxyResult = {
    body:
      body !== null || body !== undefined ? JSON.stringify(body, replacer) : "",
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
  return response;
}
/**
 * It takes an error object and returns an APIGatewayProxyResult object with the error object as the
 * body, a status code of 500, and the Access-Control-Allow-Origin header set to *
 * @param {object} error - object - The error object that you want to return to the client.
 * @returns A function that returns an object.
 */
export function errorResponse<T>(
  error: T,
  statusCode?: number
): APIGatewayProxyResult {
  const response: APIGatewayProxyResult = {
    body: JSON.stringify(error, replacer),
    statusCode: statusCode ?? 500,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  return response;
}
