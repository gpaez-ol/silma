import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { longText, shortText } from "utils";
import { EntityAttributes } from "./base/entity.model";
import { ProductAttributes } from "./product.model";
import { ProductInOrderAttributes } from "./productInOrder.model";
import { LocationAttributes } from "./location.model";

export type InOrderAttributes = {
  id?: string;
  notes: string;
  internalCode: string;
  orderedAt: Date;
  deliveredAt: Date;
  products?: ProductAttributes[];
  ProductInOrders?: ProductInOrderAttributes[];
  Location?: LocationAttributes;
  LocationId?: string;
} & EntityAttributes;

export type InOrderCreationAttributes = InOrderAttributes;
type GetModel = (
  sequelize: Sequelize
) => ModelDefined<InOrderAttributes, InOrderCreationAttributes>;

export const InOrderModel: GetModel = (sequelize: Sequelize) => {
  const Model: ModelDefined<InOrderAttributes, InOrderCreationAttributes> =
    sequelize.define("InOrder", {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      notes: {
        type: new DataTypes.STRING(longText),
        allowNull: false,
      },
      internalCode: {
        type: new DataTypes.STRING(shortText),
        allowNull: false,
      },
      orderedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deliveredAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: {
        type: new DataTypes.DATE(),
        allowNull: true,
      },
    });
  return Model;
};
