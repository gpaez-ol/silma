import { DataTypes, ModelDefined, Optional, Sequelize } from "sequelize";
import { shortText } from "utils";
import { EntityAttributes } from "./base/entity.model";

export type InOrderAttributes = {
  id: string;
  internalCode: string;
  orderDate: Date;
  arriveDate: Date;
} & EntityAttributes;
//- Orden de entrada (ingresos): fecha que se pidió, fecha en que llega el material, 
//con el código interno llame la info: tipo de producto (libro, sticker, etc),
// titulo, cantidad de lo que entra, bodega (cantidad)(casa de Lorena), piso (aurora)
export type InOrderCreationAttributes = Optional<
  InOrderAttributes,
  "createdBy"
>;

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
      internalCode: {
        type: new DataTypes.STRING(shortText),
        allowNull: false,
      },
      orderDate: {
        type: new DataTypes.DATE,
      },
      arriveDate: {
        type: new DataTypes.DATE
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  return Model;
};
