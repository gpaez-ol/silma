import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { ProductAttributes } from "database/models";
import { connectToDatabase } from "database/sequelize";
import { SilmaAPIFunction, silmaAPIhandler } from "lib/handler/handler";
import { ProductCreate, ProductCreateSchema } from "types";
import { getArticlesList, getBooksList } from "logic/product";
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
        //description: data.synopsis,
        author: data.author,
        type: data.type,
        synopsis: data.synopsis,
        price: data.salesPrice,
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
        status: data.status,
        deletedAt: null
    };

    const db = await connectToDatabase();
    const { Product } = db;
    const newProduct = await Product.create(prodDB);
    
    return {data: newProduct};
};

export const createProduct: APIGatewayProxyHandler = silmaAPIhandler(
    createProductFunction
);

const getProductArticlesFunction: SilmaAPIFunction = async(
    event: APIGatewayEvent
) => {
    const db = await connectToDatabase();
    const { Product } = db;
    /*const products = Product.findAll({where:{
            type: 'article',
            deletedAt: null
        }});

        return {data: products};
    */
    
    const rawProductArticle = await Product.findAll({
        include:[
            {model: Product, attributes: [
                "id",
                "title",
                "description",
                "quantity",
                "salesPrice",
                "internalCode",
                "imageUrl",
                "status"
            ]}
        ],
        where: {deletedAt: null}
    });
    
    const productArticles = rawProductArticle.map((rawProduct)=>
        rawProduct.get({plain: true})
    );
    
    const articleList = getArticlesList(productArticles)

    return {data: articleList}
};

export const getProductArticles: APIGatewayProxyHandler = silmaAPIhandler(
    getProductArticlesFunction
);

//Repetir para Libro
const getProductBooksFunction: SilmaAPIFunction = async(
    event: APIGatewayEvent
) => {
    const db = await connectToDatabase();
    const { Product } = db;
    /*const products = Product.findAll({where:{
            type: 'book',
            deletedAt: null
        }});

        return {data: products};
    */
    
    const rawProductBook = await Product.findAll({
        include:[
            {model: Product, attributes: [
                "id",
                "title",
                "author",
                "synopsis",
                "quantity",
                "salesPrice",
                "authorPrice",
                "gender",
                "language",
                "format",
                "numberPages",
                "suggestedAges",
                "weight",
                "dimensions",
                "internalCode",
                "isbn",
                "publicationYear",
                "edition",
                "imageUrl",
                "status"
            ]}
        ],
        where: {deletedAt: null}
    });
    
    const productBooks = rawProductBook.map((rawProduct)=>
        rawProduct.get({plain: true})
    );
    
    const bookList = getBooksList(productBooks)

    return {data: bookList}    
};

export const getProductBooks: APIGatewayProxyHandler = silmaAPIhandler(
    getProductBooksFunction
);