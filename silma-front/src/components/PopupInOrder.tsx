import React, {useState} from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, 
    MDBTableBody, MDBModal, MDBModalDialog, MDBModalContent, 
    MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter} from 'mdb-react-ui-kit';
import { Button, Modal, Form, FormGroup, Col, Row, InputGroup } from 'react-bootstrap';
//Date Picker imports
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { makeStyles } from "@material-ui/core/styles";
import SelectProduct from "./SelectProduct"
import { GoPlus } from 'react-icons/go'

export default function PopupInOrder(classes: any) {
    classes = useStyles();

    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [value2, setValue2] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const handleSubmit = async (e: React.MouseEvent) => {
      e.preventDefault();
      console.log("hola");
      setBasicModal(!basicModal);
    }

    const [field, setField] = useState([]);

    const option = [
      {
        text: "Value 1",
        showing: true,
      },
      {
        text: "Second Value",
        showing: true,
      },
      {
        text: "Third Value",
        showing: true,
      },
      {
        text: "Final Value",
        showing: true,
      },
  ];

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
            <Form>
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
