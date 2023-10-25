import React from 'react';
import './Cart.css'

const Cart = ({ cart }) => {
    console.log(cart)
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
        </div>
    );
};

export default Cart;