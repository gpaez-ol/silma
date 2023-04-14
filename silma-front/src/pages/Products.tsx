import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { makeStyles } from "@material-ui/core/styles";
import './Products.css';

export default function App(classes: any) {
  classes = useStyles();
  return (
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
  );
}

const useStyles = makeStyles(() =>({
  backgroundContainer: {
      minWidth: '20vw',
      minHeight: '20vh',
  },
  overlay: {
      width: '100vw',
      height: '95vh',
      //backgroundImage: 'linear-gradient(to bottom, rgba(249, 238, 236,1)0%, rgba(249, 238, 236,1)50%, rgba(249, 238, 236,1)100%)',
      justifyContent: 'space-evenly',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
  },
  logoImg: {
      maxWidth: '35%',
      height: 'auto',
      padding: 0,
      margin: 0,
      transform: 'translate(20%, -10%)',
  },
  formContainer: {
      position: 'absolute',
      left: '50%',
      margin: 'auto',
      padding: '50px',
      width: '30%',
      maxWidth: '400px',
      borderRadius: "25px",
      boxShadow: '0 3px 5px 2px rgba(32,40,67,1)',
      backgroundImage: 'linear-gradient(to bottom, rgba(223,31,38,1)0%, rgba(223,31,38,1)50%, rgba(223,31,38,1)100%)',
  },
  passwordInput: {
      flex: '1',
      width: '100%',
      padding: '15px',
      outline: 'none',
      borderRadius: '25px',
      border: 'none',
      background: "none",
      color: 'white',
      fontSize: '18px',
      '&::placeholder': {
          color: 'rgba(255,255,255,0.75)'
      }
  },
  userInput: {
      width: '100%',
      padding: '15px',
      outline: 'none',
      borderRadius: '25px',
      border: 'none',
      marginBottom: '20px',
      background: "rgba(255,255,255,0.25)",
      color: 'white',
      fontSize: '18px',
      '&::placeholder': {
          color: 'rgba(255,255,255,0.75)'
      }
  },
  passwordContainer: {
      display: 'flex',
      width: '100%',
      background: 'rgba(255,255,255,0.25)',
      borderRadius: '25px',
      border: 'none',
      marginBottom: '20px',
  },
  link: {
      color: 'white',
      '&:hover': {
          color: 'white'
      },
      fontSize: '15px',
  },
  line: {
      textAlign:'center',
      borderTop: '1px solid white',
  },
  footerBlue:{
      position: 'absolute',
      margin: 'auto',
      paddingBottom: '40px',
      width: '100%',
      maxWidth: '25vw',
      boxShadow: '0 3px 5px 2px rgba(32,40,67,1)',
      backgroundImage: 'linear-gradient(to bottom, rgba(16, 95, 158,1)0%, rgba(16, 95, 158,1)50%, rgba(16, 95, 158,1)100%)',
  },
  footerRed:{
      position: 'absolute',
      left: '25%',
      margin: 'auto',
      paddingBottom: '40px',
      width: '100%',
      maxWidth: '25vw',
      boxShadow: '0 3px 5px 2px rgba(32,40,67,1)',
      backgroundImage: 'linear-gradient(to bottom, rgba(223,31,38,1)0%, rgba(223,31,38,1)50%, rgba(223,31,38,1)100%)',
  },
  footerGreen:{
      position: 'absolute',
      left: '50%',
      margin: 'auto',
      paddingBottom: '40px',
      width: '100%',
      maxWidth: '25vw',
      boxShadow: '0 3px 5px 2px rgba(32,40,67,1)',
      backgroundImage: 'linear-gradient(to bottom, rgba(195, 208, 46,1)0%, rgba(195, 208, 46,1)50%, rgba(195, 208, 46,1)100%)',
  },
  footerPurple:{
      position: 'absolute',
      left: '75%',
      margin: 'auto',
      paddingBottom: '40px',
      width: '100%',
      maxWidth: '25vw',
      boxShadow: '0 3px 5px 2px rgba(32,40,67,1)',
      backgroundImage: 'linear-gradient(to bottom, rgba(144, 64, 213,1)0%, rgba(144, 64, 213,1)50%, rgba(144, 64, 213,1)100%)',
  }
}))