import { DataTypes, ModelDefined, Optional, Sequelize } from "sequelize";
import { ProductStatus, productStatus, ProductType, productTypes } from "types";
import { longText, shortText } from "utils";
import { EntityAttributes } from "./base/entity.model";

export type ProductAttributes = {
  id?: string;
  title: string;
  description: string;
  price: number;
  type: ProductType;
  imageUrl: string;
  status: ProductStatus;
} & EntityAttributes;

export type ProductCreationAttributes = Optional<
  ProductAttributes,
  "createdBy"
>;

type GetModel = (
  sequelize: Sequelize
) => ModelDefined<ProductAttributes, ProductCreationAttributes>;

export const ProductModel: GetModel = (sequelize: Sequelize) => {
  const Model: ModelDefined<ProductAttributes, ProductCreationAttributes> =
    sequelize.define("Product", {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: new DataTypes.STRING(shortText),
        allowNull: false,
      },
      description: {
        type: new DataTypes.STRING(longText),
        allowNull: false,
      },
      imageUrl: {
        type: new DataTypes.STRING(longText),
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            if (value < 0) {
              throw new Error("Cost cannot be negative");
            }
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            if (!productTypes.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          customValidator: (value) => {
            if (!productStatus.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
        allowNull: false,
        defaultValue: "valid",
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  return Model;
};
