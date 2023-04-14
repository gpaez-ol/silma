import { DataTypes, ModelDefined, Optional, Sequelize } from "sequelize";
import { UserType, userTypes } from "types";
import { shortText } from "utils";
import { EntityAttributes } from "./base/entity.model";

export type UserAttributes = {
  email: string;
  type: UserType;
} & EntityAttributes;

export type UserCreationAttributes = Optional<UserAttributes, "createdBy">;

type GetModel = (
  sequelize: Sequelize
) => ModelDefined<UserAttributes, UserCreationAttributes>;

export const UserModel: GetModel = (sequelize: Sequelize) => {
  const Model: ModelDefined<UserAttributes, UserCreationAttributes> =
    sequelize.define("User", {
      email: {
        primaryKey: true,
        type: DataTypes.STRING(shortText),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        validate: {
          customValidator: (value: UserType) => {
            if (!userTypes.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: {
        type: new DataTypes.DATE(),
        allowNull: true,
      },
    });
  return Model;
};
