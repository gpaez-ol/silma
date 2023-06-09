import React, {useState, ChangeEvent} from 'react';
import { MDBBtn, 
         MDBModal, 
         MDBModalDialog, 
         MDBModalContent, 
         MDBModalHeader, 
         MDBModalTitle, 
         MDBModalBody, 
         MDBModalFooter} from 'mdb-react-ui-kit';
import { Form, Col, Row } from 'react-bootstrap';
//Date Picker imports
import dayjs, { Dayjs } from 'dayjs';
import { Grid } from '@material-ui/core';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { makeStyles } from "@material-ui/core/styles";
import SelectProduct from "./SelectProduct"
import { GoPlus } from 'react-icons/go'
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ProductInOrderCreate, InOrderCreate, LocationResponse} from '../types';
import {toast} from 'react-toastify';

export default function PopupInOrder(classes: any) {
    classes = useStyles();

    const [orderDate, setOrderDate] = useState<Dayjs | null>(dayjs());
    const [deliverDate, setDeliverDate] = useState<Dayjs | null>(null);
    const [notes, setNotes] = useState("")
    const [locationId, setLocationId] = useState("")
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    
    const [productList, setProductList] = useState<ProductInOrderCreate[]>([]);

    const API_url = "http://localhost:3000/local/";

    const getLocations  = async () => {
      const response = await axios.get<LocationResponse>("location");
      return response.data;
    };

    const { isLoading, data: locationList } = useQuery(
      ["get-locations"],
      () => getLocations(),
      {
        select:(data) => data.data,
        onError: (error:any) => {
            console.log("Something went wrong");
          }
        }
    );

    const setConcreteDate = (pendingDate: Dayjs | null) => {
      if(pendingDate){
        return pendingDate.toDate();
      }else{
        return new Date();
      }
    }

    const postInOrder = async() => {
      const deliveredAt = deliverDate?.toDate();
      const orderedAt = setConcreteDate(orderDate)
      
      let newInOrder: InOrderCreate = {
        orderedAt: orderedAt,
        deliveredAt: deliveredAt,
        notes: notes,
        locationId: locationId,
        products: productList
      }
      console.log(newInOrder)
      try{
        await axios.post(API_url+"inorder",newInOrder)
        window.location.reload()
        toast.success("Orden creada con éxito")
        setOrderDate(dayjs());
        setDeliverDate(null);
        setNotes('');
        setLocationId('');
        setProductList([])
        setBasicModal(!basicModal)
      }catch(error){
        console.log(error)
        toast.error("Algo salió mal. Vuelva a intentarlo")
      }
    }

    const addProductStock = (productStock: ProductInOrderCreate) =>{
        setProductList([...productList, productStock]);
    };
    const removeProductStock = (index:number) => {
      const list = [...productList];
      list.splice(index, 1);
      setProductList(list);
    }

    return(
        <>
        <MDBBtn className= {classes.popUpPosition}  onClick={toggleShow}>
          <GoPlus style={{ color: 'white' }} size={20} />
        </MDBBtn>
      <MDBModal className= {classes.modal} show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog size='lg'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Nueva Orden</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAddress1">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Fecha Pedido"
                      value={orderDate}
                      onChange={(newValue) => setOrderDate(newValue)}
                    />
                  </LocalizationProvider>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAddress1">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Fecha Llegada"
                      value={deliverDate}
                      onChange={(newValue2) => setDeliverDate(newValue2)}
                    />
                  </LocalizationProvider>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Ubicación</Form.Label>
                  {isLoading || locationList===null || locationList === undefined ? (
                    <Grid container justifyContent="center">
                      Loading
                    </Grid>
                  ):(
                    <Form.Select 
                      defaultValue="Selecciona..." 
                      value={locationId}
                      onChange={(event:ChangeEvent<HTMLSelectElement>)=> {
                        setLocationId(event.target.value)
                      }}>
                      <option></option>
                      {locationList.map((location)=>(
                        <option value={location.id}>{location.title}</option>
                      ))}
                  </Form.Select>
                  )}
                  
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity" >
                  <Row><Form.Label>Notas (Máximo 255 carácteres)</Form.Label></Row>
                  <Row>
                  <textarea 
                    className={classes.textspace}
                    rows={3}
                    value={notes}
                    maxLength={255}
                    onChange={(event:ChangeEvent<HTMLTextAreaElement>)=> {
                      setNotes(event.target.value)
                    }}
                    />
                  </Row>
                </Form.Group>
              </Row>

              <MDBModalTitle>Ingresa Productos</MDBModalTitle>
              <SelectProduct onProductAdd={addProductStock} onProductRemove={removeProductStock}/>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Cerrar
              </MDBBtn>
              {/*<MDBBtn onClick={(postOrder)}>Guardar Cambios</MDBBtn>*/}
              <MDBBtn onClick={(postInOrder)}>Guardar Cambios</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
        </>
    );
}

const useStyles = makeStyles(() =>({
  popUpPosition: {
    /*//display:"flex",
    position: "absolute",
    left: "95%",
    top: "10%",
    margin: "auto",
    padding: "10px",
    height: "6%",
    width: "3%",
    maxWidth: "200px",
    background: "rgba(16,95,158,1)100%"*/
    display:"flex",
    position: 'absolute',
    margin: "auto",
    maxWidth: "200px",
    right: 20,
    top: 90,
    background: "rgba(16,95,158,1)100%"
  },
  textspace:{
    margin: "5px",
    width: "90%"
  },
}))
