import React, { useState, useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBPopover, MDBPopoverBody, MDBPopoverHeader  } from 'mdb-react-ui-kit';
import { makeStyles } from "@material-ui/core/styles";
import './Products.css';
import { WhiteButton } from '../components/ButtonProduct';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function App(classes: any) {
  classes = useStyles();
  const navigate = useNavigate();
  const API_url = "http://localhost:3000/local/";

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

  const mountArticleList = async () => {
    try {
      const { data } = await axios.get(API_url + 'product-articles');
      const dataUnstructured = data.data; 
      setValues({productList: dataUnstructured});
    } catch (error) {
      console.log(error);
    }
  }

  const mountBooks = () => {
    navigate('/product-books');
  }

  useEffect(() => {
    let ignore = false;
    
    if (!ignore) {
      mountArticleList();
    } 
    return () => { ignore = true; }
  }, []);

  return (
    <>
    <div>
      <h2 className = {classes.title}>Productos</h2>
    </div>
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
                  <p className='fw-bold mb-1'>
                    {product.title} 
                    {product.status === 'activo'? <MDBBadge color='success' pill>Activo</MDBBadge> : <MDBBadge color='danger' pill>Inactivo</MDBBadge>} 
                  </p>
                </div>
              </div>
            </td>
            <td> {product.quantity} </td>
            <td> ${product.salesPrice} </td>
            <td>
              <MDBBtn color='link' rounded size='sm'>
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
  }
}))