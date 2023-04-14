import { DataTypes, ModelDefined, Optional, Sequelize } from "sequelize";
import { productFormat, ProductFormat, productGender, ProductGender, productLanguage, ProductLanguage, ProductStatus, productStatus, ProductType, productTypes } from "types";
import { longText, shortText } from "utils";
import { EntityAttributes } from "./base/entity.model";

export type ProductAttributes = {
  id?: string;
  title: string;
  author: string;
  type: ProductType;
  synopsis: string;
  salesPrice: number;
  authorPrice: number;
  gender: ProductGender;
  language: ProductLanguage;
  format: ProductFormat;
  numberPages: number;
  suggestedAges: string;
  weight: number;
  dimensions: string;
  isbn: string;
  internalCode: string;
  quantity: number;
  publicationYear: number;
  edition: string;
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
      author: {
        type: new DataTypes.STRING(shortText),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            if (!productTypes.includes(value)) {
              throw new Error("No es una opción valida");
            }
          },
        },
      },
      synopsis: { 
        type: new DataTypes.STRING(longText),
        allowNull: false,
      },
      salesPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            if (value < 0) {
              throw new Error("El costo no puede ser negativo");
            }
          },
        },
      },
      authorPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            if (value < 0) {
              throw new Error("El costo no puede ser negativo");
            }
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            if (!productGender.includes(value)) {
              throw new Error("No es una opción válida");
            }
          },
        },
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            if (!productLanguage.includes(value)) {
              throw new Error("No es una opción válida");
            }
          },
        },
      },
      format: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            if (!productFormat.includes(value)) {
              throw new Error("No es una opción valida");
            }
          },
        },
      },
      numberPages: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            if (value < 0) {
              throw new Error("El numero de paginas no puede ser negativo");
            }
          },
        },
      },
      suggestedAges: {
        type: new DataTypes.STRING(shortText),
        allowNull: false,
      },
      weight: {
        type: new DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            if (value < 0) {
              throw new Error("El peso no puede ser negativo");
            }
          },
        },
      },
      dimensions: {
        type: new DataTypes.STRING(shortText),
        allowNull: false,
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]{13}$/ // Regular expression for 13 digits from 0 to 9
        }
      },
      internalCode: {
        type: new DataTypes.STRING(shortText),
        allowNull: false,
      },
      quantity: {
        type: new DataTypes.DOUBLE,
        allowNull: false,
      },
      publicationYear: {
        type: new DataTypes.DOUBLE,
        allowNull: false,
      },
      edition: {
        type: new DataTypes.STRING(shortText),
        allowNull: false,
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
      imageUrl: {
        type: new DataTypes.STRING(longText),
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  return Model;
};
