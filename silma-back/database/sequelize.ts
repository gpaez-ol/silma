import { Sequelize, ModelDefined } from "sequelize";
import * as pg from "pg";
import { writeToConsole } from "utils";
import {
  UserModel,
  UserCreationAttributes,
  UserAttributes,
  EntityAttributes,
  ProductAttributes,
  ProductCreationAttributes,
  ProductModel,
  InOrderAttributes,
  InOrderCreationAttributes,
  InOrderModel,
  ProductInOrderAttributes,
  ProductInOrderModel,
  ProductInOrderCreationAttributes,
  LocationAttributes,
  LocationCreationAttributes,
  LocationModel,
  StockMovementModel,
  StockMovementAttributes,
  StockMovementCreationAttributes,
} from "./models";

// Require and initialize outside of your main handler
export const sequelize = new Sequelize(
  process.env.DB_NAME ?? "silma",
  process.env.DB_USERNAME ?? "CHECK YOUR ENV VARS",
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      connectTimeout: 25000,
    },
    host: process.env.DB_HOST,
    logging: writeToConsole,
    port: Number.parseInt(process.env.DB_PORT ?? "CHECK YOUR ENV VARS", 10),
  }
);

type Connection = {
  isConnected: boolean;
};

const User = UserModel(sequelize);
const Product = ProductModel(sequelize);
const InOrder = InOrderModel(sequelize);
const ProductInOrder = ProductInOrderModel(sequelize);
const Location = LocationModel(sequelize);
const StockMovement = StockMovementModel(sequelize);
type ModelStructure = {
  User: ModelDefined<UserAttributes, UserCreationAttributes>;
  Product: ModelDefined<ProductAttributes, ProductCreationAttributes>;
  InOrder: ModelDefined<InOrderAttributes, InOrderCreationAttributes>;
  ProductInOrder: ModelDefined<
    ProductInOrderAttributes,
    ProductInOrderCreationAttributes
  >;
  Location: ModelDefined<LocationAttributes, LocationCreationAttributes>;
  StockMovement: ModelDefined<StockMovementAttributes, StockMovementCreationAttributes>
};
const Models: ModelStructure = {
  User,
  Product,
  InOrder,
  ProductInOrder,
  Location,
  StockMovement
};

