import React from 'react';
import './ReviewItems.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const ReviewItems = ({ product, hendleDeleteFromCart }) => {

    const { _id, img, name, price, quantity } = product;

    return (
        <div className='review-item'>
            <img src={img} alt="" />

            <div className='review-details'>
                <p className='product-title'>{name.length > 20 ? name.slice(0, 20) + '...' : name}</p>
                <p>Price:<span className='text-color'>${price}</span> </p>
                <p>Quantity: <span className='text-color'>{quantity}</span> </p>
            </div>

            <button onClick={() => hendleDeleteFromCart(_id)} className='delete-btn'>
                <FontAwesomeIcon className='delete-icon' icon={faTrash} />
            </button>

        </div>
    );
};

export default ReviewItems;