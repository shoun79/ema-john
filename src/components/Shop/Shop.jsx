import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [cart, setCart] = useState([]);
    const { totalProducts } = useLoaderData();
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const pageNumbers = [...Array(totalPages).keys()];
    const options = [5, 10, 15, 20];


    /**
     *1.Determine the total number of items
     2.Todo:Decide on the number of items to display on each page.
     3.Calculate Total Pages:
     4.Determine the current page
     */



    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
                const result = await response.json();
                setProducts(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetch function
        fetchData();
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);

        fetch('http://localhost:5000/productByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {
                console.log(cartProducts);
                const savedCart = [];
                //step 1:get id of the added product
                for (const id in storedCart) {
                    //Step 2:get the product by using id
                    const addedProduct = cartProducts.find(product => product._id === id);
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
            })



    }, [])

    const hendleAddCart = product => {
        let newCart = [];
        //solution03: kothin 
        //if product doesn't exists in the cart,then set quantity=1
        //if exists update quantity by 1  

        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product._id)
    };
    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value, 10);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(0); // Reset to the first page when changing items per page
        //onPageChange(1, newItemsPerPage);
    };

    return (
        <>
            <div className='shop-container'>
                <div className='products-container'>
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            hendleAddCart={hendleAddCart}
                        ></Product>)
                    }

                </div>
                <div className='cart-container'>
                    <Cart
                        cart={cart}
                        clearCart={clearCart}
                    >
                        <Link className='btn-link' to='/orders'>
                            <button className='btn-proceed-order'>
                                <span>Review Order</span>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </Link>
                    </Cart>
                </div>

            </div>
            {/* pagination  */}
            <div className="paginaton">
                <p>Current Page: {currentPage}</p>
                <p>Items per Page:{itemsPerPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={currentPage === number ? 'selected' : ''}
                    >
                        {number + 1}
                    </button>)
                }
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}

                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default Shop;