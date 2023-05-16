import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { ProductAttributes } from "database/models";
import { connectToDatabase } from "database/sequelize";
import { SilmaAPIFunction, silmaAPIhandler } from "lib/handler/handler";
import { ProductCreate, ProductCreateSchema } from "types";
import {
  buildInternalCode,
  getArticlesList,
  getBooksList,
} from "logic/product";
import { badRequest } from "utils";

const createProductFunction: SilmaAPIFunction = async (
  event: APIGatewayEvent
) => {
  const data: ProductCreate = JSON.parse(event.body);
  const { error } = ProductCreateSchema.validate(data);
  if (error) {
    throw badRequest(error.message);
  }
  const db = await connectToDatabase();
  const { Product } = db;
  const itemNumber = await Product.findAndCountAll({
    where: { author: data.author ?? null },
  });
  const internalCode = buildInternalCode(
    ++itemNumber.count,
    data.author ?? null
  );

  const prodDB: ProductAttributes = {
    createdAt: new Date(),
    title: data.title,
    type: data.type,
    synopsis: data.synopsis,
    salesPrice: data.salesPrice,
    internalCode: internalCode,
    imageUrl: data.imageUrl,
    status: "activo",
    deletedAt: null,
    // Atributos opcionales de libro
    authorPrice: data.authorPrice ?? null,
    numberPages: data.numberPages ?? null,
    weight: data.weight ?? null,
    dimensions: data.dimensions ?? null,
    suggestedAges: data.suggestedAges ?? null,
    isbn: data.isbn ?? null,
    publicationYear: data.publicationYear ?? null,
    edition: data.edition ?? null,
    author: data.author ?? null,
    format: data.format ?? null,
    genre: data.genre ?? null,
    language: data.language ?? null,
  };
  const newProduct = await Product.create(prodDB);

  return { data: newProduct };
};

export const createProduct: APIGatewayProxyHandler = silmaAPIhandler(
  createProductFunction
);

const getProductArticlesFunction: SilmaAPIFunction = async () => {
  const db = await connectToDatabase();
  const { Product, ProductInOrder } = db;
  const rawProductArticle = await Product.findAll({
    attributes: [
      "type",
      "title",
      "synopsis",
      "salesPrice",
      "internalCode",
      "imageUrl",
      "status",
    ],
    include: [{ model: ProductInOrder, attributes: ["amount"] }],
    where: { deletedAt: null, type: "article" },
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
  const { Product, ProductInOrder } = db;
  const rawProductBook = await Product.findAll({
    attributes: [
      "type",
      "title",
      "author",
      "synopsis",
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
      "status",
    ],
    include: [{ model: ProductInOrder, attributes: ["amount"] }],
    where: { deletedAt: null, type: "book" },
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
