import React, { ChangeEvent, useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { MDBBtn } from 'mdb-react-ui-kit';
import { makeStyles } from '@material-ui/core/styles';
import { FaTrashAlt } from 'react-icons/fa'
import { GoPlus } from 'react-icons/go'
import axios from 'axios';
import { ProductInOrderItem, ProductSelectItem } from '../types';

interface ListElement {
  title: string;
  qty: string;
  type: string;
}

const SelectProduct: React.FC<any> = (classes: any, props:{sendProductList: any}) => {
  const {sendProductList} = props;
  const [inputList, setInputList] = useState<ListElement[]>([]);
  const [selectList, setSelectList] = useState<ProductSelectItem[]>([]);

  const API_url = "http://localhost:3000/local/";

  const select = async() => {
    try{
      const {data} = await axios.get(API_url+'product-select');
      const dataUnstructured = data.data;
      setSelectList(dataUnstructured)
    }catch(error){
      console.log(error)
    }
  }  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
    const { name, value } = e.target;
    const list: ListElement[] = [...inputList];
    list[index][name as keyof ListElement] = value;
    setInputList(list);
  };

  const handleRemove = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { title: '', qty: '', type: '' }]);
  };
  
  classes = useStyles();

  return (
    <div>
      {inputList.map((x, i) => {
        return (
          <div className={classes.item1} key={i}>
            <Row className="mb-3" onChange={()=>{
              sendProductList(inputList)
            }}>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Control type="text" placeholder="Producto" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Control type="text" placeholder="Cantidad" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCity">
                <Form.Select defaultValue="Selecciona..." onChange={(e) => handleInputChange(e, i)}>
                  <option>Selecciona Tipo</option>
                  <option>reimpresión</option>
                  <option>resurtido</option>
                  <option>devolución</option>
                </Form.Select>
              </Form.Group>

              {inputList.length - 1 === i && (
                <Form.Group as={Col} controlId="formGridCity">
                  <MDBBtn className={classes.button} onClick={handleAddClick}>
                    <GoPlus style={{ color: 'white' }} size={20} />
                  </MDBBtn>
                </Form.Group>
              )}

            {inputList.length !== 1 && (
                <Form.Group as={Col} controlId="formGridCity">
                  <MDBBtn className={classes.button} onClick={() => handleRemove(i)}>
                      <FaTrashAlt style={{ color: 'white' }} size={20} />
                  </MDBBtn>
                </Form.Group>
              )}
            </Row>
          </div>
        );
      })}
    </div>
  );
};

export default SelectProduct;


const useStyles = makeStyles(() =>({
    item1: {
        background: 'rgba(223,31,38,0.25)',
        color: 'rgb(223,31,38)',
        borderRadius: 5,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 0.45,    
        transition: 'transform 450ms',
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.02)',
            background: 'rgba(223,31,38,0.35)',
        }
    },
    button:{
        backgroundColor: "rgb(16, 95, 158)",
        padding: "3px 3px",
        marginBottom: '20px',
        marginRight: '20px',
        width: "100%",
        height: "80%",
    }
  }));