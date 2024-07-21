import React, { useContext } from 'react';
import './CI.css';
import { ShopContext } from '../../context/ShopContext';
import remove from '../assets/cart_cross_icon.png';

const CartItem = () => {
  const { getTotalCartAmount,all_product, cartItems, removeCart } = useContext(ShopContext);

  return (
    <div className='cartitems'>
      <div className="cartitem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((product) => {
        if (cartItems[product.id] > 0) {
          return (
            <div key={product.id}>
              <div className="cartitems-format">
                <img src={product.image} alt={product.name} className='carticon-product-icon' />
                <p>{product.name}</p>
                <p>{product.new_price}</p>
                <button className='cart-item-quantity'>{cartItems[product.id]}</button>
                <p>{product.new_price * cartItems[product.id]}</p>
                <img src={remove} alt='Remove' onClick={() => removeCart(product.id)} />
              </div>
            </div>
          );
        } 
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>

            </div>
            <hr></hr>
            <div className="cartitems-total-item">
              <p>Shippinf Fee</p>
              <p>Free</p>
            </div>
            <hr></hr>
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>Proceed to Checkout</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code,Enter it here</p>
          <div className="cartitems-promobox">
            <input type='text' placeholder='promocode'/>
            <button>Submit</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartItem;
