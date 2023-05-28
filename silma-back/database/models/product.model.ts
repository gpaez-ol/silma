import { DataTypes, ModelDefined, Optional, Sequelize } from "sequelize";
import {
  productFormat,
  ProductFormat,
  productGenre,
  ProductGenre,
  productLanguage,
  ProductLanguage,
  ProductStatus,
  productStatus,
  ProductType,
  productTypes,
} from "types";
import { longText, shortText } from "utils";
import { EntityAttributes } from "./base/entity.model";
import { ProductInOrderAttributes } from "./productInOrder.model";

export type ProductAttributes = {
  id?: string;
  title: string;
  type: ProductType;
  synopsis: string;
  salesPrice: number;
  internalCode: string;
  imageUrl: string;
  status: ProductStatus;

  // Atributos de libro opcionales
  authorPrice?: number;
  numberPages?: number;
  weight?: number;
  dimensions?: string;
  suggestedAges?: string;
  isbn?: string;
  publicationYear?: number;
  edition?: string;
  author?: string;
  format?: ProductFormat;
  genre?: ProductGenre;
  language?: ProductLanguage;

  ProductInOrders?: ProductInOrderAttributes[];
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
        validate: {
          customValidator: (value) => {
            if (value < 0) {
              throw new Error("El costo no puede ser negativo");
            }
          },
        },
      },
      genre: {
        type: DataTypes.ARRAY(DataTypes.STRING(shortText)),
        validate: {
          customValidator: (values) => {
            values.some((value) => !productGenre.includes(value as ProductGenre))
          },
        },
      },
      language: {
        type: DataTypes.STRING,
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
        validate: {
          customValidator: (value) => {
            if (value < 1) {
              throw new Error(
                "El numero de paginas no puede ser negativo ni 0"
              );
            }
          },
        },
      },
      suggestedAges: {
        type: new DataTypes.STRING(shortText),
      },
      weight: {
        type: new DataTypes.DOUBLE(),
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
      },
      isbn: {
        type: DataTypes.STRING,
        validate: {
          is: /^[0-9]{13}$/, // Regular expression for 13 digits from 0 to 9
        },
      },
      internalCode: {
        type: new DataTypes.STRING(shortText),
        allowNull: false,
      },
      publicationYear: {
        type: new DataTypes.DOUBLE(),
      },
      edition: {
        type: new DataTypes.STRING(shortText),
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
        type: new DataTypes.STRING(7000000),
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    });
  return Model;
};
