export type StockMovementCreate = {
    productId:string;
    amount:number;
    notes?: string;
    prevLocationId?:string;
    locationId: string;
};
