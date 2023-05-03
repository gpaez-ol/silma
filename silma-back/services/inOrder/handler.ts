import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { InOrderAttributes, ProductInOrderAttributes } from "database/models";
import { connectToDatabase } from "database/sequelize";
import { SilmaAPIFunction, silmaAPIhandler } from "lib/handler/handler";
import { mapInOrderDetails, getInOrderList } from "logic";
import { badRequest, writeToConsole } from "utils";
import { InOrderCreate, InOrderCreateSchema } from "types";

const createInOrderFunction: SilmaAPIFunction = async (
  event: APIGatewayEvent
) => {
  const data: InOrderCreate = JSON.parse(event.body);
  const { error } = InOrderCreateSchema.validate(data);
  if (error) {
    writeToConsole(error.message);
    throw badRequest(error.message);
  }
  const db = await connectToDatabase();
  const { InOrder, ProductInOrder } = db;
  let count = await InOrder.count({ where: { deletedAt: null } });
  const internalCode = `OE-${++count}`;
  const inOrderDB: InOrderAttributes = {
    createdAt: new Date(),
    orderedAt: data.orderedAt,
    deliveredAt: data.deliveredAt ?? null,
    notes: data.notes,
    deletedAt: null,
    internalCode: internalCode,
  };
  //checks that the product is unique
  const key = "id";
  const uniqueProducts = [
    ...new Map(data.products.map((item) => [item[key], item])).values(),
  ];
  if (uniqueProducts.length !== data.products.length) {
    throw badRequest("Products should be unique");
  }
  const newInOrder = await InOrder.create(inOrderDB);
  const productOrderDb: ProductInOrderAttributes[] = data.products.map(
    (product) => {
      return {
        amount: product.amount,
        ProductId: product.id,
        InOrderId: newInOrder.get().id,
        createdAt: new Date(),
        deletedAt: null,
      };
    }
  );
  await ProductInOrder.bulkCreate(productOrderDb);
  // TODO: map to the version needed
  return { data: newInOrder };
};

const updateInOrderFunction: SilmaAPIFunction = async (
  event: APIGatewayEvent
) => {
  const { inOrderId } = event.queryStringParameters;
  const data: InOrderCreate = JSON.parse(event.body);
  const { error } = InOrderCreateSchema.validate(data);
  if (error) {
    throw badRequest("Data was wrongly formatted");
  }
  const db = await connectToDatabase();
  const { InOrder, ProductInOrder } = db;
  const oldInOrderRaw = await InOrder.findByPk(inOrderId, {
    include: [ProductInOrder],
  });
  if (oldInOrderRaw === null || oldInOrderRaw === undefined) {
    throw badRequest("This InOrder doesnt exist");
  }
  const oldInOrder = oldInOrderRaw.get({ plain: true });
  const newInOrder: InOrderAttributes = {
    id: oldInOrder.id,
    createdAt: oldInOrder.createdAt,
    orderedAt: data.orderedAt,
    deliveredAt: data.deliveredAt ?? oldInOrder.deliveredAt,
    notes: data.notes,
    deletedAt: oldInOrder.deliveredAt,
    ProductInOrders: oldInOrder.ProductInOrders,
    internalCode: oldInOrder.internalCode,
  };
  newInOrder.ProductInOrders = newInOrder.ProductInOrders.map(
    (productInOrder) => {
      const product = data.products.find(
        (product) => product.id === productInOrder.ProductId
      );
      if (product !== null && product !== undefined) {
        return {
          amount: product.amount,
          ProductId: newInOrder.id,
          InOrderId: oldInOrder.id,
          createdAt: productInOrder.createdAt,
          deletedAt: null,
        };
      } else {
        return {
          amount: productInOrder.amount,
          ProductId: productInOrder.ProductId,
          InOrderId: productInOrder.InOrderId,
          createdAt: productInOrder.createdAt,
          deletedAt:
            productInOrder.deletedAt === null
              ? new Date()
              : productInOrder.deletedAt,
        };
      }
    }
  );
  const newProducts = data.products
    .filter(
      (product) =>
        !newInOrder.ProductInOrders.some(
          (productInOrder) => productInOrder.ProductId === product.id
        )
    )
    .map((product) => {
      return {
        amount: product.amount,
        ProductId: product.id,
        InOrderId: newInOrder.id,
        createdAt: new Date(),
        deletedAt: null,
      };
    });

  newInOrder.ProductInOrders.concat(newProducts);
  const updatedInOrder = await oldInOrderRaw.update(newInOrder);
  return { data: updatedInOrder };
};
const getInOrdersFunction: SilmaAPIFunction = async () => {
  const db = await connectToDatabase();
  const { InOrder, ProductInOrder, Product } = db;
  const rawProductInOrders = await ProductInOrder.findAll({
    include: [
      { model: InOrder, attributes: ["id", "orderedAt", "deliveredAt"] },
      { model: Product, attributes: ["id", "title"] },
    ],
    where: { deletedAt: null },
    group: ["InOrder.id", "ProductInOrder.id", "Product.id"],
    order: [["createdAt", "ASC"]],
  });
  const productInOrders = rawProductInOrders.map((rawInOrder) =>
    rawInOrder.get({ plain: true })
  );
  const inOrderList = getInOrderList(productInOrders);

  return { data: inOrderList };
};

const getInOrderDetailsFunction: SilmaAPIFunction = async (
  event: APIGatewayEvent
) => {
  const { inOrderId } = event.queryStringParameters;
  const db = await connectToDatabase();
  const { InOrder, ProductInOrder, Product } = db;
  const rawProductInOrders = await ProductInOrder.findAll({
    include: [
      {
        model: InOrder,
        attributes: ["id", "orderedAt", "deliveredAt", "notes"],
      },
      { model: Product, attributes: ["id", "title", "description"] },
    ],
    where: { deletedAt: null, InOrderId: inOrderId },
    group: ["InOrder.id", "ProductInOrder.id", "Product.id"],
    order: [["createdAt", "ASC"]],
  });
  const productInOrders = rawProductInOrders.map((rawInOrder) =>
    rawInOrder.get({ plain: true })
  );

  const inOrderDetails = mapInOrderDetails(productInOrders);
  return { data: inOrderDetails };
};

export const createInOrder: APIGatewayProxyHandler = silmaAPIhandler(
  createInOrderFunction
);
export const updateInOrder: APIGatewayProxyHandler = silmaAPIhandler(
  updateInOrderFunction
);
export const getInOrders: APIGatewayProxyHandler =
  silmaAPIhandler(getInOrdersFunction);

export const getInOrderDetails: APIGatewayProxyHandler = silmaAPIhandler(
  getInOrderDetailsFunction
);
