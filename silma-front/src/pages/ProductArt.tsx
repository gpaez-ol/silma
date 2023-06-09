import React, { useState, useEffect } from "react";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody } from 'mdb-react-ui-kit';
import { makeStyles } from "@material-ui/core/styles";
import "./Products.css";
import './AddProduct.css'
import { WhiteButton } from "../components/ButtonProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Col } from 'react-bootstrap';
import { RiEdit2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { CurrentArticleItem, CurrentArticleResponse } from "../types";
import { useQuery } from "@tanstack/react-query";
import { Grid } from '@material-ui/core';
import ImageNA from '../img/ImageNotAvailable.jpg';


const getCurrentProducts = async () => {
  const response = await axios.get<CurrentArticleResponse>('product-articles');
  return response.data;
}

type RowProps = {
  article: CurrentArticleItem;
}

function RowTable(props: RowProps) {
  const { article } = props;
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const API_url = "http://localhost:3000/local/";

  const put = async (formData: any, reader: any) => {
    try {
      const { data } = await axios.put(API_url + 'product', {
        id: article.id,
        internalCode: article.internalCode,
        title: formData.title ? formData.title : article.title,
        synopsis: formData.description ? formData.description : article.description,
        salesPrice: formData.salesPrice ? formData.salesPrice : article.salesPrice,
        imageUrl: formData.imageUrl.name ? reader : article.imageUrl,
        type: 'article'
      });
      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  }

  const readForm = (formData: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(formData.imageUrl);
    reader.onload = function () {
      put(formData, reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const handleSubmit = (event: { preventDefault: () => void; currentTarget: any; }) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    readForm(data);
  };

  return (
    <>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog size='lg'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Agregar Artículo</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>Título</Form.Label>
                  <Form.Control name='title' type="text" placeholder={article.title} />
                </Form.Group>

                <Form.Group as={Col} controlId="formDescription">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control name='description' type="text" placeholder={article.description} />
                </Form.Group>

                <Form.Group as={Col} controlId="formSellPrice">
                  <Form.Label>Precio Venta</Form.Label>
                  <Form.Control name='salesPrice' type="number" step="0.1" placeholder={article.salesPrice.toString()} />
                </Form.Group>

                <Form.Group controlId="formImage" className="mb-3">
                  <Form.Label>Imagen (Se puede dejar en blanco si no se requiere cambiar imagen)</Form.Label>
                  <Form.Control name='imageUrl' type="file" />
                </Form.Group>
                <MDBBtn type='submit' onClick={toggleShow}>Guardar Cambios</MDBBtn>
                <MDBBtn color='secondary' onClick={toggleShow}> Cerrar </MDBBtn>
              </Form>

            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <tr key={article.internalCode}>
        <td> {article.internalCode} </td>
        <td>
          <div className="d-flex align-items-center">
            <img
              src={article.imageUrl}
              alt=""
              style={{ width: "45px", height: "45px" }}
              className="rounded-circle"
            />
            <div className="ms-3">
              <p className="fw-bold mb-1">
                {article.title}
                {article.status === "activo" ? (
                  <MDBBadge color="success" pill>
                    Activo
                  </MDBBadge>
                ) : (
                  <MDBBadge color="danger" pill>
                    Inactivo
                  </MDBBadge>
                )}
              </p>
            </div>
          </div>
        </td>
        <td> {article.quantity} </td>
        <td> ${article.salesPrice} </td>
        <td>
          <Button onClick={toggleShow} style={{ backgroundColor: 'white' }} >
            <RiEdit2Line style={{ color: 'blue' }} size={20} />
          </Button>
        </td>
      </tr>
    </>
  )
}


export default function App(classes: any) {
  classes = useStyles();
  const navigate = useNavigate();
  const API_url = "http://localhost:3000/local/";
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const [values, setValues] = useState({
    productList: [
      {
        internalCode: "",
        title: "",
        synopsis: "",
        salesPrice: 0,
        quantity: "",
        imageUrl: "",
        status: "",
      },
    ],
  });

  const post = async (formData: any, reader: any) => {
    try {
      const { data } = await axios.post(API_url + 'product', {
        title: formData.title,
        type: 'article',
        synopsis: formData.description,
        salesPrice: formData.salesPrice,
        imageUrl: formData.imageUrl.name ? reader : ImageNA
      });
      toast.success("Nuevo producto registrado")
      window.location.reload()
    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal. Revise los datos")
    }
  }

  const readForm = (formData: any) => {

    let reader = new FileReader();
    reader.readAsDataURL(formData.imageUrl);
    reader.onload = function () {
      post(formData, reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }


  const handleSubmit = (event: { preventDefault: () => void; currentTarget: any; }) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    readForm(data);
  };

  const mountArticleList = async () => {
    try {
      const { data } = await axios.get(API_url + "product-articles");
      const dataUnstructured = data.data;
      setValues({ productList: dataUnstructured });
    } catch (error) {
      console.log(error);
    }
  };

  const mountBooks = () => {
    navigate("/product-books");
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      mountArticleList();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const { isLoading, data: currentProducts } = useQuery(
    ['current-articles'],
    () => getCurrentProducts(),
    {
      select: (data) => data.data,
      onError: (error: any) => {
        console.log("Something went wrong");
      }
    }
  );


  return (
    <>
      <div>
        <h2 className={classes.title}>Productos</h2>
      </div>
      <>
        <MDBBtn className={classes.formContainer} onClick={toggleShow}>+</MDBBtn>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
          <MDBModalDialog size='lg'>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Agregar Artículo</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
              </MDBModalHeader>

              <MDBModalBody>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Título</Form.Label>
                    <Form.Control name='title' type="text" placeholder="ej: Separador" required />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formDescription">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control name='description' type="text" placeholder="Separador de libros" required />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formSellPrice">
                    <Form.Label>Precio Venta</Form.Label>
                    <Form.Control name='salesPrice' type="number" step="0.1" placeholder="5" />
                  </Form.Group>

                  <Form.Group controlId="formImage" className="mb-3">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control name='imageUrl' type="file" />
                  </Form.Group>
                  <MDBBtn type='submit' onClick={toggleShow}>Guardar Cambios</MDBBtn>
                  <MDBBtn color='secondary' onClick={toggleShow}> Cerrar </MDBBtn>
                </Form>

              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>


      <div className={classes.buttonContainer}>
        <WhiteButton onClick={mountBooks}>Libros</WhiteButton>
        <WhiteButton onClick={mountArticleList}>Artículos</WhiteButton>
      </div>
      <MDBTable align="middle">
        {
          isLoading ||
            currentProducts === null ||
            currentProducts == undefined ? (
            <Grid container justifyContent="center">
              Loading
            </Grid>
          ) : (
            <><MDBTableHead light>
              <tr>
                <th scope='col'>Código interno</th>
                <th scope='col'>Articulo</th>
                <th scope='col'>Cantidad</th>
                <th scope='col'>Precio de venta</th>
                <th scope='col'>Editar</th>
              </tr>
            </MDBTableHead>
              <MDBTableBody>
                {currentProducts.map((products) => (
                  <RowTable article={products} />
                ))}
              </MDBTableBody></>

          )
        }
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
  formContainer: {
    position: "absolute",
    left: "90%",
    top: "14%",
    fontSize: 20,
    margin: "auto",
    padding: "10px",
    width: "3%",
    maxWidth: "200px",
    background: "rgba(16,95,158,1)100%",
    fontWeight: 'bold',
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