import { Sequelize, ModelDefined } from "sequelize";
import * as pg from "pg";
import { writeToConsole } from "utils";
import {
  UserModel,
  UserCreationAttributes,
  UserAttributes,
  EntityAttributes,
} from "./models";

// Require and initialize outside of your main handler
export const sequelize = new Sequelize(
  process.env.DB_NAME ?? "silma",
  process.env.DB_USERNAME ?? "CHECK YOUR ENV VARS",
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      connectTimeout: 25000,
    },
    host: process.env.DB_HOST,
    logging: writeToConsole,
    port: Number.parseInt(process.env.DB_PORT ?? "CHECK YOUR ENV VARS", 10),
  }
);

type Connection = {
  isConnected: boolean;
};

const User = UserModel(sequelize);
type ModelStructure = {
  User: ModelDefined<UserAttributes, UserCreationAttributes>;
};
const Models: ModelStructure = {
  User,
};
const connection: Connection = { isConnected: false };
type GetPromise = (force?: boolean) => Promise<ModelStructure>;
// eslint-disable-next-line @typescript-eslint/ban-types
function createUserRelationships<S extends EntityAttributes, T extends {}>(
  entity: ModelDefined<S, T>
): void {
  // created By
  entity.belongsTo(User, {
    foreignKey: "createdBy",
    as: "userCreated",
    foreignKeyConstraint: true,
  });
  // updated By
  entity.belongsTo(User, {
    foreignKey: "updatedBy",
    as: "userUpdated",
    foreignKeyConstraint: false,
  });
  // deletedBy
  entity.belongsTo(User, {
    foreignKey: "deletedBy",
    as: "userDeleted",
    foreignKeyConstraint: false,
  });
}
export const connectToDatabase: GetPromise = async (force = false) => {
  if (connection.isConnected) {
    writeToConsole("=> Using existing connection.");
    return Models;
  }
  // User Relationships
  createUserRelationships(User);
  await sequelize.sync({ force });
  await sequelize.authenticate();
  connection.isConnected = true;
  writeToConsole("=> Created a new connection.");
  if (force == true) {
    await User.create({
      email: "admin@admin.com",
      type: "admin",
    });
  }
  return Models;
};
