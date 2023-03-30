import { DataTypes, Sequelize, ModelDefined } from "sequelize";
import { EntityAttributes } from "./base/entity.model";

export type ProductInOrderAttributes = {
  eventId?: string;
  positionId?: string;
  positions: number;
  hired: number;
} & EntityAttributes;

type GetModel = (
  sequelize: Sequelize
) => ModelDefined<ProductInOrderAttributes, ProductInOrderAttributes>;

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
