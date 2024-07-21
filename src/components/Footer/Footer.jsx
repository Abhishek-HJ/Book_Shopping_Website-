import React from 'react';
import './Footer.css';
import footer_logo from '../assets/logo.jpeg';
const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt='/'/>
            <p>Book Shopper</p>
        </div>
        <ul className='footer-link'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
       
        <div className="footer-copy">
            < hr />
            <p>Copyright @2024 - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer