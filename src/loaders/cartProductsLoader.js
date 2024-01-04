import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    //if cart data is in database,you have to use async await
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);

    const loadedProducts = await fetch('http://localhost:5000/productByIds', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    })
    const products = await loadedProducts.json();

    const savedCart = [];
    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd._id === id);
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }

    }
    //if you need to send two things
    //return [savedCart, products];
    //another options
    //return { cart: savedCart, products };

    return savedCart;
}

export default cartProductsLoader;