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
          <th scope='col'>Producto</th>
          <th scope='col'>Fecha pedido</th>
          <th scope='col'>Fecha llegada</th>
          <th scope='col'>Tipo</th>
          <th scope='col'>Cantidad</th>
          <th scope='col'>Ubicación</th>
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
          <td> 14 Abr 23 </td>
          <td> 04 May 23 </td>
          <td> <MDBBadge color='info' pill> Reimpresión </MDBBadge> </td>
          <td> 4 </td>
          <td> 2 </td>
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
          <td> 24 Sep 22 </td>
          <td> 10 Feb 23 </td>
          <td> <MDBBadge color='primary' pill> Resurtido </MDBBadge> </td>
          <td> 10 </td>
          <td> 8 </td>
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
          <td> 21 Jul 22 </td>
          <td> 22 Dec 22 </td>
          <td> <MDBBadge color='warning' pill> Devolución </MDBBadge> </td>
          <td> 7 </td>
          <td> 12 </td>
          <td>
            <MDBBtn color='link' rounded size='sm'>
              Edit
            </MDBBtn>
          </td>
        </tr>
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
          <td> 11 Ago 23 </td>
          <td> 02 Oct 23 </td>
          <td> <MDBBadge color='info' pill> Reimpresión </MDBBadge> </td>
          <td> 4 </td>
          <td> 2 </td>
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