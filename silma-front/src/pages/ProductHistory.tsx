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
import {   ProductHistoryResponse, ProductStockMovementItem } from '../types';
import { useNavigate, useParams } from 'react-router-dom';
import { WhiteButton } from '../components/Button';
const getProductHistory = async (productId:string) => {
      const response = await axios.get<ProductHistoryResponse>("product-history",{params:{productId}});
      return response.data;
  };

type RowProps= {
  productStockMovement:ProductStockMovementItem;
}

function Row(props: RowProps) {
  const { productStockMovement } = props;
  let movedAt = new Date(productStockMovement.movedAt);
  return (
    <React.Fragment>
      <TableRow  sx={{ '& > *': { borderBottom: 'unset'} }}>
        <TableCell component="th" scope="row">
        </TableCell>
        <TableCell >{productStockMovement.locationName}</TableCell> 
        <TableCell >{productStockMovement.movedAt ? movedAt.toLocaleDateString('es-MX',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:"2-digit",minute:"2-digit" })  : "No Disponible"}</TableCell>
        <TableCell >{productStockMovement.amount}</TableCell>
        <TableCell >{productStockMovement.notes}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function ProductHistory(classes: any) {
    const navigate = useNavigate();
    const { productId,productName } = useParams();
    
    if(productId === undefined || productName === undefined)
    {
      throw new Error("Product Id cannot be undefined");
    }
    classes = useStyles();
    const { isLoading, data: currentStock } = useQuery(
        ["product-history",productId],
        () => getProductHistory(productId),
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
        <Typography variant="h2" className = {classes.title}> Movimientos {productName}</Typography>
     </div>
     <div style={{maxWidth:"10%", marginLeft:"80px"}}>
      <WhiteButton onClick={() => navigate(-1)} style={{height:"25px",backgroundColor:"rgba(16, 95, 158,1)",color:"white"}}  >Regresar</WhiteButton>
      </div>
      
    <TableContainer component={Paper} sx={{maxWidth:"90%", alignSelf:"center",marginLeft:"80px"}}>

    {isLoading ||
        currentStock === null ||
        currentStock === undefined ? (
            <Grid container justifyContent="center">
                Loading
            </Grid>
        ) : (
      <Table aria-label="table">
        <TableHead className={classes.tableHead}>
          <TableRow sx={{color:"blue",background:"red"}}>
            <TableCell />
            <TableCell sx={{ fontSize: 20, fontWeight: "bold", color:'white'}}>Ubicacion</TableCell>
            <TableCell sx={{ fontSize: 20, fontWeight: "bold", color:'white'}}>Fecha</TableCell>
            <TableCell sx={{ fontSize: 20, fontWeight: "bold", color:'white'}}>Cantidad</TableCell>
            <TableCell sx={{ fontSize: 20, fontWeight: "bold", color:'white'}}>Notas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentStock.map((productStockMovement) => (
            <Row key={`${productStockMovement.id}`} productStockMovement={productStockMovement} />
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
    },
    tableHead:{
      backgroundImage: 'linear-gradient(to bottom, rgba(144, 64, 213,1)0%, rgba(144, 64, 213,0.8)50%, rgba(144, 64, 213,0.7)100%)',
    }
}))