import React, { ChangeEvent, useState, useEffect } from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';
import { MDBBtn } from 'mdb-react-ui-kit';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import { FaTrashAlt } from 'react-icons/fa'
import { GoPlus } from 'react-icons/go'
import { ProductSelectResponse, ProductInOrderCreate } from '../types';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const getProductsSelect  = async () => {
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
  onProductAdd: (productStock:ProductInOrderCreate) => void,
  onProductRemove: (index:number) => void
}

const SelectProduct: React.FC<any> = (props: SelectProductFieldProps) => {
  let classes = useStyles();
  const { onProductAdd,onProductRemove } = props
  const [inputList, setInputList] = useState<ListElement[]>([]); 
  const [productId, setProductId] = useState('')
  const [amount, setAmount] = useState<number>(0)
  const [entrytype, setEntryType] = useState('')

  const { isLoading, data: productsSelectList } = useQuery(
    ["get-products-select"],
    () => getProductsSelect(),
    {
      select:(data) => data.data,
      onError: (error:any) => {
          console.log("Something went wrong");
        }
      }
  );
  const handleRemove = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    onProductRemove(index);
  };

  const handleAddClick = () => {
    if(productId.length>0 && amount>0 && entrytype.length>0 && productsSelectList !== null && productsSelectList !== undefined){
      let productTitle = productsSelectList.find(product => product.id === productId)?.title;
      setInputList([...inputList, {id: productId, title: productTitle ?? "N/A", qty: amount, entrytype: entrytype }]);
      const newProductInOrder : ProductInOrderCreate = {id:productId,amount:amount,entryType:entrytype}
      onProductAdd(newProductInOrder);
      setProductId('')
      setAmount(0)
      setEntryType('')
    } 
  };
  
  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      getProductsSelect();
    }
    ignore = true;
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
        {isLoading || 
         productsSelectList === null || 
         productsSelectList === undefined ? (
          <Grid container justifyContent="center">
            Loading
          </Grid>
         ):(
          <div>
            <div className={classes.item}>
              <Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Select defaultValue="Producto" value={productId} onChange={(event:ChangeEvent<HTMLSelectElement>)=> {
                    setProductId(event.target.value)
                  }}>
                    <option>Producto</option>
                    {productsSelectList.map((product) => (
                      <option value={product.id}> {product.title}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Container as={Col}>
                  <TextField className={classes.txtf}
                  placeholder='Cantidad'
                  type='number'
                  value={amount}
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
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