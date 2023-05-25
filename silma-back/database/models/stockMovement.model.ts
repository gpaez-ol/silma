import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { longText, shortText } from "utils";
import { EntityAttributes } from "./base/entity.model";
import { ProductAttributes } from "./product.model";
import { LocationAttributes } from "./location.model";
import { InOrderAttributes } from "./inOrder.model";

export type StockMovementAttributes = {
  id?: string;
  notes?: string;
  movedAt: Date;
  amount:number;
  ProductId: string;
  Product?:ProductAttributes;
  Location?: LocationAttributes;
  LocationId: string;
  PrevLocation?: LocationAttributes;
  PrevLocationId?: string;
  InOrderId?:string;
  InOrder?:InOrderAttributes;
} & EntityAttributes;

export type StockMovementCreationAttributes = StockMovementAttributes;
type GetModel = (
  sequelize: Sequelize
) => ModelDefined<StockMovementAttributes, StockMovementCreationAttributes>;

export const StockMovementModel: GetModel = (sequelize: Sequelize) => {
  const Model: ModelDefined<StockMovementAttributes, StockMovementCreationAttributes> =
    sequelize.define("StockMovement", {
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
      movedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull:false
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
