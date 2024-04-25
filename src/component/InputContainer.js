import React, { useState, useEffect } from 'react'
import ItemsList from './ItemsList';
import '../App.css';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';


const InputContainer = () => {

    // const { enqueueSnackbar } = useSnackbar();
    const [products, setProducts] = useState(()=>{
        const savedData = localStorage.getItem("itemData");
        const parsedData = JSON.parse(savedData);
        return parsedData || [] 
    });
    const [inputNewItem, setInputNewItem] = useState("");
    const [openItemAddedToast, setOpenItemAddedToast] = useState(false);
    const [openItemDeletedToast, setOpenItemDeletedToast] = useState(false);
    const [input, setInput] = useState("");
    const [open, setOpen] = React.useState(false);


    useEffect(()=>{

        localStorage.setItem("itemData",JSON.stringify(products));

    },[products])

   
const clickHandeler = () => {
    // const itemsData = products;

    // itemsData.push(input);
    // setProducts(itemsData);

    setProducts((prevData) => {
        return [...prevData, {
            name: input,
            purchased: false,
        }];
    })
    enqueueSnackbar('Item added successfully!')
    setInput("");
    setOpenItemAddedToast(true)
}
const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className='mainDiv'>
        <h1>Grocery Bud</h1>
        <div>
            <input style={{textTransform: 'capitalize'}} value={input} onChange={(e) => {
                setInput(e.target.value)
            }} type='text' />
            <button className='addbtn'  onClick={clickHandeler}>Add item</button>
            <SnackbarProvider style={{width:'500px'}} />
            <div className='list'>
                {
                    products.map((elem, index) => {
                        return(
                            <ItemsList products={products} setProducts={setProducts} index={index} itemName={elem.name} isPurchased = {elem.purchased} key={index} />
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default InputContainer