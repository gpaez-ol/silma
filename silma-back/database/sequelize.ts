import { Sequelize, ModelDefined } from "sequelize";
import * as pg from "pg";
import { writeToConsole } from "utils";
import {
  UserModel,
  UserCreationAttributes,
  UserAttributes,
  EntityAttributes,
  ProductAttributes,
  ProductCreationAttributes,
  ProductModel,
  InOrderAttributes,
  InOrderCreationAttributes,
  InOrderModel,
  ProductInOrderAttributes,
  ProductInOrderModel,
  ProductInOrderCreationAttributes,
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
const Product = ProductModel(sequelize);
const InOrder = InOrderModel(sequelize);
const ProductInOrder = ProductInOrderModel(sequelize);
type ModelStructure = {
  User: ModelDefined<UserAttributes, UserCreationAttributes>;
  Product: ModelDefined<ProductAttributes, ProductCreationAttributes>;
  InOrder: ModelDefined<InOrderAttributes, InOrderCreationAttributes>;
  ProductInOrder: ModelDefined<
    ProductInOrderAttributes,
    ProductInOrderCreationAttributes
  >;
};
const Models: ModelStructure = {
  User,
  Product,
  InOrder,
  ProductInOrder,
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
  createUserRelationships(Product);
  createUserRelationships(InOrder);
  // The Super Many-to-Many relationship
  // https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
  InOrder.belongsToMany(Product, { through: ProductInOrder });
  Product.belongsToMany(InOrder, { through: ProductInOrder });
  ProductInOrder.belongsTo(Product);
  ProductInOrder.belongsTo(InOrder);
  Product.hasMany(ProductInOrder);
  InOrder.hasMany(ProductInOrder);

  // End of Super Many-to-Many Relationship
  await sequelize.sync({ force });
  await sequelize.authenticate();
  connection.isConnected = true;
  writeToConsole("=> Created a new connection.");
  if (force == true) {
    await User.create({
      email: "admin@admin.com",
      type: "admin",
    });
    await Product.create({
      id: "54ef44fd-85cb-4f46-95a4-79502c590ec2",
      title: "Moby Dick",
      description: "Este libro es de moby dick un autor muy famoso",
      price: 150,
      type: "book",
      status: "valid",
      imageUrl: "imageUrl",
    });
    await Product.create({
      id: "54ef44fd-85cb-4f46-95a4-79502c590ec3",
      title: "Dracula",
      description: "Un vampiro viaja por el mundo",
      price: 150,
      type: "book",
      status: "valid",
      imageUrl: "imageUrl",
    });
  }
  return Models;
};
