import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { ProductAttributes } from "database/models";
import { connectToDatabase } from "database/sequelize";
import { SilmaAPIFunction, silmaAPIhandler } from "lib/handler/handler";
import { ProductCreate, ProductCreateSchema } from "types";
import {
  buildInternalCode,
  getArticlesList,
  getBooksList,
  getProductsSelectList,
} from "logic/product";
import { badRequest } from "utils";
import { json } from "sequelize";

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

const getProductsSelectFunction: SilmaAPIFunction = async () => {
  const db = await connectToDatabase();
  const { Product } = db;
  const rawProducts = await Product.findAll({
    attributes: ["id", "type", "title", "internalCode", "imageUrl"],
    where: { deletedAt: null, status: "activo" },
  });
  const products = rawProducts.map((rawProduct) =>
    rawProduct.get({ plain: true })
  );
  const productList = getProductsSelectList(products);

  return { data: productList };
};

const updateProductFunction: SilmaAPIFunction = async(
  event: APIGatewayEvent
) => {
  const {id} = event.queryStringParameters
  const data: ProductCreate = JSON.parse(event.body)
  const { error } = ProductCreateSchema.validate(data)
  if (error) {
    throw badRequest("Data was wrongly formatted");
  }

  const db = await connectToDatabase();
  const { Product } = db
  const oldProductRaw = await Product.findByPk(id)
  if(oldProductRaw === null || oldProductRaw === undefined){
    throw badRequest("This Product doesn´t exist")
  }
  
  const oldProduct = oldProductRaw.get({plain:true})
  const newProduct: ProductAttributes = {
    id: oldProduct.id,
    title: data.title ?? oldProduct.title,
    type: oldProduct.type,
    synopsis: data.synopsis ?? oldProduct.synopsis,
    salesPrice: data.salesPrice ?? oldProduct.salesPrice,
    internalCode: oldProduct.internalCode,
    imageUrl: data.imageUrl ?? oldProduct.imageUrl,
    status: oldProduct.status,
    deletedAt: oldProduct.deletedAt,
    createdAt: oldProduct.createdAt,
    // Atributos opcionales de libro
    authorPrice: data.authorPrice ?? oldProduct.authorPrice,
    numberPages: data.numberPages ?? oldProduct.numberPages,
    weight: data.weight ?? oldProduct.weight,
    dimensions: data.dimensions ?? oldProduct.dimensions,
    suggestedAges: data.suggestedAges ?? oldProduct.suggestedAges,
    isbn: data.isbn ?? oldProduct.isbn,
    publicationYear: data.publicationYear ?? oldProduct.publicationYear,
    edition: data.edition ?? oldProduct.edition,
    author: data.author ?? oldProduct.author,
    format: data.format ?? oldProduct.format,
    genre: data.genre ?? oldProduct.genre,
    language: data.language ?? oldProduct.language,
  }

  const updatedProduct = await oldProductRaw.update(newProduct)
  return {data: updatedProduct}
}

export const getProductArticles: APIGatewayProxyHandler = silmaAPIhandler(
  getProductArticlesFunction
);
export const getProductBooks: APIGatewayProxyHandler = silmaAPIhandler(
  getProductBooksFunction
);

export const getProductsSelect: APIGatewayProxyHandler = silmaAPIhandler(
  getProductsSelectFunction
);
export const updateProduct: APIGatewayProxyHandler = silmaAPIhandler(
  updateProductFunction
);
