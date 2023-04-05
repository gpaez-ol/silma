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
        createdAt: new Date(),
        title: data.title,
        author: data.author,
        type: data.type,
        synopsis: data.synopsis,
        salesPrice: data.salesPrice,
        authorPrice: data.authorPrice,
        gender: data.gender,
        language: data.language,
        format: data.format,
        numberPages: data.numberPages,
        suggestedAges: data.suggestedAges,
        weight: data.weight,
        dimensions: data.dimensions,
        internalCode: data.internalCode,
        isbn: data.isbn,
        quantity: data.quantity,
        publicationYear: data.publicationYear,
        edition: data.edition,
        imageUrl: data.imageUrl,
        status: data.status
    };

    const db = await connectToDatabase();
    const { Product } = db;
    const newProduct = await Product.create(prodDB);
    
    return {data: newProduct};
};

export const createProduct: APIGatewayProxyHandler = silmaAPIhandler(
    createProductFunction
);