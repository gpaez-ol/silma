import React, { ChangeEvent, useState } from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';
import { MDBBtn } from 'mdb-react-ui-kit';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import { FaTrashAlt } from 'react-icons/fa'
import { GoPlus } from 'react-icons/go'
import { ProductSelectResponse, ProductInOrderCreate } from '../types';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const getCurrentSelect= async () => {
  const response = await axios.get<ProductSelectResponse>("product-select");
  return response.data;
};

interface ListElement {
  id: string;
  title: string;
  qty: number;
  entrytype: string;
}

type SelectProductFieldProps = {
  productList: ProductInOrderCreate[],
}

const SelectProduct: React.FC<any> = (classes:any, props: SelectProductFieldProps) => {
  //const API_url = "http://localhost:3000/local/";
  const { productList } = props
  const [inputList, setInputList] = useState<ListElement[]>([]); 
  const [id, setID] = useState('')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [entrytype, setEntryType] = useState('')

  const { isLoading, data: productSelect } = useQuery(
    ["get-products"],
    () => getCurrentSelect(),
    {
      select:(data) => data.data,
      onError: (error:any) => {
          console.log("Something went wrong");
        }
      }
  );

  /*const [selectList, setSelectList] = useState<ProductSelectItem[]>([]);

    const select = async() => {
      try{
        const {data} = await axios.get(API_url+'product-select');
        const dataUnstructured = data.data;
        setSelectList(dataUnstructured)
      }catch(error){
        console.log(error)
      }
    } 
  */

  const handleRemove = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    productList.splice(index,1);
  };

  const handleAddClick = () => {
    if(title.length>0 || amount>0 || entrytype.length>0){
      setInputList([...inputList, {id: id, title: title, qty: amount, entrytype: entrytype }]);
      const newProductInOrder : ProductInOrderCreate = {id:id,amount:amount,entryType:entrytype}
      productList.push(newProductInOrder);
      console.log(productList)
      setTitle('')
      setAmount(0)
      setEntryType('')
    } 
  };
  
  classes = useStyles();

  return (
    <>
        {isLoading || 
         productSelect === null || 
         productSelect === undefined ? (
          <Grid container justifyContent="center">
            Loading
          </Grid>
         ):(
          <div>
            <div className={classes.item}>
              <Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Select defaultValue="Producto" value={title} onChange={(event:ChangeEvent<HTMLSelectElement>)=> {
                    setTitle(event.target.value)
                  }}>
                    <option>Producto</option>
                    {/* Marca error */}
                    {/*productSelect.map((product)=>{
                      <option value={product.id}>{product.title}</option>
                    })*/}
                    <option>reimpresión</option>
                    <option>resurtido</option>
                    <option>devolución</option>
                  </Form.Select>
                </Form.Group>
                <Container as={Col}>
                  <TextField className={classes.txtf}
                  placeholder='Cantidad'
                  type='number'
                  value={amount}
                  onChange={(event:ChangeEvent<HTMLInputElement>)=>{
                    setAmount(Number(event.target.value))
                  }}/>
                </Container>
                <Container as={Col}>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Select defaultValue="Selecciona..." value={entrytype} onChange={(event:ChangeEvent<HTMLSelectElement>)=> {
                    setEntryType(event.target.value)
                  }}>
                    <option>Selecciona Tipo</option>
                    <option>reimpresión</option>
                    <option>resurtido</option>
                    <option>devolución</option>
                  </Form.Select>
                </Form.Group>
                </Container>
                <Container as={Col}>
                  <MDBBtn className={classes.button} onClick={handleAddClick}>
                    <GoPlus style={{ color: 'white' }} size={20} />
                  </MDBBtn>
                </Container>
              </Row>
            </div>
            <div>
            {inputList.map((x, i) => {
              return (
                <div className={classes.item1} key={i}>
                  <Row className="mb-3">
                    <Container as={Col}>
                    <TextField className={classes.txtf} defaultValue={x.title} disabled={true}/>
                    </Container>
                    <Container as={Col}>
                    <TextField className={classes.txtf} defaultValue={x.qty} disabled={true}/>
                    </Container>
                    <Container as={Col}>
                      <TextField className={classes.txtf} defaultValue={x.entrytype} disabled={true}/>
                    </Container>
                    <Container as={Col}>
                      <MDBBtn className={classes.button} onClick={() => handleRemove(i)}>
                        <FaTrashAlt style={{ color: 'white' }} size={20} />
                      </MDBBtn>
                    </Container>
                  </Row>
                </div>
              );
            })}
          </div>
          </div>
         )}     
    </>
  );
};

export default SelectProduct;


const useStyles = makeStyles(() =>({
    item: {
      background: 'rgba(223,223,223,0.25)',
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
            background: 'rgba(223,223,223,0.55)',
        }
    },
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
    },
    txtf:{
      backgroundColor: "rgb(253,253,253)",
      paddingTop: 4,
      paddingLeft: 10,
      paddingRight: 10,
    }
  }));