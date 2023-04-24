import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { ProductAttributes } from "database/models";
import { connectToDatabase } from "database/sequelize";
import { SilmaAPIFunction, silmaAPIhandler } from "lib/handler/handler";
import { ProductCreate, ProductCreateSchema } from "types";
import { getArticlesList, getBooksList } from "logic/product";
import { badRequest } from "utils";

const createProductFunction: SilmaAPIFunction = async (
  event: APIGatewayEvent
) => {
  const data: ProductCreate = JSON.parse(event.body);
  const {error} = ProductCreateSchema.validate(data);
  if (error) {
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
    genre: data.genre,
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
    deletedAt: null,
  };

  const db = await connectToDatabase();
  const { Product } = db;
  const newProduct = await Product.create(prodDB);

  return { data: newProduct };
};

export const createProduct: APIGatewayProxyHandler = silmaAPIhandler(
  createProductFunction
);

const getProductArticlesFunction: SilmaAPIFunction = async () => {
  const db = await connectToDatabase();
  const { Product } = db;
  const rawProductArticle = await Product.findAll({
        attributes: [
          "type",
          "title",
          "synopsis",
          "quantity",
          "salesPrice",
          "internalCode",
          "imageUrl",
          "status"
        ],
    where: { deletedAt: null, type: "article"},
  });
  const productArticles = rawProductArticle.map((rawProduct) =>
    rawProduct.get({ plain: true })
  );
  const articleList = getArticlesList(productArticles);

  return { data: articleList };
};

//Repetir para Libro
const getProductBooksFunction: SilmaAPIFunction = async () => {
  const db = await connectToDatabase();
  const { Product } = db;
  const rawProductBook = await Product.findAll({
        attributes: [
          "type",
          "title",
          "author",
          "synopsis",
          "quantity",
          "salesPrice",
          "authorPrice",
          "genre",
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
        ],
    where: { deletedAt: null, type: "book"},
  });
  const productBooks = rawProductBook.map((rawProduct) =>
    rawProduct.get({ plain: true })
  );
  const bookList = getBooksList(productBooks);

  return { data: bookList };
};

export const getProductArticles: APIGatewayProxyHandler = silmaAPIhandler(
  getProductArticlesFunction
);
export const getProductBooks: APIGatewayProxyHandler = silmaAPIhandler(
  getProductBooksFunction
);
