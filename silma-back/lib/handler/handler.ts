import { APIGatewayProxyHandler } from "aws-lambda";
import {
  errorLogger,
  errorResponse,
  ResponseError,
  successResponse,
} from "utils";

export type SilmaAPIFunction = (
  ...args: Parameters<APIGatewayProxyHandler>
) =>
  | Promise<Parameters<typeof successResponse>[0]>
  | Parameters<typeof successResponse>[0]
  | Promise<void>
  | void;

export const silmaAPIhandler =
  (handler: SilmaAPIFunction): APIGatewayProxyHandler =>
  async (event, context, callback) => {
    try {
      const result = await handler(event, context, callback);
      if (!result) {
        return successResponse();
      }
      return successResponse(result);
    } catch (err) {
      if (err instanceof ResponseError) {
        const error = errorResponse({ error: err.message }, err.statusCode);
        return error;
      }
      errorLogger(err);
      const error = errorResponse({ error: "Something went wrong" }, 500);
      return error;
    }
  };
