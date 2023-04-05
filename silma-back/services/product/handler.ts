import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { ProductAttributes } from "database/models";
import { connectToDatabase } from "database/sequelize";
import { SilmaAPIFunction, silmaAPIhandler } from "lib/handler/handler";
import { ProductCreate, ProductCreateSchema } from "types";
import { badRequest } from "utils";

const createProductFunction: SilmaAPIFunction = async(
    event: APIGatewayEvent
) => {
    const data: ProductCreate = JSON.parse(event.body);
    const error = ProductCreateSchema.validate(data);
    if (error){
        throw badRequest("Wrong data format");
    }

    const prodDB: ProductAttributes = {
        //Atributos de producto actualizados
    };

    const db = await connectToDatabase();
    const { Product } = db;
    const newProduct = await Product.create(prodDB);
    
    return {data: newProduct};
};

export const createProduct: APIGatewayProxyHandler = silmaAPIhandler(
    createProductFunction
);