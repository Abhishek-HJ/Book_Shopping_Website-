import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css'; // Custom styles

const Item = (props) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
      <div className="card h-100">
        <Link to={`/product/${props.id}`}>
          <img src={props.image} alt={props.name} className="card-img-top" />
        </Link>
        <div className="card-body">
          <p className="card-title">{props.name}</p>
          <div className="item-prices mt-auto">
            <div className="item-price-new">
              &#8377;{props.new_price}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
