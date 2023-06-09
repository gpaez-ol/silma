import React, { useState, useEffect } from "react";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody } from 'mdb-react-ui-kit';
import { makeStyles } from "@material-ui/core/styles";
import "./Products.css";
import './AddProduct.css'
import { WhiteButton } from "../components/ButtonProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Col, Row } from 'react-bootstrap';
import { RiEdit2Line } from 'react-icons/ri';
import { MultiSelect } from '@mantine/core';
import { CurrentProductItem, CurrentProductResponse } from "../types";
import { useQuery } from "@tanstack/react-query";
import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import ImageNA from '../img/ImageNotAvailable.jpg';

const getCurrentProducts = async () => {
  const response = await axios.get<CurrentProductResponse>('product-books');
  return response.data;
}

type RowProps = {
  book: CurrentProductItem;
}

function RowTable(props: RowProps) {
  const { book } = props;
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const API_url = "http://localhost:3000/local/";

  const gendreList = [
    { value: 'Fantasía', label: 'Fantasía' },
    { value: 'Magia', label: 'Magia' },
    { value: 'Aventura', label: 'Aventura' },
    { value: 'Suspenso', label: 'Suspenso' },
    { value: 'Sobrenatural', label: 'Sobrenatural' },
    { value: 'Romance', label: 'Romance' },
  ];

  const put = async (formData: any, reader: any) => {
    let genreData = [];
    if (formData.genre.includes(',')) {
      genreData = formData.genre.split(',');
    } else {
      genreData = [formData.genre];
    }

    try {
      const { data } = await axios.put(API_url + 'product', {
        id: book.id,
        internalCode: book.internalCode,
        title: formData.title ? formData.title : book.title,
        author: formData.author ? formData.author : book.author,
        synopsis: 'placeholder',
        salesPrice: formData.salesPrice ? formData.salesPrice : book.salesPrice,
        authorPrice: formData.authorPrice ? formData.authorPrice : book.authorPrice,
        genre: formData.genre ? genreData : book.genre,
        // TODO: change for select
        language: formData.language ? formData.language.toLowerCase() : book.language,
        // TODO: change for select
        format: formData.format ? formData.format.toLowerCase() : book.format,
        numberPages: formData.numberPages ? formData.numberPages : book.numberPages,
        suggestedAges: formData.suggestedAges ? formData.suggestedAges : book.suggestedAges,
        weight: formData.weight ? formData.weight : book.weight,
        dimensions: formData.dimensions ? formData.dimensions : book.dimensions,
        isbn: formData.isbn ? formData.isbn : book.isbn,
        publicationYear: formData.publicationYear ? formData.publicationYear : book.publicationYear,
        edition: formData.edition ? formData.edition : book.edition,
        imageUrl: formData.imageUrl.name ? reader : book.imageUrl,
        type: 'book'
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

  const genreString = () => {
    return book.genre.join(', ')
  }



  return (
    <><MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
      <MDBModalDialog size='lg'>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Actualizar Libro</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
          </MDBModalHeader>

          <MDBModalBody>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Título</Form.Label>
                <Form.Control name='title' type="text" placeholder={book.title} />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formAuthor">
                  <Form.Label>Autor</Form.Label>
                  <Form.Control name='author' type="text" placeholder={book.author} />
                </Form.Group>

                <Form.Group as={Col} controlId="formYear">
                  <Form.Label>Año</Form.Label>
                  <Form.Control name='publicationYear' type="number" placeholder={book.publicationYear.toString()} />
                </Form.Group>

                <Form.Group as={Col} controlId="formEdition">
                  <Form.Label>Edición</Form.Label>
                  <Form.Control name='edition' type="number" placeholder={book.edition} />
                </Form.Group>
              </Row>

              <Row className="mb-3">

                <Form.Group as={Col} controlId="formSellPrice">
                  <Form.Label>Precio de venta</Form.Label>
                  <Form.Control name='salesPrice' type="number" step="0.1" placeholder={book.salesPrice.toString()} />
                </Form.Group>

                <Form.Group as={Col} controlId="formSellAuthor">
                  <Form.Label>Precio de autor</Form.Label>
                  <Form.Control name='authorPrice' type="number" step="0.1" placeholder={book.authorPrice.toString()} />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGenre">
                  <Form.Label>Género</Form.Label>
                  <MultiSelect name='genre'
                    data={gendreList}
                    placeholder={genreString()}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formFormat">
                  <Form.Label>Formato</Form.Label>
                  <Form.Select name='format' placeholder={book.format}>
                    <option disabled></option>
                    <option>Pasta blanda</option>
                    <option>Pasta dura</option>
                    <option>Ebook</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formLanguage">
                  <Form.Label>Idioma</Form.Label>
                  <Form.Select name='language' placeholder={book.language}>
                    <option disabled></option>
                    <option>Inglés</option>
                    <option>Español</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formPageNum">
                  <Form.Label>Número de páginas</Form.Label>
                  <Form.Control name='numberPages' type="number" placeholder={book.numberPages.toString()} />
                </Form.Group>

                <Form.Group as={Col} controlId="formAges">
                  <Form.Label>Edades sugeridas</Form.Label>
                  <Form.Control name='suggestedAges' type="text" placeholder={book.suggestedAges} />
                </Form.Group>

                <Form.Group as={Col} controlId="formDimensions">
                  <Form.Label>Dimensiones</Form.Label>
                  <Form.Control name='dimensions' type="text" placeholder={book.dimensions} />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formISBN">
                <Form.Label>ISBN</Form.Label>
                <Form.Control name='isbn' placeholder={book.isbn} />
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
      <tr key={book.internalCode}>
        <td>{book.internalCode}</td>
        <td>
          <div className='d-flex align-items-center'>
            <img
              src={book.imageUrl}
              alt=''
              style={{ width: '45px', height: '45px' }}
              className='rounded-circle' />
            <div className='ms-3'>
              <p className='fw-bold mb-1'>{book.title}<MDBBadge color='success' pill>{book.status}</MDBBadge> </p>
              <p className='text-muted mb-0'>{book.author} - {book.publicationYear} </p>
            </div>
          </div>
        </td>
        <td> {book.quantity}</td>
        <td> {book.salesPrice} </td>
        <td> {book.authorPrice} </td>
        <td> {genreString()} </td>
        <td> {book.format} </td>
        <td> {book.language} </td>
        <td> {book.edition} </td>
        <td> {book.numberPages} </td>
        <td> {book.suggestedAges} </td>
        <td> {book.dimensions} </td>
        <td> {book.isbn} </td>
        <td>
          <Button onClick={toggleShow} style={{ backgroundColor: 'white' }}>
            <RiEdit2Line style={{ color: 'blue' }} size={20} />
          </Button>
        </td>
      </tr></>
  );
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
        imageUrl: formData.imageUrl.name ? reader : ImageNA,
        type: 'book'
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

  const { isLoading, data: currentProducts } = useQuery(
    ['current-products'],
    () => getCurrentProducts(),
    {
      select: (data) => data.data,
      onError: (error: any) => {
        console.log("Something went wrong");
      }
    }
  );

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
                    <Form.Control name='title' type="text" placeholder="Ej: Moby Dick" required />
                  </Form.Group>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formAuthor">
                      <Form.Label>Autor</Form.Label>
                      <Form.Control name='author' type="text" placeholder="Herman Melville" required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formYear">
                      <Form.Label>Año</Form.Label>
                      <Form.Control name='publicationYear' type="number" placeholder="1900" required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formEdition">
                      <Form.Label>Edición</Form.Label>
                      <Form.Control name='edition' type="number" placeholder="1" required />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">

                    <Form.Group as={Col} controlId="formSellPrice">
                      <Form.Label>Precio de venta</Form.Label>
                      <Form.Control name='salesPrice' type="number" step="0.1" placeholder="600" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formSellAuthor">
                      <Form.Label>Precio de autor</Form.Label>
                      <Form.Control name='authorPrice' type="number" step="0.1" placeholder="500" />
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
                      <Form.Control name='numberPages' type="number" placeholder="800" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formAges">
                      <Form.Label>Edades sugeridas</Form.Label>
                      <Form.Control name='suggestedAges' type="text" placeholder="18+" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formDimensions">
                      <Form.Label>Dimensiones</Form.Label>
                      <Form.Control name='dimensions' type="text" placeholder="10x15" />
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-3" controlId="formISBN">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control name='isbn' placeholder="1234567891234" />
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
        <WhiteButton onClick={mountBookList}>Libros</WhiteButton>
        <WhiteButton onClick={mountArticles}>Artículos</WhiteButton>
      </div>
      <MDBTable align='middle'>
        {
          isLoading ||
            currentProducts === null ||
            currentProducts === undefined ? (
            <Grid container justifyContent="center">
              Loading
            </Grid>
          ) : (
            <><MDBTableHead light>
              <tr>
                <th scope='col' className="text-center align-middle">Código interno</th>
                <th scope='col' className="text-center align-middle">Libro</th>
                <th scope='col' className="text-center align-middle">Cantidad</th>
                <th scope='col' className="text-center align-middle">Precio venta</th>
                <th scope='col' className="text-center align-middle">Precio autor</th>
                <th scope='col' className="text-center align-middle">Género</th>
                <th scope='col' className="text-center align-middle">Formato</th>
                <th scope='col' className="text-center align-middle">Idioma</th>
                <th scope='col' className="text-center align-middle">Edición</th>
                <th scope='col' className="text-center align-middle"># págs</th>
                <th scope='col' className="text-center align-middle">Edades sugeridas</th>
                <th scope='col' className="text-center align-middle">Dimensiones</th>
                <th scope='col' className="text-center align-middle">ISBN</th>
                <th scope='col' className="text-center align-middle">Editar</th>
              </tr>
            </MDBTableHead>
              <MDBTableBody>
                {currentProducts.map((products) => (
                  <RowTable book={products} />
                ))}
              </MDBTableBody></>

          )
        }
      </MDBTable >

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