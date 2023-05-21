import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { EntityAttributes } from "./base/entity.model";

export type LocationAttributes = {
  id?: string;
  title: string;
  description: string;
} & EntityAttributes;

export type LocationCreationAttributes = LocationAttributes;
type GetModel = (
  sequelize: Sequelize
) => ModelDefined<LocationAttributes, LocationCreationAttributes>;

export const LocationModel: GetModel = (sequelize: Sequelize) => {
  const Model: ModelDefined<LocationAttributes, LocationCreationAttributes> =
    sequelize.define("Location", {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: new DataTypes.DATE(),
        allowNull: true,
      },
    });
  return Model;
};
