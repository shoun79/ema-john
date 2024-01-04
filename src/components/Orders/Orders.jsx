import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItems from '../ReviewItems/ReviewItems';
import './Orders.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBedPulse } from '@fortawesome/free-solid-svg-icons'

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);

    const hendleDeleteFromCart = (id) => {
        const remaining = cart.filter(pd => pd._id !== id);
        setCart(remaining);
        removeFromDb(id);
    }
    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container shop'>
            <div className='review-container'>
                {
                    cart.map(product => <ReviewItems
                        key={product._id}
                        product={product}
                        hendleDeleteFromCart={hendleDeleteFromCart}
                    ></ReviewItems>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}
                    clearCart={clearCart}
                >
                    <Link className='btn-link' to='/checkout'>
                        <button className='btn-proceed-order'>
                            <span>Proceed Checkout</span>
                            <FontAwesomeIcon icon={faBedPulse} />
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;