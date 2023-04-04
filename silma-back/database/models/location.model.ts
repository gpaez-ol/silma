import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { EntityAttributes } from "./base/entity.model";

export type LocationAttributes = {
    id: number;
    isBodega: boolean;
    isPiso: boolean;
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
        isBodega: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        isPiso: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        updatedAt: {
            type: new DataTypes.DATE(),
            allowNull: false
        }
    });
    return Model;
};