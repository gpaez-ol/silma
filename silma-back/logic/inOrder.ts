import { ProductInOrderAttributes } from "database/models";
import { InOrderItem, ProductInOrderItem } from "types";

const getUniqueProductItems = (productInOrders: ProductInOrderAttributes[]) => {
  const uniqueInOrderProductItems = productInOrders.reduce(
    (productItems: ProductInOrderItem[], attributes) => {
      const { InOrderId } = attributes;
      productItems[InOrderId] = productItems[InOrderId] ?? [];
      productItems[InOrderId].push({
        amount: attributes.amount,
        id: attributes.ProductId,
        title: attributes.Product.title,
        author: attributes.Product.author,
        internalCode: attributes.Product.internalCode,
        type: attributes.Product.type,
        status: attributes.Product.status,
        imageUrl: attributes.Product.imageUrl,
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
        notes: productInOrder.InOrder.notes,
        internalCode: productInOrder.InOrder.internalCode,
        products: uniqueInOrderProductItems[productInOrder.InOrderId],
        totalAmount: productInOrders.reduce(
          (sum, currentProduct) => sum + currentProduct.amount,
          0
        ),
      };
    });
  return inOrderItems;
};
