import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { LocationAttributes } from "database/models";
import { connectToDatabase } from "database/sequelize";
import { SilmaAPIFunction, silmaAPIhandler } from "lib/handler/handler";
