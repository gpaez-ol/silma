import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { makeStyles} from "@material-ui/core/styles";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { Grid } from '@material-ui/core';
import {  CurrentProductStockItem, CurrentStockResponse } from '../types';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
const getCurrentStock = async () => {
      const response = await axios.get<CurrentStockResponse>("stock");
      return response.data;
  };

type RowProps= {
  product:CurrentProductStockItem;
}

function Row(props: RowProps) {
  const { product } = props;
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/product-history/${product.productId}/${product.productName}`)
  };

  return (
    <React.Fragment>
      <TableRow onClick={onClick}  sx={{ '& > *': { borderBottom: 'unset'}, cursor:"pointer" }}>
        <TableCell component="th" scope="row">
        </TableCell>
        <TableCell >{product.internalCode}</TableCell>
        <TableCell >{product.productName}</TableCell>
        <TableCell >{product.bodegaTotal}</TableCell>
        <TableCell >{product.pisoTotal}</TableCell>
        <TableCell> <EditIcon/></TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function StockMovement(classes: any) {
    classes = useStyles();
    const { isLoading, data: currentStock } = useQuery(
        ["current-stock"],
        () => getCurrentStock(),
        {
          select:(data) => data.data,
          onError: (error:any) => {
              console.log("Something went wrong");
            }
          }
      );

  return(
    <>
    <div> 
        <Typography variant="h2" className = {classes.title}>Surtido Interno </Typography>
     </div>
    <TableContainer component={Paper}>
    {isLoading ||
        currentStock === null ||
        currentStock === undefined ? (
            <Grid container justifyContent="center">
                Loading
            </Grid>
        ) : (
      <Table aria-label="collapsible table">
        <TableHead className={classes.tableHead}>
          <TableRow sx={{color:"blue",background:"footerBlue"}}>
            <TableCell />
            <TableCell sx={{ fontSize: 20, fontWeight: "bold", color:'white'}}>Codigo Interno</TableCell>
            <TableCell sx={{ fontSize: 20, fontWeight: "bold", color:'white'}}>Producto</TableCell>
            <TableCell sx={{ fontSize: 20, fontWeight: "bold", color:'white'}}>Bodega</TableCell>
            <TableCell sx={{ fontSize: 20, fontWeight: "bold", color:'white'}}>Piso</TableCell>
            <TableCell sx={{ fontSize: 20, fontWeight: "bold", color:'white'}}> Editar </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentStock.map((productStock) => (
            <Row key={`${productStock.productId}${productStock.locationId}`} product={productStock} />
          ))}
        </TableBody>
      </Table>
       )}
    </TableContainer>
    </>
    );
}

const useStyles = makeStyles(() =>({
    title:{
      textAlign: 'center',
      fontSize: 40,
      fontWeight: 'bold',
      paddingTop: '25px',
      paddingBottom: '25px',
      color:'black',
      //fontfamily: 'Bebas Neue'
    },
    tableHead:{
      backgroundImage: 'linear-gradient(to bottom, rgba(144, 64, 213,1)0%, rgba(144, 64, 213,0.8)50%, rgba(144, 64, 213,0.7)100%)',
      //backgroundImage: "linear-gradient(to bottom, rgba(16, 95, 158,1)0%, rgba(16, 95, 158,0.8)50%, rgba(16, 95, 158,0.7)100%)",
      //backgroundColor: 'rgba(144, 64, 213,0.3)',
    }
}))