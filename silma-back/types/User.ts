import Joi from "joi";
import { longText } from "utils";

export const userTypes = ["user", "admin"] as const;
export type UserType = typeof userTypes[number];

export type UserLogin = {
  email: string;
  password: string;
};

export const UserLoginSchema = Joi.object<UserLogin>({
  email: Joi.string().required().max(longText).label("Email"),
  password: Joi.string().required().max(longText).label("Password"),
});
