import { APIGatewayProxyHandler } from "aws-lambda";
import { connectToDatabase } from "database/sequelize";
import { successResponse } from "utils";

export const createDatabase: APIGatewayProxyHandler = async () => {
  await connectToDatabase(true);
  const response = successResponse({ data: "database created successfully" });
  return response;
};
