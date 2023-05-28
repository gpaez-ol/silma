import React, { useState, FormEventHandler, ChangeEventHandler, useEffect } from "react";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBIcon, } from 'mdb-react-ui-kit';
import { makeStyles } from "@material-ui/core/styles";
import "./Products.css";
import './AddProduct.css'
import { WhiteButton } from "../components/ButtonProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, FormGroup, Col, Row, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { RiEdit2Line } from 'react-icons/ri';
import { MultiSelect } from '@mantine/core';


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

  const gendreList = [
    { value: 'Fantasía', label: 'Fantasía' },
    { value: 'Magia', label: 'Magia' },
    { value: 'Aventura', label: 'Aventura' },
    { value: 'Suspenso', label: 'Suspenso' },
    { value: 'Sobrenatural', label: 'Sobrenatural' },
    { value: 'Romance', label: 'Romance' },
  ];

  const post = async (formData: any, reader: any) => {
    let genreData = [];
    if (formData.genre.includes(',')) {
      genreData = formData.genre.split(',');
    } else {
      genreData = [formData.genre];
    }

    console.log(genreData);


    try {
      const { data } = await axios.post(API_url + 'product', {
        title: formData.title,
        author: formData.author,
        synopsis: 'placeholder',
        salesPrice: formData.salesPrice,
        authorPrice: formData.authorPrice,
        genre: genreData,
        // TODO: change for select
        language: formData.language.toLowerCase(),
        // TODO: change for select
        format: formData.format.toLowerCase(),
        numberPages: formData.numberPages,
        suggestedAges: formData.suggestedAges,
        weight: formData.weight,
        dimensions: formData.dimensions,
        isbn: formData.isbn,
        publicationYear: formData.publicationYear,
        edition: formData.edition,
        imageUrl: reader,
        type: 'book'
      });


    } catch (error) {
      console.log(error);
    }
  }

  const readForm = (formData: any) => {
    console.log(typeof(formData.genre));
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

      <>
        <MDBBtn className={classes.formContainer} onClick={toggleShow}>+</MDBBtn>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
          <MDBModalDialog size='lg'>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Agregar Libro</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
              </MDBModalHeader>

              <MDBModalBody>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Título</Form.Label>
                    <Form.Control name='title' type="text" /*placeholder="Moby Dick"*/ required />
                  </Form.Group>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formAuthor">
                      <Form.Label>Autor</Form.Label>
                      <Form.Control name='author' type="text" /*placeholder="Herman Melville"*/ required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formYear">
                      <Form.Label>Año</Form.Label>
                      <Form.Control name='publicationYear' type="text" /*placeholder="1900"*/ required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formEdition">
                      <Form.Label>Edición</Form.Label>
                      <Form.Control name='edition' type="text" /*placeholder="1"*/ required />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">

                    <Form.Group as={Col} controlId="formSellPrice">
                      <Form.Label>Precio de venta</Form.Label>
                      <Form.Control name='salesPrice' type="text" /*placeholder="600"*/ />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formSellAuthor">
                      <Form.Label>Precio de autor</Form.Label>
                      <Form.Control name='authorPrice' type="text" /*placeholder="500"*/ />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGenre">
                      <Form.Label>Género</Form.Label>
                      <MultiSelect name='genre'
                        data={gendreList}
                        placeholder="Selecciona hasta 3"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formFormat">
                      <Form.Label>Formato</Form.Label>
                      <Form.Select name='format'>
                        <option disabled ></option>
                        <option>Pasta blanda</option>
                        <option>Pasta dura</option>
                        <option>Ebook</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formLanguage">
                      <Form.Label>Idioma</Form.Label>
                      <Form.Select name='language'>
                        <option disabled ></option>
                        <option>Inglés</option>
                        <option>Español</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formPageNum">
                      <Form.Label>Número de páginas</Form.Label>
                      <Form.Control name='numberPages' type="text" /*placeholder="800"*/ />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formAges">
                      <Form.Label>Edades sugeridas</Form.Label>
                      <Form.Control name='suggestedAges' type="text" /*placeholder="18+"*/ />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formDimensions">
                      <Form.Label>Dimensiones</Form.Label>
                      <Form.Control name='dimensions' type="text" /*placeholder="10x15"*/ />
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-3" controlId="formISBN">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control name='isbn' /*placeholder="1234567891234" */ />
                  </Form.Group>

                  <Form.Group controlId="formImage" className="mb-3">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control name='imageUrl' type="file" />
                  </Form.Group>
                  <MDBBtn type='submit'>Guardar Cambios</MDBBtn>
                  <MDBBtn color='secondary' onClick={toggleShow}> Cerrar </MDBBtn>
                </Form>

              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>

      <div className={classes.buttonContainer}>
        <WhiteButton onClick={mountBookList}>Libros</WhiteButton>
        <WhiteButton onClick={mountArticles}>Artículos</WhiteButton>
      </div>
      <MDBTable align='middle'>
        <MDBTableHead light>
          <tr>
            <th scope='col'>Código interno</th>
            <th scope='col'>Libro</th>
            <th scope='col'>Cantidad</th>
            <th scope='col'>Precio de venta</th>
            <th scope='col'>Precio de autor</th>
            <th scope='col'>Género</th>
            <th scope='col'>Formato</th>
            <th scope='col'>Idioma</th>
            <th scope='col'>Edición</th>
            <th scope='col'>Número de páginas</th>
            <th scope='col'>Edades sugeridad</th>
            <th scope='col'>Dimensiones</th>
            <th scope='col'>ISBN</th>
            <th scope='col'>Editar</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {values.productList.map((product, index) => (
            <tr key={index}>
              <td>{product.internalCode}</td>
              <td>
                <div className='d-flex align-items-center'>
                  <img
                    src={product.imageUrl}
                    alt=''
                    style={{ width: '45px', height: '45px' }}
                    className='rounded-circle'
                  />
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>{product.title}<MDBBadge color='success' pill>{product.status}</MDBBadge> </p>
                    <p className='text-muted mb-0'>{product.author} - {product.publicationYear} </p>
                  </div>
                </div>
              </td>
              <td> {product.quantity}</td>
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
                <Button onClick={toggleShow} style={{ backgroundColor: 'white' }} >
                  <RiEdit2Line style={{ color: 'blue' }} size={20} />
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>A1234</td>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src='https://m.media-amazon.com/images/I/61ZMLiTYxDL.jpg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>Drácula  <MDBBadge color='success' pill> Disponible </MDBBadge> </p>
                  <p className='text-muted mb-0'>Bram Stoker - 1897 </p>
                </div>
              </div>
            </td>
            <td> 10 </td>
            <td> $500 </td>
            <td> $400 </td>
            <td>Fantasía</td>
            <td>Pasta blanda</td>
            <td>Español</td>
            <td>1</td>
            <td>800</td>
            <td>18+</td>
            <td>10x15</td>
            <td>1234567891234</td>
            <td>



            </td>
          </tr>
          <tr>
            <td>B1234</td>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src='https://m.media-amazon.com/images/I/71Qe2yIBFmL.jpg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>Moby Dick  <MDBBadge color='danger' pill> Agotado </MDBBadge> </p>
                  <p className='text-muted mb-0'>Herman Melvill - 1900</p>
                </div>
              </div>
            </td>
            <td> 15 </td>
            <td> $600 </td>
            <td> $500 </td>
            <td>Aventura</td>
            <td>E-book</td>
            <td>Inglés</td>
            <td>4</td>
            <td>1000</td>
            <td>14+</td>
            <td>10x15</td>
            <td>1234567891234</td>
            <td>



            </td>
          </tr>
          <tr>
            <td>C1234</td>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src='https://imagessl2.casadellibro.com/a/l/t5/92/9788419087492.jpg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>El principito  <MDBBadge color='success' pill> Disponible </MDBBadge>  </p>
                  <p className='fw-normal mb-1'>Antoine de Saint-Exupéry - 1943</p>
                </div>
              </div>
            </td>
            <td> 5 </td>
            <td> $700 </td>
            <td> $600 </td>
            <td>Magia</td>
            <td>Pasta dura</td>
            <td>Español</td>
            <td>2</td>
            <td>400</td>
            <td>10+</td>
            <td>10x15</td>
            <td>1234567891234</td>
            <td>



            </td>
          </tr>
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
