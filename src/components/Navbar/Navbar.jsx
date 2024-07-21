// In Navbar.js
import React, { useContext, useState } from 'react';
import './Navbar.css';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import cart from '../assets/cart_icon.png';
import { ShopContext } from '../../context/ShopContext';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Use useNavigate for programmatic navigation

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out from your account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('auth-token');
                Swal.fire(
                    'Logged out!',
                    'You have been logged out successfully.',
                    'success'
                ).then(() => {
                    window.location.replace('/');
                });
            }
        });
    };

    const handleSearch = () => {
        if (searchTerm) {
            navigate(`/search?query=${searchTerm}`);
        }
    };

    const { getTotalCartItems } = useContext(ShopContext);

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt='/' />
                <p>Book Shopper</p>
            </div>
            <ul className='nav-menu'>
                <li><Link to='/' style={{ textDecoration: 'none' }}>Shop</Link></li>
                <li><Link to='/PD' style={{ textDecoration: 'none' }}>Personality Development</Link></li>
                <li><Link to='/E' style={{ textDecoration: 'none' }}>Educational</Link></li>
                <li><Link to='/F' style={{ textDecoration: 'none' }}>Fiction</Link></li>
            </ul>
            <div className="nav-search">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button  className='b' onClick={handleSearch}>Search</button>
            </div>
            <div className="nav-logo-cart">
                {localStorage.getItem('auth-token') 
                    ? <button onClick={handleLogout}>Logout</button>
                    : <Link to='/login'><button>Login</button></Link>
                }
                <Link to='/cart'><img src={cart} alt='/' /></Link>
                <p className='nav-cart-count'>{getTotalCartItems()}</p>
            </div>
        </div>
    );
};

export default Navbar;
