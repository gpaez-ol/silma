import React, {useState} from 'react';
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
//import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { makeStyles } from "@material-ui/core/styles";
import SelectProduct from "./SelectProduct"
import { GoPlus } from 'react-icons/go'
import axios from "axios";
import { ProductSelectItem } from '../types';

export default function PopupInOrder(classes: any) {
    classes = useStyles();

    const [value, setValue] = useState<Dayjs | null>(dayjs());
    const [value2, setValue2] = useState<Dayjs | null>(dayjs());

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    
    
    const [productList, setProductList] = useState(null);

    const API_url = "http://localhost:3000/local/";

    const handleSubmit = async (event: { preventDefault: () => void; currentTarget: any; }) => {
      event.preventDefault();

      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        return;
      }
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      postInOrder(data);
      setBasicModal(!basicModal);
    }

    const postInOrder = async(formData:any) => {
      try{
        const { data } = await axios.post(API_url + 'inorder',{
          orderedAt: formData.orderedAt,
          deliveredAt: formData.deliveredAt,
          notes: formData.notes,
          location: formData.notes,
          products: productList,
        });
      }catch(error){
        console.log(error)
      }
    }

    const sendProductList = (index: any) =>{
      setProductList(index)
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
              <MDBModalTitle>Nueva Órden</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
            <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                {/*Date Picker*/}
                <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label> </Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Fecha Pedido"
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                    />
                  </LocalizationProvider>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label> </Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Fecha Llegada"
                      value={value2}
                      onChange={(newValue2) => setValue2(newValue2)}
                    />
                  </LocalizationProvider>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Ubicación</Form.Label>
                  <Form.Select defaultValue="Selecciona...">
                    <option></option>
                    <option>Bodega</option>
                    <option>Piso</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Notas</Form.Label>
                  <Form.Control as="textarea" rows={3}/*placeholder="500"*//>
                </Form.Group>
              </Row>
            </Form>

            <MDBModalTitle>Ingresa Productos</MDBModalTitle>

            <SelectProduct/>

            </MDBModalBody>


            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Cerrar
              </MDBBtn>
              <MDBBtn onClick={handleSubmit}>Guardar Cambios</MDBBtn>
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
}))
