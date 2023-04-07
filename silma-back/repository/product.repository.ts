import { ProductAttributes, ProductCreationAttributes } from "database/models";
import { connectToDatabase } from "database/sequelize";
import { ModelDefined } from "sequelize";
import { GenericRepository } from "./template.repository";

// ProductRepository class extended from GenericRepository
/*export class ProductRepository extends GenericRepository<
    ProductAttributes, ProductCreationAttributes
> {
    model: ModelDefined<ProductAttributes,ProductCreationAttributes>;

    constructor(
        model: ModelDefined<ProductAttributes,ProductCreationAttributes>
    ){
        super(model);
        this.model = model;
    }
}
*/
/* Get function that returns a ProductRepository object.
* @returns A promise that resolves to a ProductRepository
*/
/*export const getProductRepository = async (): Promise<ProductRepository> => {
    const db = await connectToDatabase();
    const productRepository: ProductRepository = new ProductRepository(db.Product);
    return productRepository;
}*/