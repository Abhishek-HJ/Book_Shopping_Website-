import React, { useContext, useState } from 'react';
import '../pages/css/shopcat.css';
import { ShopContext } from '../context/ShopContext';

import Item from '../components/Items/Item';

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    const [sortOption, setSortOption] = useState('default');

    // Function to handle sorting
    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    // Function to sort products
    const sortedProducts = () => {
        let products = [...all_product];
        if (sortOption === 'priceAsc') {
            return products.sort((a, b) => a.new_price - b.new_price);
        } else if (sortOption === 'priceDesc') {
            return products.sort((a, b) => b.new_price - a.new_price);
        } else if (sortOption === 'nameAsc') {
            return products.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === 'nameDesc') {
            return products.sort((a, b) => b.name.localeCompare(a.name));
        } else {
            return products;
        }
    };

    return (
        <div className='shop-category'>
            <img src={props.banner} alt='' className='b' />
            <div className="shopcat-sort">
                
                <div className="shopcat-s">
                    Sort by 
                    <select onChange={handleSortChange} value={sortOption}>
                        <option value="default">Default</option>
                        <option value="priceAsc">Price: Low to High</option>
                        <option value="priceDesc">Price: High to Low</option>
                        <option value="nameAsc">Name: A to Z</option>
                        <option value="nameDesc">Name: Z to A</option>
                    </select>
                   
                </div>
            </div>

            <div className="shopcategory-products">
                {sortedProducts().map((item, i) => {
                    if (props.category === item.category) {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className="shopcategory-loadmore"></div>
        </div>
    );
};

export default ShopCategory;
