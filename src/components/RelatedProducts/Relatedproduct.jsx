import React from 'react'
import './Rp.css';
import Item from '../Items/Item';
import data_product from '../assets/data';
const Relatedproduct = () => {
  return (
    <div className='rp'>
        <h1>Related Products</h1>
        <hr></hr>
        <div className='rp-item'>
          {data_product.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          })}
        </div>
        Relatedproduct</div>
  )
}

export default Relatedproduct