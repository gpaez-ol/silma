import { ProductAttributes, StockMovementAttributes } from "database/models";
import { CurrentProductStockItem, ProductStockMovementItem } from "types";

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

export const buildProductStockMovements= (stockMovements:StockMovementAttributes[],products:ProductAttributes[]):CurrentProductStockItem [] => {
    
 
  const productStockMovements:CurrentProductStockItem[] =  products.map(product => {
      
      const bodegaSMovement = stockMovements.find(sMovement => sMovement.ProductId === product.id && sMovement.LocationId === "c7d70ad7-1e69-499b-ac2b-d68dcd3bff2e" )
      const pisoSMovement = stockMovements.find(sMovement => sMovement.ProductId === product.id && sMovement.LocationId === "d8d70ad7-1e69-499b-ac2b-d68dcd3bff2e" );
      return  {
        productName: product.title,
        productId: product.id,
        locationId: bodegaSMovement ?  bodegaSMovement.LocationId : "c7d70ad7-1e69-499b-ac2b-d68dcd3bff2e" ,
        internalCode: product.internalCode,
        bodegaTotal: bodegaSMovement ? bodegaSMovement.total_amount: 0,
        pisoTotal: pisoSMovement ? pisoSMovement.total_amount : 0
      }
 
    })
    return productStockMovements;
};