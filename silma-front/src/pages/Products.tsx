import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { makeStyles } from "@material-ui/core/styles";
import './Products.css';
import { WhiteButton } from '../components/ButtonProduct';

export default function App(classes: any) {
  classes = useStyles();
  return (
    <>
    <div>
      <h2 className = {classes.title}>Productos</h2>
    </div>
    <div className = {classes.buttonContainer}>
      <WhiteButton>Libros</WhiteButton>
      <WhiteButton>Artículos</WhiteButton>
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