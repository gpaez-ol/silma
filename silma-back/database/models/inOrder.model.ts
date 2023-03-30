import { DataTypes, ModelDefined, Optional, Sequelize } from "sequelize";
import { longText } from "utils";
import { EntityAttributes } from "./base/entity.model";

export type InOrderAttributes = {
  notes: string;
  deliveredAt: Date;
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
      description: {
        type: new DataTypes.STRING(longText),
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
