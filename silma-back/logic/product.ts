import { ProductAttributes } from "database/models";
import { writeToConsole } from "utils";
import { ProductArticleItem, ProductBookItem } from "types";

//Get articulos
export const getArticlesList = (products: ProductAttributes[]): ProductArticleItem[] =>{
    const articles: ProductArticleItem[] = products.map((products)=>{
        return{
            id: products.id,
            title: products.title,
            description: products.synopsis,
            quantity: products.quantity,
            salesPrice: products.price,
            internalCode: products.internalCode,
            imageUrl: products.imageUrl,
            status: products.status
        }
    })
    return articles
}

//Get libros
export const getBooksList = (products: ProductAttributes[]): ProductBookItem[] =>{
    const books: ProductBookItem[] = products.map((products)=>{
        return{
            id: products.id,
            title: products.title,
            author: products.author,
            synopsis: products.synopsis,
            quantity: products.quantity,
            salesPrice: products.price,
            authorPrice: products.authorPrice,
            gender: products.gender,
            language: products.language,
            format: products.format,
            numberPages: products.numberPages,
            suggestedAges: products.suggestedAges,
            weight: products.weight,
            dimensions: products.dimensions,
            internalCode: products.internalCode, 
            isbn: products.isbn,
            publicationYear: products.publicationYear,
            edition: products.edition,
            imageUrl: products.imageUrl,
            status: products.status
        }
    })
    return books
}