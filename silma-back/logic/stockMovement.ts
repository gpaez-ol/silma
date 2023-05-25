import { StockMovementAttributes } from "database/models";
import { ProductStockMovementItem } from "types";

export const getProductStockMovementList = (
    productStockMovement: StockMovementAttributes[]
  ): ProductStockMovementItem[] => {
    const productStockMovementItems: ProductStockMovementItem[] = productStockMovement
      .map((stockMovement) => {
        return {
          id: stockMovement.id,
          movedAt: stockMovement.movedAt,
          amount: stockMovement.amount,
          locationId: stockMovement.LocationId,
          locationName: stockMovement.Location.title,
          notes: stockMovement.notes
        };
      });
    return productStockMovementItems;
  };