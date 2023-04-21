import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { connectToDatabase } from "database/sequelize";
import { SilmaAPIFunction, silmaAPIhandler } from "lib/handler/handler";
import { UserLogin, UserLoginSchema } from "types";
import { badRequest, writeToConsole } from "utils";
import bcrypt from "bcryptjs";

const loginFunction: SilmaAPIFunction = async (event: APIGatewayEvent) => {
  const data: UserLogin = JSON.parse(event.body);
  const { error } = UserLoginSchema.validate(data);
  if (error) {
    writeToConsole(error.message);
    throw badRequest(error.message);
  }
  const db = await connectToDatabase();
  const { User } = db;
  const rawUser = await User.findOne({
    where: { deletedAt: null, email: data.email },
  });
  if (rawUser === undefined || rawUser === null) {
    throw badRequest("User does not exist");
  }
  const user = rawUser.get({ plain: true });
  const passwordIsSame = await bcrypt.compare(data.password, user.password);
  if (!passwordIsSame) {
    throw badRequest("Wrong password");
  }
  return { data: user };
};

export const login: APIGatewayProxyHandler = silmaAPIhandler(loginFunction);
