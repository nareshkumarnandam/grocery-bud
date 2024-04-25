import React, { useState, useEffect } from 'react';
import '../App.css';

const ItemsList = ({itemName, index , setProducts, products, isPurchased}) => {
    const [isChecked, setIsChecked] = useState(isPurchased);

    

    const deleteHandler = () => {
        setProducts((prev) => {
            const data = [...prev];
            data.splice(index, 1);
            return data;
        })
    }

  return (
    <div className='eachRow'>
        <input type='checkbox' checked={isPurchased ? true : false} onChange={(e) => {
            setIsChecked((prevValue) => !prevValue);
            setProducts((prev) => {
                const data = [...prev];

                data[index].purchased = !isPurchased;
                return data;
            })
        }} />
        <p style={{textDecoration: isPurchased ? "line-through" : 'none' , color: isPurchased ? 'gray' : 'black' , textTransform: 'capitalize', fontSize: '1.2rem' }} >{itemName}</p>
        <button className='deletebtn' onClick={deleteHandler} >Delete</button>
    </div>
  )
}

export default ItemsList