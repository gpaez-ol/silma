import { ProductAttributes } from "database/models";
//import { Product}
import { writeToConsole } from "utils";

/*
* It registers a new product to the database after the data has been entered
* All data needs to be completed.
* Must distinguish between Books and Articles
* @params (ATRIBUTOS DE PRODUCTO [LIBRO/ARTICULO])
* @returns none
*/

export const addProduct = async(product: ProductAttributes) => {
    var nombre = product.title,
        precio = product.price,
        img = product.imageUrl,
        cantidad = product.amount,
        codigo = product.inner_code,
        estatus = product.status
 //Si el producto es un libro
    if (product.type = "sticker"){
        var descripcion = product.description
        //Agrega articulo
        const newProduct = await Product.create({
            title: nombre,
            type: product.type,
            price: precio,
            imageUrl: img,
            amount: cantidad,
            inner_code: codigo,
            status: estatus,
            description: "",
            author: "",
            sinopsis: "",
            language: "",
            gen1: "",
            gen2: "",
            gen3: "",
            format: "",
            pages: "",
            ages: "",
            isdn: "",
            publish_year: "",
            edition: "",
            weight: "",
            height: "",
            large: "",
            wide: ""
        })
        return newProduct
    } //Si es un articulo 
    else if (product.type = "book"){
        var autor = product.author,
            sinopsis = product.sinopsis,
            idioma = product.language,
            genero1 = product.gen1,
            genero2 = product.gen2,
            genero3 = product.gen3,
            formato = product.format,
            paginas = product.pages,
            edades = product.ages,
            isdn = product.isdn,
            publicacion = product.publish_year,
            edicion = product.edition
        if (product.format !="e-book"){
            //Si el formato del libro es un e-book, no se incluye el peso ni las dimensiones
            var peso = product.weight,
                alto = product.height,
                largo = product.large,
                ancho = product.wide
                //Agrega libro con dimensiones
            const newProduct = await Product.create({
                title: nombre,
                type: product.type,
                price: precio,
                imageUrl: img,
                amount: cantidad,
                inner_code: codigo,
                status: estatus,
                description: "",
                author: autor,
                sinopsis: sinopsis,
                language: idioma,
                gen1: genero1,
                gen2: genero2,
                gen3: genero3,
                format: formato,
                pages: paginas,
                ages: edades,
                isdn: isdn,
                publish_year: publicacion,
                edition: edicion,
                weight: peso,
                height: alto,
                large: largo,
                wide: ancho
            })
            return newProduct
        }//Agrega libro sin dimensiones
        const newProduct = await Product.create({
            title: nombre,
            type: product.type,
            price: precio,
            imageUrl: img,
            amount: cantidad,
            inner_code: codigo,
            status: estatus,
            description: "",
            author: autor,
            sinopsis: sinopsis,
            language: idioma,
            gen1: genero1,
            gen2: genero2,
            gen3: genero3,
            format: formato,
            pages: paginas,
            ages: edades,
            isdn: isdn,
            publish_year: publicacion,
            edition: edicion,
            weight: 0,
            height: 0,
            large: 0,
            wide: 0
        })
        return newProduct
    }
}