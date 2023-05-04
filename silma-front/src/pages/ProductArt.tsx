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
      synopsis:'',
      salesPrice:0,
      quantity:'',
      imageUrl:'',
      status:''
    }]
  });

  const mountArticleList = async (e: React.MouseEvent) => {
    e.preventDefault();
    try{
      /*axios.get(API_url + 'product-articles').then( res => {
        const articles = res.data;
        console.log(articles);
        setValues({productList: articles});
      });*/
      const articles = await axios.get(API_url + 'product-articles');
      console.log(articles.data);
      setValues({productList: articles.data});
      navigate('/product-articles');
    }catch(err){
      console.log("Loading error")
    }
  }

  const mountBooks = () => {
    navigate('/product-books');
  }
  const [internalCode, seInternalCode] = useState('');
  const [title, setTitle] = useState('');
  const [field, setField] = useState<string[]>([]);
  const [items , setItems] = useState<string[]>([]);

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
              <MDBModalTitle>Agregar Artículo</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
            <Form>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" /*placeholder="Moby Dick"*/ required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAuthor">
                <Form.Label>Autor</Form.Label>
                <Form.Control type="text" /*placeholder="Moby Dick"*/ required/>
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formSellPrice">
                <Form.Label>Precio venta</Form.Label>
                <Form.Control type="text" /*placeholder="Moby Dick"*/ required/>
              </Form.Group>

              <Form.Group controlId="formImage" className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="file" />
              </Form.Group>

            </Form>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Cerrar
              </MDBBtn>
              <MDBBtn>Guardar Cambios</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>

    <div className = {classes.buttonContainer}>
      <WhiteButton onClick={mountBooks}>Libros</WhiteButton>
      <WhiteButton onClick={mountArticleList}>Artículos</WhiteButton>
    </div>
    <MDBTable align='middle'>
      <MDBTableHead light>
       <tr>
          <th scope='col'>Código interno</th>
          <th scope='col'>Articulo</th>
          <th scope='col'>Cantidad</th>
          <th scope='col'>Precio de venta</th>
          <th scope='col'>Editar</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {values.productList.map((product, index) => (
          <tr key={index}>
            <td> {product.internalCode} </td>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src={product.imageUrl}
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>{product.title}  <MDBBadge color='success' pill> {product.status} </MDBBadge> </p>
                </div>
              </div>
            </td>
            <td> {product.quantity} </td>
            <td> {product.salesPrice} </td>
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
    color:'black',
    fontfamily: 'Bebas Neue'
  },
  buttonContainer:{
    justifyContent: 'space-evenly',
    display:'flex',
    flexDirection: 'row',
    width: '30%',
    margin: 'auto',
    paddingBottom: '25px',
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