import React, {useState} from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, } from 'mdb-react-ui-kit';
import { makeStyles } from "@material-ui/core/styles";
import './Products.css';
import './AddProduct.css'
import { WhiteButton } from '../components/ButtonProduct';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form, FormGroup, Col, Row, InputGroup } from 'react-bootstrap';

export default function App(classes: any) {
  classes = useStyles();
  const navigate = useNavigate();
  const API_url = "http://localhost:3000/local/";


  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const [values, setValues] = useState({
    productList: [{
      internalCode:'',
      title:'',
      author:'',
      synopsis:'',
      salesPrice:0,
      authorPrice:0,
      genre:'',
      language:'',
      format:'',
      numberPages:0,
      suggestedAges:'',
      weight:0,
      dimensions:'',
      isbn:'',
      quantity:'',
      publicationYear:'',
      edition:'',
      imageUrl:'',
      status:''
    }]
  });

  const mountBookList = async () => {
    try{
      /*
        axios.get(API_url + 'product-books').then( res => {
        const books = res.data;
        console.log(books);
        setValues({productList: books});
        navigate('/product-books');
        });
      */
      const books = await axios.get(API_url + 'product-books');
      console.log(books.data);
      setValues({productList: books.data});
      navigate('/product-books');
    }catch(err){
      console.log("Loading error")
    }
  }

  const mountArticles = () =>{
    navigate('/product-articles');
  }

  /*useEffect(()=>{
    window.addEventListener('load',mountBookList);
    return()=>{
      window.removeEventListener('load',mountBookList);
    }
  });*/

  const handleChange = (name: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value);
    setValues({ ...values, [name]: e.target.value });
  };


  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setBasicModal(!basicModal);
    console.log(values.productList[0].author);
    try {
      const { data } = await axios.post(API_url + 'product-books', {
        title: values.productList[0].title,
        author: values.productList[0].author,
        synopsis: values.productList[0].synopsis,
        salesPrice: values.productList[0].salesPrice,
        authorPrice: values.productList[0].authorPrice,
        genre: 'fantasia',
        language: values.productList[0].language,
        format: values.productList[0].format,
        numberPages: values.productList[0].numberPages,
        suggestedAges:values.productList[0].suggestedAges,
        weight: values.productList[0].weight,
        dimensions: values.productList[0].dimensions,
        isbn: values.productList[0].isbn,
        quantity: values.productList[0].quantity,
        publicationYear: values.productList[0].publicationYear,
        edition: values.productList[0].edition,
        imageUrl: values.productList[0].imageUrl,
        status: 'activo'
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  
    //e.preventDefault();
    
    /*
    try {
        const { data } = await axios.post(API_url + 'product-books', {
            title,
            author
        });

        console.log(data);

        //setValues({ email: '', password: '', showPassword: false});
        console.log("Login succesfully!");
        navigate('/');

    } catch (err) {
        console.log("Login fail!");
    }
  }*/

  return (
    <>
    <div>
      <h2 className = {classes.title}>Productos</h2>
    </div>

    <>
      <MDBBtn className= {classes.formContainer}  onClick={toggleShow}>+</MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog size='lg'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Agregar Libro</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
            <Form>
                <Form.Group className="mb-3" controlId="formGridPassword">
                  <Form.Label>Título</Form.Label>
                  <Form.Control type="text" /*placeholder="Moby Dick"*/ required onChange={handleChange("title")}/>
                </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAddress1">
                  <Form.Label>Autor</Form.Label>
                  <Form.Control type="text" /*placeholder="Herman Melville"*/ required onChange={handleChange("author")}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAddress1">
                  <Form.Label>Año</Form.Label>
                  <Form.Control type="text" /*placeholder="1900"*/ required onChange={handleChange("publicationYear")}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAddress1">
                  <Form.Label>Edicion</Form.Label>
                  <Form.Control type="text" /*placeholder="1"*/ required onChange={handleChange("edition")}/>
                </Form.Group>
              </Row>

              <Row className="mb-3">

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Precio Venta</Form.Label>
                  <Form.Control type="text" /*placeholder="600"*/ onChange={handleChange("salesPrice")}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Precio Autor</Form.Label>
                  <Form.Control type="text" /*placeholder="500"*/ onChange={handleChange("authorPrice")}/>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Genero</Form.Label>
                  <Form.Select defaultValue="Selecciona...">
                    <option> </option>
                    <option>Fantasía</option>
                    <option>Magia</option>
                    <option>Aventura</option>
                    <option>Suspenso</option>
                    <option>Sobrenatural</option>
                    <option>Romance</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Formato</Form.Label>
                  <Form.Control type="text" /*placeholder="600"*/ onChange={handleChange("format")}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Idioma</Form.Label>
                  <Form.Control type="text" /*placeholder="500"*/ onChange={handleChange("language")}/>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Número de paginas</Form.Label>
                  <Form.Control type="text" /*placeholder="800"*/ onChange={handleChange("numberPages")}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Edades sugeridas</Form.Label>
                  <Form.Control type="text" /*placeholder="18+"*/ onChange={handleChange("suggestedAges")}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Dimensiones</Form.Label>
                  <Form.Control type="text" /*placeholder="10x15"*/ onChange={handleChange("dimensions")}/>
                </Form.Group>
              </Row>
              
              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>ISBN</Form.Label>
                <Form.Control /*placeholder="1234567891234" */ onChange={handleChange("isbn")}/>
              </Form.Group>

              <Form.Group controlId="formImage" className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="file" onChange={handleChange("imageUrl")} />
              </Form.Group>

            </Form>
            {/*<Form>
              <FormGroup controlId="formInternalCode">
                <Form.Label>Código Interno</Form.Label>
                <Form.Control type="text" value={internalCode} onChange={(e) => seInternalCode(e.target.value)} />
              </FormGroup>
              <Form.Group controlId="formImage" className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              <FormGroup controlId="formTitle">
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </FormGroup>

              <Form.Select defaultValue="Selecciona...">
                    <option>Fantasía</option>
                    <option>Magia</option>
                    <option>Aventura</option>
                    <option>Suspenso</option>
                    <option>Sobrenatural</option>
                    <option>Romance</option>
                  </Form.Select>
              
  </Form> */}

            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Cerrar
              </MDBBtn>
              <MDBBtn onClick={handleSubmit}>Guardar Cambios</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>

    <div className = {classes.buttonContainer}>
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
          <th scope='col'>Genero</th>
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
            <td> {product.salesPrice} </td>
            <td> {product.authorPrice} </td>
            <td> {product.genre} </td>
            <td> {product.format} </td>
            <td> {product.language} </td>
            <td> {product.edition} </td>
            <td> {product.numberPages} </td>
            <td> {product.suggestedAges} </td>
            <td> {product.dimensions} </td>
            <td> {product.isbn} </td>
            <td>
              <MDBBtn color='link' rounded size='sm'>
                Edit
              </MDBBtn>
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
                <p className='fw-bold mb-1'>Dracula  <MDBBadge color='success' pill> Disponible </MDBBadge> </p>
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
            <MDBBtn color='link' rounded size='sm'>
              Edit
            </MDBBtn>
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
            <MDBBtn color='link' rounded size='sm'>
              Edit
            </MDBBtn>
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
            <MDBBtn color='link' rounded size='sm'>
              Edit
            </MDBBtn>
          </td>
        </tr>
      </MDBTableBody>
    </MDBTable>
    </>
  );
}

const useStyles = makeStyles(() =>({
  title:{
    textAlign: 'center',
    fontSize: 40,
    //fontWeight: 'bold',
    paddingTop: '25px',
    paddingBottom: '25px',
    color:'rgba(223,31,38,1)0%',
    fontfamily: 'Bebas Neue',
  },
  buttonContainer:{
    justifyContent: 'space-evenly',
    display:'flex',
    flexDirection: 'row',
    width: '30%',
    margin: 'auto',
    paddingBottom: '25px',
    color:'rgba(223,31,38,1)0%',
    fontfamily: 'Bebas Neue',
  },
  tableHead:{
    backgroundImage: 'linear-gradient(to bottom, rgba(223,31,38,1)0%, rgba(223,31,38,1)50%, rgba(223,31,38,1)100%)',
    color: "#202843",
    fontWeight: "bolder",
  },
  formContainer: {
    position: "absolute",
    left: "95%",
    top: "12%",
    margin: "auto",
    padding: "10px",
    width: "3%",
    maxWidth: "200px",
    background: "rgba(16,95,158,1)100%",
    //fontWeight: 'bold',
  }
}))