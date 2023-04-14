import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { EntityAttributes } from "./base/entity.model";

export type LocationAttributes = {
    id?: number;
    titulo: string;
    descripcion: string;
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
            defaultValue: DataTypes.UUIDV4
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Model;
};