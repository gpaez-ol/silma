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
import { TextField,Button } from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {  CurrentProductStockItem, CurrentStockResponse, StockMovementCreate } from '../types';
import { useNavigate } from 'react-router-dom';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
const bodegaId = "c7d70ad7-1e69-499b-ac2b-d68dcd3bff2e";
const pisoId = "d8d70ad7-1e69-499b-ac2b-d68dcd3bff2e";
const getCurrentStock = async () => {
      const response = await axios.get<CurrentStockResponse>("stock");
      return response.data;
  };

type RowProps= {
  product:CurrentProductStockItem;
}

function Row(props: RowProps) {
  const { product } = props;
  const [isEditing, setIsEditing] = React.useState(false);
  const [bodegaAmount,setBodegaAmount] = React.useState(product.bodegaTotal);
  const [pisoAmount,setPisoAmount] = React.useState(product.pisoTotal);
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/product-history/${product.productId}/${product.productName}`)
  };
  const startEditing = () => {
    setBodegaAmount(product.bodegaTotal);
    setPisoAmount(product.pisoTotal)
    setIsEditing(true);
  }
  const editProduct = async () => {
   //   50   20 = 30
   //   70   50 = 20
   const totalAmount = Number(bodegaAmount) + Number(pisoAmount);
   if (totalAmount !== (Number(product.bodegaTotal) + Number(product.pisoTotal)))
   {
    console.log("The new total amount is not available");
    return;
   }
   const addedBodegaStock = bodegaAmount - product.bodegaTotal;
   if(addedBodegaStock > 0)
   {
    let newBodegaStockMovement:StockMovementCreate  = {
      amount: addedBodegaStock,
      locationId:bodegaId,
      prevLocationId:pisoId,
      productId:product.productId,
      notes:"Edicion del inventario interno"
    } ;
    await axios.post("stock-movement", newBodegaStockMovement);
   }
   const addedPisoStock = pisoAmount - product.pisoTotal;
   if(addedPisoStock > 0)
   {
    let newBodegaStockMovement:StockMovementCreate  = {
      amount: addedPisoStock,
      locationId:pisoId,
      prevLocationId:bodegaId,
      productId:product.productId,
      notes:"Edicion del inventario interno"
    } ;
    await axios.post("stock-movement", newBodegaStockMovement);
   }
    
    setIsEditing(false);
   }
  return (
    <React.Fragment>
      <TableRow  sx={{ '& > *': { borderBottom: 'unset'} }}>
        <TableCell component="th" scope="row">
        </TableCell>
        <TableCell   >{product.internalCode}</TableCell>
        <TableCell   >{product.productName}</TableCell>
        <TableCell   >{!isEditing  ? product.bodegaTotal:(         
        <TextField
          placeholder="Bodega"
          type='number'
          value={bodegaAmount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setBodegaAmount(Number(event.target.value));
          }}
        /> )} </TableCell>
        <TableCell  > {!isEditing  ? product.pisoTotal:(         <TextField
          placeholder="Piso"
          value={pisoAmount}
          type="number"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPisoAmount(Number(event.target.value));
          }}

        /> )} </TableCell>
        <TableCell > <div style={{display:"flex",alignContent:"center",gap:"25px"}}>
        {isEditing ? (
        <>
          <Button
              onClick={editProduct}
              style={{
                cursor: "pointer",
                backgroundImage: 'linear-gradient(to bottom, rgba(16, 95, 158,1)0%, rgba(16, 95, 158,1)50%, rgba(16, 95, 158,1)100%)',
                fontWeight: "bold"
              }}>
              Done
          </Button>
          <div style={{paddingTop:"5px"}}>
          <CancelPresentationRoundedIcon 
            style={{ cursor: "pointer", color:"red" }}
             onClick={() => setIsEditing(false)} />
          </div>
        </>
        ):(
          <><EditIcon style={{ cursor: "pointer" }} onClick={startEditing} />
          <VisibilityIcon style={{ cursor: "pointer" }} onClick={onClick} /></>
        ) }
          </div></TableCell>
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
            <TableCell sx={{ fontSize: 20, fontWeight: "bold", color:'white'}}> Acciones </TableCell>
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