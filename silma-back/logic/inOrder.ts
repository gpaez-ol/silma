import { ProductInOrderAttributes } from "database/models";
import {
  InOrderDetails,
  InOrderItem,
  ProductInOrderDetails,
  ProductInOrderItem,
} from "types";

const getUniqueProductItems = (productInOrders: ProductInOrderAttributes[]) => {
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
  return uniqueInOrderProductItems;
};

export const getInOrderList = (
  productInOrders: ProductInOrderAttributes[]
): InOrderItem[] => {
  const uniqueInOrderIds = new Set();
  const uniqueInOrderProductItems = getUniqueProductItems(productInOrders);
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
        id: productInOrder.InOrderId,
        orderedAt: productInOrder.InOrder.orderedAt,
        deliveredAt: productInOrder.InOrder.deliveredAt,
        products: uniqueInOrderProductItems[productInOrder.InOrderId],
      };
    });
  return inOrderItems;
};

const getUniqueProductDetailItems = (
  productInOrders: ProductInOrderAttributes[]
) => {
  const uniqueInOrderProductItems = productInOrders.reduce(
    (productItems: ProductInOrderDetails[], attributes) => {
      const { InOrderId } = attributes;
      productItems[InOrderId] = productItems[InOrderId] ?? [];
      productItems[InOrderId].push({
        amount: attributes.amount,
        id: attributes.ProductId,
        title: attributes.Product.title,
        description: attributes.Product.synopsis,
      });
      return productItems;
    },
    []
  );
  return uniqueInOrderProductItems;
};
export const mapInOrderDetails = (
  productInOrders: ProductInOrderAttributes[]
): InOrderDetails => {
  // TODO: Add logic to check only one order is being brought
  const uniqueInOrderIds = new Set();
  const uniqueInOrderProductItems =
    getUniqueProductDetailItems(productInOrders);
  const inOrderItems: InOrderDetails[] = productInOrders
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
        notes: productInOrder.InOrder.notes,
      };
    });
  return inOrderItems.pop();
};
