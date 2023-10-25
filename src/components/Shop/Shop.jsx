import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))

    }, []);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        //step 1:get id of the added product
        for (const id in storedCart) {
            //Step 2:get the product by using id
            const addedProduct = products.find(product => product.id === id);
            //step 3:get quantity of the product
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                //step 4:add the addedProduct to the save cart
                savedCart.push(addedProduct);
            }
        }
        //step 5:save the cart
        setCart(savedCart)
    }, [products])

    const hendleAddCart = product => {
        let newCart = [];
        //solution03: kothin 
        //if product doesn't exists in the cart,then set quantity=1
        //if exists update quantity by 1  

        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product.id)
    }
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        hendleAddCart={hendleAddCart}
                    ></Product>)
                }

            </div>
            <div className='cart-container'>
                <Cart
                    cart={cart}
                ></Cart>
            </div>

        </div>
    );
};

export default Shop;