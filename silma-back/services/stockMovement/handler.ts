import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { StockMovementAttributes } from "database/models";
import { connectToDatabase, sequelize } from "database/sequelize";
import { SilmaAPIFunction, silmaAPIhandler } from "lib/handler/handler";
import { buildProductStockMovements, getProductStockMovementList } from "logic";
import { badRequest, writeToConsole } from "utils";
import { StockMovementCreate, StockMovementCreateSchema } from "types";


const createStockMovementFunction: SilmaAPIFunction = async (
    event: APIGatewayEvent
  ) => {
    const data: StockMovementCreate = JSON.parse(event.body);
    const { error } = StockMovementCreateSchema.validate(data);
    if (error) {
      writeToConsole(error.message);
      throw badRequest(error.message);
    }
    const db = await connectToDatabase();
    const { StockMovement } = db;
    // TODO: validate that the value is not a negative number after leaving the original location
    const inOrdersDB: StockMovementAttributes[] = [{
      createdAt: new Date(),
      movedAt: new Date(),
      notes: data.notes,
      deletedAt: null,
      LocationId: data.locationId,
      PrevLocationId: data.prevLocationId,
      amount: data.amount,
      ProductId:data.productId
    },{
        createdAt: new Date(),
        movedAt: new Date(),
        notes: "El producto salió del lugar",
        deletedAt: null,
        LocationId: data.prevLocationId,
        amount: data.amount * -1,
        ProductId:data.productId
      }];

    const newStockMovement = await StockMovement.bulkCreate(inOrdersDB,{validate:true});
    
    // TODO: map to the version needed
    return { data: newStockMovement };
  };

const getStockMovementsFunction: SilmaAPIFunction = async () => {
  const db = await connectToDatabase();
  const { StockMovement,Product } = db;
  const rawStockMovements = await StockMovement.findAll({
    where: { deletedAt: null },
    attributes:["LocationId","ProductId",[sequelize.fn('sum', sequelize.col('amount')), 'total_amount']],
    group: [ "ProductId","LocationId"],
    order: [ "ProductId","LocationId"],
  });
  if(rawStockMovements === undefined || rawStockMovements === null || rawStockMovements.length < 1)
  {
    return {data:[]};
  }
  const stockMovements = rawStockMovements .map((rawStockMovement) =>
  rawStockMovement.get({ plain: true })
  );
  const rawProducts = await Product.findAll({
    attributes: ["id", "title","internalCode"],
    where: { deletedAt: null, status: "activo" },
  });
  const products = rawProducts.map((rawProduct) =>
    rawProduct.get({ plain: true })
  );
  const currentStockMovements = buildProductStockMovements(stockMovements,products);

  return { data: currentStockMovements };
};

const getProductStockMovementsFunction: SilmaAPIFunction = async (event: APIGatewayEvent) => {
    const { productId } = event.queryStringParameters;
    if(productId === undefined || productId === null)
    {
        throw badRequest("Product Id is missing");
    }
    const db = await connectToDatabase();
    const { StockMovement,Location } = db;
    const rawStockMovements = await StockMovement.findAll({
      where: { ProductId:productId },
      include:[{model:Location, attributes:["title"]}],
      attributes:["id","LocationId","movedAt","amount","notes"],
      order: ["movedAt"],
    });
    const stockMovements = rawStockMovements .map((rawStockMovement) =>
      rawStockMovement.get({ plain: true })
    );
    const stockMovementList = getProductStockMovementList(stockMovements);
  
    return { data: stockMovementList };
  };

  const getProductLocationStockMovementsFunction: SilmaAPIFunction = async (event: APIGatewayEvent) => {
    const { productId,locationId } = event.queryStringParameters;
    if(productId === undefined || productId === null)
    {
        throw badRequest("Product Id is missing");
    }
    if(locationId === undefined || locationId === null)
    {
        throw badRequest("Location Id is missing");
    }
    const db = await connectToDatabase();
    const { StockMovement } = db;
    const rawStockMovements = await StockMovement.findAll({
      where: { ProductId:productId,LocationId:locationId },
      attributes:["movedAt","amount","notes"],
      order: ["movedAt"],
    });
    const stockMovements = rawStockMovements .map((rawStockMovement) =>
      rawStockMovement.get({ plain: true })
    );
  
    return { data: stockMovements };
  };


export const getStockMovements: APIGatewayProxyHandler = silmaAPIhandler(
  getStockMovementsFunction
);

export const createStockMovement: APIGatewayProxyHandler = silmaAPIhandler(
    createStockMovementFunction
  );

export const getProductStockMovements: APIGatewayProxyHandler = silmaAPIhandler(getProductStockMovementsFunction);
export const getProductLocationStockMovements: APIGatewayProxyHandler = silmaAPIhandler(getProductLocationStockMovementsFunction);
