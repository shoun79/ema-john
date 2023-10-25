import React from 'react';
import './Cart.css'

const Cart = ({ cart }) => {
    // const total = cart.reduce((previous, current) => previous + current.price, 0);
    let totalPrice = 0;
    let totalShipping = 0;
    for (const product of cart) {
        totalPrice = totalPrice + product.price;
        totalShipping = totalShipping + product.shipping;
    }
    const tax = totalPrice * 7 / 100;
    const grandPrice = totalPrice + totalShipping + tax;
    return (
        <div className='cart'>
            <h2>Order Summary</h2>
            <p>Selected Items: {cart.length}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping Charge: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h4>Grand Total: ${grandPrice.toFixed(2)}</h4>
        </div>
    );
};

export default Cart;