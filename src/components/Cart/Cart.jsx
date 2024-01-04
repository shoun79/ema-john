import React from 'react';
import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Cart = ({ cart, clearCart, children }) => {


    // const total = cart.reduce((previous, current) => previous + current.price, 0);
    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for (const product of cart) {
        //shortcut :solution01
        // product.quantity = product.quantity || 1;

        //solution02
        // if (product.quantity === 0) {
        //     product.quantity = 1;
        // }
        //solution03: kothin 
        //shop.jsx ar hendleAddCart function a

        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    }
    const tax = totalPrice * 7 / 100;
    const grandPrice = totalPrice + totalShipping + tax;
    return (
        <div className='cart'>
            <h2>Order Summary</h2>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping Charge: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h4>Grand Total: ${grandPrice.toFixed(2)}</h4>
            <button onClick={clearCart} className='btn-clear-cart'>
                <span>Clear Cart </span>
                <FontAwesomeIcon icon={faTrash} /></button>
            {children}
        </div>
    );
};

export default Cart;