import { DataTypes, Sequelize, ModelDefined, Optional } from "sequelize";
import { EntityAttributes } from "./base/entity.model";
import { InOrderAttributes } from "./inOrder.model";
import { ProductAttributes } from "./product.model";

export type ProductInOrderAttributes = {
  id?: string;
  ProductId?: string;
  InOrderId?: string;
  InOrder?: InOrderAttributes;
  Product?: ProductAttributes;
  amount: number;
} & EntityAttributes;

export type ProductInOrderCreationAttributes = Optional<
  ProductInOrderAttributes,
  "deletedAt"
>;
type GetModel = (
  sequelize: Sequelize
) => ModelDefined<ProductInOrderAttributes, ProductInOrderCreationAttributes>;

export const ProductInOrderModel: GetModel = (sequelize: Sequelize) => {
  const ProductInOrder: ModelDefined<
    ProductInOrderAttributes,
    ProductInOrderAttributes
  > = sequelize.define("ProductInOrder", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    amount: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      validate: {
        customValidator: (value) => {
          if (value < 0) {
            throw new Error("value cannot be negative");
          }
        },
      },
    },
    deletedAt: {
      type: new DataTypes.DATE(),
      allowNull: true,
    },
  });
  return ProductInOrder;
};
