import React, { useState, FormEventHandler, ChangeEventHandler,  useEffect } from "react";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBIcon, } from 'mdb-react-ui-kit';
import { makeStyles } from "@material-ui/core/styles";
import "./Products.css";
import './AddProduct.css'
import { WhiteButton } from "../components/ButtonProduct";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { Button, Modal, Form, FormGroup, Col, Row, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { RiEdit2Line } from 'react-icons/ri';


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
        imageUrl: reader
      });


    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      mountArticleList();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <div>
        <h2 className={classes.title}>Productos</h2>
      </div>
      <>
      <MDBBtn className= {classes.formContainer}  onClick={toggleShow}>+</MDBBtn>
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
                  <Form.Control name='title' type="text" /*placeholder="Moby Dick"*/ required />
                </Form.Group>

                <Form.Group as={Col} controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control name='description'type="text" /*placeholder="Herman Melville"*/ required />
                </Form.Group>

                <Form.Group as={Col} controlId="formSellPrice">
                  <Form.Label>Precio Venta</Form.Label>
                  <Form.Control name='salesPrice' type="text" /*placeholder="600"*//>
                </Form.Group>

              <Form.Group controlId="formImage" className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control name='imageUrl' type="file" />
              </Form.Group>
              <Button type='submit' onClick={toggleShow}>Guardar Cambios</Button>
            </Form>
    
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}> Cerrar </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>

      
      <div className={classes.buttonContainer}>
        <WhiteButton onClick={mountBooks}>Libros</WhiteButton>
        <WhiteButton onClick={mountArticleList}>Artículos</WhiteButton>
      </div>
      <MDBTable align="middle">
        <MDBTableHead light>
          <tr>
            <th scope="col">Código interno</th>
            <th scope="col">Articulo</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio de venta</th>
            <th scope="col">Editar</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {values.productList.map((product, index) => (
            <tr key={index}>
              <td> {product.internalCode} </td>
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
                  </div>
                </div>
              </td>
              <td> {product.quantity} </td>
              <td> ${product.salesPrice} </td>
              <td>
              <Button onClick={toggleShow} style={{backgroundColor: 'white'}} >
                <RiEdit2Line style={{ color: 'blue' }} size={20} /> 
              </Button>
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
