import React, { useContext } from 'react';
import star_icon from '../assets/star_icon.png';
import star_dull from '../assets/star_dull_icon.png';
import './PD.css';
import { ShopContext } from '../../context/ShopContext';
import Swal from 'sweetalert2';

const Productdisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    // Check if the product object is defined and has the necessary properties
    if (!product || !product.image || !product.name) {
        Swal.fire({
            title: 'Error',
            text: 'Product details are missing or incomplete.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return null; // Return null to avoid rendering the component with missing data
    }

    const isLoggedIn = () => {
        return !!localStorage.getItem('auth-token'); 
    };

    const handleAddToCart = (productId) => {
        if (isLoggedIn()) {
            addToCart(productId);
            Swal.fire({
                title: 'Added to Cart',
                text: `${product.name} has been added to your cart.`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else {
            Swal.fire({
                title: 'Login Required',
                text: 'You must be logged in to add items to the cart.',
                icon: 'warning',
                confirmButtonText: 'Login',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                cancelButtonColor: '#d33',
                confirmButtonColor: '#3085d6'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/login'; // Redirect to login page
                }
            });
        }
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {/* Add additional images here if needed */}
                </div>
                <div className="productdisplayimg">
                    <img className='productdis-main-img' src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="productdis-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt='star icon' />
                    <img src={star_icon} alt='star icon' />
                    <img src={star_icon} alt='star icon' />
                    <img src={star_dull} alt='star icon' />
                    <p>122 reviews</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        <span className="price-label">Old Price:</span> &#8377; {product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        <span className="price-label">New Price:</span> &#8377; {product.new_price}
                    </div>
                </div>
                <div className="prdis-right-description">
                    <p>{product.description}</p>
                </div>
                <div className="prdis-right-author">
                    <p><strong>Author:</strong> {product.author}</p>
                </div>
                <button className='add-to-cart-btn' onClick={() => handleAddToCart(product.id)}>ADD TO CART</button>
                <p className='prdis-right-cate'>
                    <span>Category:</span> {product.category}
                </p>
            </div>
        </div>
    );
};

export default Productdisplay;