const connection: Connection = { isConnected: false };
type GetPromise = (force?: boolean) => Promise<ModelStructure>;
// eslint-disable-next-line @typescript-eslint/ban-types
function createUserRelationships<S extends EntityAttributes, T extends {}>(
  entity: ModelDefined<S, T>
): void {
  // created By
  entity.belongsTo(User, {
    foreignKey: "createdBy",
    as: "userCreated",
    foreignKeyConstraint: true,
  });
  // updated By
  entity.belongsTo(User, {
    foreignKey: "updatedBy",
    as: "userUpdated",
    foreignKeyConstraint: false,
  });
  // deletedBy
  entity.belongsTo(User, {
    foreignKey: "deletedBy",
    as: "userDeleted",
    foreignKeyConstraint: false,
  });
}
export const connectToDatabase: GetPromise = async (force = false) => {
  if (connection.isConnected) {
    writeToConsole("=> Using existing connection.");
    return Models;
  }
  // User Relationships
  createUserRelationships(User);
  createUserRelationships(Product);
  createUserRelationships(InOrder);
  createUserRelationships(Location);
  // The Super Many-to-Many relationship
  // https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
  InOrder.belongsToMany(Product, { through: ProductInOrder });
  Product.belongsToMany(InOrder, { through: ProductInOrder });
  ProductInOrder.belongsTo(Product);
  ProductInOrder.belongsTo(InOrder);
  Product.hasMany(ProductInOrder);
  InOrder.hasMany(ProductInOrder);
  Location.hasMany(ProductInOrder);
  ProductInOrder.belongsTo(Location);
  // End of Super Many-to-Many Relationship

  // Location-InOrder Relationships
  Location.hasMany(InOrder);
  InOrder.belongsTo(Location);

  StockMovement.belongsTo(Product);
  StockMovement.belongsTo(Location);
  StockMovement.belongsTo(Location, { as: "PrevLocation", foreignKey: "PrevLocationId" });
  StockMovement.belongsTo(InOrder);

  await sequelize.sync({ force });
  await sequelize.authenticate();
  connection.isConnected = true;
  writeToConsole("=> Created a new connection.");
  if (force == true) {
    await User.create({
      email: "admin@admin.com",
      password: "$2a$10$EHOF4vG0mk93BQjuFWe1XedxwbHBGRIM7JGI5X6CNW2NWMbF2EugK",
      type: "admin",
    });
    await Product.create({
      id: "54ef74fd-85cb-4f46-95a4-79502c590ec2",
      title: "La conquista de los dioses",
      author: "Aurora Carranza",
      type: "book",
      synopsis: "La última misión encomendada por el rey de Hedef: Encontrar y traer de vuelta a su hijo, el príncipe Torben. Seres de distintas razas y talentos, híbridos, elfos y humanos, se ven involucrados por diversos motivos a esta sencilla misión en esencia.",
      salesPrice: 270,
      authorPrice: 179,
      genre: ["Aventura"], //drop down menu with a maximum of 3 genders
      language: "español",
      format: "ebook",
      numberPages: 250,
      suggestedAges: "12-18",
      weight: 20.2,
      dimensions: "4.2, 2.2, 5",
      isbn: "9781517449612", //solo numeros de 13 digitos
      internalCode: "AC001",
      publicationYear: 2015,
      edition: "1",
      status: "activo",
      imageUrl: "https://m.media-amazon.com/images/I/410tSqpcVrL.jpg",
    });
    await Product.create({
      id: "59ef74fd-85cb-4f46-95a4-79502c590ec2",
      title: "Esclavitud",
      author: "Aurora Carranza",
      type: "book",
      synopsis: "Al morir, todo ser vivo tiene quince segundos antes de que su alma abandone su cuerpo, momento que otros aprovechan para transformarlos en Esclavos.",
      salesPrice: 320,
      authorPrice: 213,
      genre: ["Aventura"], //drop down menu with a maximum of 3 genders
      language: "español",
      format: "ebook",
      numberPages: 376,
      suggestedAges: "12-18",
      weight: 20.2,
      dimensions: "4.2, 2.2, 5",
      isbn: "9781973882930", //solo numeros de 13 digitos
      internalCode: "AC002",
      publicationYear: 2018,
      edition: "1",
      status: "activo",
      imageUrl: "https://m.media-amazon.com/images/I/51MlctQk8ZL.jpg",
    });
    await Product.create({
      id: "59ef74fd-65cb-4f46-95a4-79502c590ec2",
      title: "Los tres dominios",
      author: "Carlos Ramos",
      type: "book",
      synopsis: "Jordán Gallur es un fracasado y un bueno para nada. Su vida es un hueco vacío, y no parece darse cuenta. Pero una noche, tras haber estado escuchando voces por un tiempo, se le aparece su ángel guardián, Malak Ghyr. Le dice que tiene una misión muy importante, que es matar a un demonio que quiere destruir la tierra.",
      salesPrice: 300,
      authorPrice: 230,
      genre: ["Aventura"], //drop down menu with a maximum of 3 genders
      language: "español",
      format: "ebook",
      numberPages: 258,
      suggestedAges: "0-18",
      weight: 20.2,
      dimensions: "4.2, 2.2, 5",
      isbn: "9798551598824", //solo numeros de 13 digitos
      internalCode: "CR001",
      publicationYear: 2020,
      edition: "1",
      status: "activo",
      imageUrl: "https://m.media-amazon.com/images/I/61FzO604ztL.jpg",
    });
    await Product.create({
      id: "59ef74fd-85cb-4f46-95a4-79502c510ec2",
      title: "Incurable",
      author: "Georgina González Mendívil",
      type: "book",
      synopsis: "Incurable es la historia de dos corazones que se encuentran, luego de emprender sus búsquedas personales. Sus personajes son como cualquiera de nosotros, gente común que día a día va construyéndose, a veces en soledad, otras en la zozobra, entre dudas, pero siempre con esperanza: ¿En qué momento se había olvidado de sus ilusiones y sus deseos",
      salesPrice: 210,
      authorPrice: 160,
      genre: ["Romance"], //drop down menu with a maximum of 3 genders
      language: "español",
      format: "ebook",
      numberPages: 139,
      suggestedAges: "12-18",
      weight: 20.2,
      dimensions: "13.97 x 0.89 x 21.59 cm  ",
      isbn: "9781691285648", //solo numeros de 13 digitos
      internalCode: "GG001",
      publicationYear: 2020,
      edition: "1",
      status: "activo",
      imageUrl: "https://m.media-amazon.com/images/I/51ZTfoafXCL._SX598_BO1,204,203,200_.jpg",
    });
    await Product.create({
      id: "59ef74fd-83cb-4f46-95a4-79502c510ec2",
      title: "Separador esclavitud Israel",
      type: "article",
      synopsis: "Separador esclavitud Israel",
      salesPrice: 10,
      internalCode: "AC003",
      imageUrl: "https://i0.wp.com/www.silmaed.com/wp-content/uploads/2019/02/AC003_SeparadorEsclavitudIsrael.jpg",
      status: "activo",
    });
    await Product.create({
      id: "58ef74fd-83cb-4f46-95a4-79502c510ec2",
      title: "Separador esclavitud Katherine",
      type: "article",
      synopsis: "Separador esclavitud Katherine",
      salesPrice: 10,
      internalCode: "AC004",
      imageUrl: "https://i0.wp.com/www.silmaed.com/wp-content/uploads/2019/02/AC004_SeparadorEsclavitudKatherine.jpg",
      status: "activo",
    });
    await Product.create({
      id: "58ff74fd-83cb-4f46-95a4-79502c510ec2",
      title: "Calcomanía La conquista Aucarod",
      type: "article",
      synopsis: "Calcomanía La conquista Aucarod",
      salesPrice: 5,
      internalCode: "AC005",
      imageUrl: "https://i2.wp.com/www.silmaed.com/wp-content/uploads/2019/02/AC017_CalcomaniaLaConquista-Aucarod.jpg",
      status: "activo",
    });

    await Product.create({
      id: "58bf74fd-83cb-4f46-95a4-79502c510bc2",
      title: "Calcomanía La conquista  Amith",
      type: "article",
      synopsis: "Calcomanía La conquista  Amith",
      salesPrice: 5,
      internalCode: "AC005",
      imageUrl: "https://i0.wp.com/www.silmaed.com/wp-content/uploads/2019/02/AC018_CalcomaniaLaConquista-Amith.jpg",
      status: "activo",
    });

    await Location.create({
      id: "c7d70ad7-1e69-499b-ac2b-d68dcd3bff2e",
      title: "Bodega",
      description: "Ubicacion base de llegadas",
    });
    await Location.create({
      id: "d8d70ad7-1e69-499b-ac2b-d68dcd3bff2e",
      title: "Piso",
      description: "Ubicacion base de llegadas",
    });
  }
  return Models;
};
