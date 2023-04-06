import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { InOrderAttributes, ProductInOrderAttributes } from "database/models";
import { connectToDatabase } from "database/sequelize";
import { SilmaAPIFunction, silmaAPIhandler } from "lib/handler/handler";
import {
  InOrderCreate,
  InOrderCreateSchema,
  InOrderItem,
  ProductInOrderItem,
} from "types";
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
const getInOrdersFunction: SilmaAPIFunction = async (
  event: APIGatewayEvent
) => {
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

  const uniqueInOrderProductItems = productInOrders.reduce(
    (productItems: ProductInOrderItem[], attributes) => {
      const { InOrderId } = attributes;
      productItems[InOrderId] = productItems[InOrderId] ?? [];
      productItems[InOrderId].push({
        amount: attributes.amount,
        id: attributes.ProductId,
        title: attributes.Product.title,
      });
      return productItems;
    },
    []
  );
  const uniqueInOrderIds = new Set();
  const inOrderItems: InOrderItem[] = productInOrders
    .filter((productInOrder) => {
      const isDuplicate = uniqueInOrderIds.has(productInOrder.InOrderId);
      uniqueInOrderIds.add(productInOrder.InOrderId);
      if (!isDuplicate) {
        return true;
      }

      return false;
    })
    .map((productInOrder) => {
      return {
        orderedAt: productInOrder.InOrder.orderedAt,
        deliveredAt: productInOrder.InOrder.deliveredAt,
        products: uniqueInOrderProductItems[productInOrder.InOrderId],
      };
    });

  return { data: inOrderItems };
};

export const createInOrder: APIGatewayProxyHandler = silmaAPIhandler(
  createInOrderFunction
);
export const getInOrders: APIGatewayProxyHandler =
  silmaAPIhandler(getInOrdersFunction);
