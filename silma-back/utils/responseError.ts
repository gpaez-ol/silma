export class ResponseError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const unauthorized = (message: string): ResponseError =>
  new ResponseError(401, message);
export const badRequest = (message: string): ResponseError =>
  new ResponseError(400, message);
export const notFound = (message: string): ResponseError =>
  new ResponseError(404, message);

export const UNAUTHORIZED = unauthorized("Unauthorized");
