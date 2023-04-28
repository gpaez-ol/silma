import React, { useState, useEffect } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { makeStyles } from "@material-ui/core/styles";
import "./Products.css";
import { WhiteButton } from "../components/ButtonProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function App(classes: any) {
  classes = useStyles();
  const navigate = useNavigate();
  const API_url = "http://localhost:3000/local/";

  const [values, setValues] = useState({
    productList: [
      {
        internalCode: "",
        title: "",
        author: "",
        synopsis: "",
        salesPrice: 0,
        authorPrice: 0,
        genre: "",
        language: "",
        format: "",
        numberPages: 0,
        suggestedAges: "",
        weight: 0,
        dimensions: "",
        isbn: "",
        quantity: "",
        publicationYear: "",
        edition: "",
        imageUrl: "",
        status: "",
      },
    ],
  });

  const mountBookList = async () => {
    try {
      const { data } = await axios.get(API_url + "product-books");
      const dataUnstructured = data.data;
      setValues({ productList: dataUnstructured });
    } catch (error) {
      console.log(error);
    }
  };

  const mountArticles = () => {
    navigate("/product-articles");
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      mountBookList();
    }
    ignore = true;
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <div>
        <h2 className={classes.title}>Productos</h2>
      </div>
      <div className={classes.buttonContainer}>
        <WhiteButton onClick={mountBookList}>Libros</WhiteButton>
        <WhiteButton onClick={mountArticles}>Artículos</WhiteButton>
      </div>
      <MDBTable responsive align="middle">
        <MDBTableHead light>
          <tr>
            <th scope="col">Código interno</th>
            <th scope="col">Libro</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio de venta</th>
            <th scope="col">Precio de autor</th>
            <th scope="col">Genero</th>
            <th scope="col">Formato</th>
            <th scope="col">Idioma</th>
            <th scope="col">Edición</th>
            <th scope="col">Número de páginas</th>
            <th scope="col">Edades sugeridas</th>
            <th scope="col">Dimensiones</th>
            <th scope="col">ISBN</th>
            <th scope="col">Editar</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {values.productList.map((product, index) => (
            <tr key={index}>
              <td>{product.internalCode}</td>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={product.imageUrl}
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">
                      {product.title}
                      {product.status === "activo" ? (
                        <MDBBadge color="success" pill>
                          Activo
                        </MDBBadge>
                      ) : (
                        <MDBBadge color="danger" pill>
                          Inactivo
                        </MDBBadge>
                      )}
                    </p>
                    <p className="text-muted mb-0">
                      {product.author} - {product.publicationYear}{" "}
                    </p>
                  </div>
                </div>
              </td>
              <td> {product.quantity} </td>
              <td> ${product.salesPrice} </td>
              <td> ${product.authorPrice} </td>
              <td> {product.genre} </td>
              <td> {product.format} </td>
              <td> {product.language} </td>
              <td> {product.edition} </td>
              <td> {product.numberPages} </td>
              <td> {product.suggestedAges} </td>
              <td> {product.dimensions} </td>
              <td> {product.isbn} </td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </>
  );
}

const useStyles = makeStyles(() => ({
  title: {
    textAlign: "center",
    fontSize: 40,
    //fontWeight: 'bold',
    paddingTop: "25px",
    paddingBottom: "25px",
    color: "black",
    fontfamily: "Bebas Neue",
  },
  buttonContainer: {
    justifyContent: "space-evenly",
    display: "flex",
    flexDirection: "row",
    width: "30%",
    margin: "auto",
    paddingBottom: "25px",
  },
  tableHead: {
    backgroundImage:
      "linear-gradient(to bottom, rgba(223,31,38,1)0%, rgba(223,31,38,1)50%, rgba(223,31,38,1)100%)",
    color: "#202843",
    fontWeight: "bolder",
  },
}));
