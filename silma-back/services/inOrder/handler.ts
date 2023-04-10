import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { InOrderAttributes, ProductInOrderAttributes } from "database/models";
import { connectToDatabase } from "database/sequelize";
import { SilmaAPIFunction, silmaAPIhandler } from "lib/handler/handler";
import { mapInOrderDetails, getInOrderList } from "logic";
import { InOrderCreate, InOrderCreateSchema } from "types";
import { badRequest } from "utils";

const createInOrderFunction: SilmaAPIFunction = async (
  event: APIGatewayEvent
) => {
  const data: InOrderCreate = JSON.parse(event.body);
  const { error } = InOrderCreateSchema.validate(data);
  if (error) {
    throw badRequest("Data was wrongly formatted");
  }

  const inOrderDB: InOrderAttributes = {
    createdAt: new Date(),
    orderedAt: data.orderedAt,
    deliveredAt: data.deliveredAt ?? null,
    notes: data.notes,
    deletedAt: null,
  };
  //checks that the product is unique
  const key = "id";
  const uniqueProducts = [
    ...new Map(data.products.map((item) => [item[key], item])).values(),
  ];
  if (uniqueProducts.length !== data.products.length) {
    throw badRequest("Products should be unique");
  }
  const db = await connectToDatabase();
  const { InOrder, ProductInOrder } = db;
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
export const getInOrders: APIGatewayProxyHandler =
  silmaAPIhandler(getInOrdersFunction);

export const getInOrderDetails: APIGatewayProxyHandler = silmaAPIhandler(
  getInOrderDetailsFunction
);
