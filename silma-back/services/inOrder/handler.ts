import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { InOrderAttributes, ProductInOrderAttributes } from "database/models";
import { connectToDatabase } from "database/sequelize";
import { SilmaAPIFunction, silmaAPIhandler } from "lib/handler/handler";
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
    deliveredAt: data.deliveredAt ?? null,
    notes: data.notes,
    deletedAt: null,
  };
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
  return { data: newInOrder };
};

export const createInOrder: APIGatewayProxyHandler = silmaAPIhandler(
  createInOrderFunction
);
