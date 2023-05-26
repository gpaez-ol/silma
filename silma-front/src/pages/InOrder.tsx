import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { makeStyles } from "@material-ui/core/styles";
import { MDBBadge } from 'mdb-react-ui-kit';
import './Products.css';
import axios from 'axios';
import { InOrderItem } from '../types/inOrder';
import PopUp from "../components/PopupInOrder";

function Row(props: {inOrder: InOrderItem}) {
  const { inOrder } = props;
  const [open, setOpen] = React.useState(false);
  
  /*
  const formatDate = (date: string) => {
    const calendar = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
    return (date.substring(8,2) + ' ' + calendar[Number(date.substring(5,2))-1] + ' ' + date.substring(0,4))
  }
  */

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset'} }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {inOrder.internalCode}
        </TableCell>
        <TableCell align="right">{inOrder.orderedAt}</TableCell>
        <TableCell align="right">{inOrder.deliveredAt ?? "Not available"}</TableCell>
        <TableCell align="right">{inOrder.totalAmount}</TableCell>
        <TableCell align="right">{inOrder.location}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: "bold" }}>
                Detalle
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: 'rgba(144, 64, 213,0.2)',fontWeight: "bold" }}>Código interno</TableCell>
                    <TableCell sx={{ backgroundColor: 'rgba(144, 64, 213,0.2)',fontWeight: "bold" }}>Producto</TableCell>
                    <TableCell align="right" sx={{ backgroundColor: 'rgba(144, 64, 213,0.2)',fontWeight: "bold" }}>Cantidad</TableCell>
                    <TableCell align="right" sx={{ backgroundColor: 'rgba(144, 64, 213,0.2)',fontWeight: "bold" }}>Tipo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {inOrder.products.map((product) => (
                    <TableRow key={product.internalCode}>
                      <TableCell component="th" scope="row">
                        {product.internalCode}
                      </TableCell>
                      <TableCell>
                      <div className='d-flex align-items-center'>
                        <img
                            src={product.imageUrl} 
                            alt=''
                            style={{ width: '45px', height: '45px' }}
                            className='rounded-circle'
                        />
                        <div className='ms-3'>
                                <p className='fw-bold mb-1'>{product.title} {
                                    product.status === "activo" ? 
                                    (<MDBBadge color='success' pill> 
                                      Activo 
                                    </MDBBadge>) : 
                                    (<MDBBadge color='danger' pill> 
                                      Inactivo 
                                    </MDBBadge>)
                                  }
                                </p>
                                <p className='text-muted mb-0'>{product.author}</p>
                        </div>
                     </div>
                     </TableCell>
                      <TableCell align="right">{product.amount}</TableCell>
                      <TableCell align="right"> <MDBBadge color='info' pill>  {product.entryType} </MDBBadge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(classes: any) {
  classes = useStyles();

  const API_url = "http://localhost:3000/local/";

  const [ orderList , setOrderList ] = React.useState<InOrderItem[]>([]);

  const mountInOrderList = async() =>{
    try{
      const { data } = await axios.get(API_url + 'inorder')
      const dataUnstructured = data.data;
      setOrderList( dataUnstructured );
    }catch (error){
      console.log(error);
    }
  }

  useEffect(()=>{
    let ignore = false;

    if (!ignore) {
      mountInOrderList();
    }
    ignore = true;
    return () => {
      ignore = true;
    };
  }, []);

  return(
    <>
    <div> 
        <Typography variant="h4" className = {classes.title}>Historial de Órdenes </Typography>
     </div>
     <div>
      <PopUp/>
     </div>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead className={classes.tableHead}>
          <TableRow className="shadow">
            <TableCell />
            <TableCell sx={{ fontSize: 20, fontWeight: "bold", color:'white'}}>Orden</TableCell>
            <TableCell align="right" sx={{ fontSize: 20, fontWeight: "bold", color:'white'}}>Fecha Pedido</TableCell>
            <TableCell align="right" sx={{ fontSize: 20, fontWeight: "bold", color:'white'}}>Fecha Llegada</TableCell>
            <TableCell align="right" sx={{ fontSize: 20, fontWeight: "bold", color:'white'}}>Cantidad</TableCell>
            <TableCell align="right" sx={{ fontSize: 20, fontWeight: "bold", color:'white'}}>Ubicación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((order) => (
            <Row inOrder={order}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    );
}

const useStyles = makeStyles(() =>({
    title:{
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      paddingTop: '25px',
      paddingBottom: '25px',
      color:'black',
      //fontfamily: 'Bebas Neue'
    },
    tableHead:{
      //backgroundImage: 'linear-gradient(to bottom, rgba(144, 64, 213,1)0%, rgba(144, 64, 213,0.8)50%, rgba(144, 64, 213,0.7)100%)',
      backgroundImage: "linear-gradient(to bottom, rgba(223,31,38,0.7)0%, rgba(223,31,38,0.8)50%, rgba(223,31,38,0.7)100%)",
      //backgroundImage: "linear-gradient(to bottom, rgba(16, 95, 158,1)0%, rgba(16, 95, 158,0.8)50%, rgba(16, 95, 158,0.7)100%)",
      //backgroundColor: 'rgba(144, 64, 213,0.3)',
    },
    rowBackground:{
      backgroundColor: 'rgba(144, 64, 213,0.3)'
    },
}))