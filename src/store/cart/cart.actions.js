import { createAction } from '../../utils/reducers/reducers.utils'
import { CART_ACTION_TYPES } from './cart.types';

const addToCartHandler = (product, cartItems) => {
    const cartItemExists = cartItems.find(item => item.id === product.id);
    if (cartItemExists) {
        return cartItems.map(item =>
            (item.id === product.id) ? { ...item, quantity: item.quantity + 1 } : item
        )
    }
    return [...cartItems, { ...product, quantity: 1 }]
}

const removeCartItemHandler = (product, cartItems) => {
    if (product.quantity === 1) {
        return deleteCartItemHandler(product, cartItems);
    }
    return cartItems.map(item => item.id === product.id ? { ...item, quantity: product.quantity - 1 } : item)
}

const deleteCartItemHandler = (product, cartItems) => cartItems.filter(item => item.id !== product.id);

export const addCartItem = (product, cartItems) => {
    console.log(product);
    const newCartItems = addToCartHandler(product, cartItems);
    return createAction(CART_ACTION_TYPES.SET_CART, newCartItems)
};
export const removeCartItem = (product, cartItems) => {
    const newCartItems = removeCartItemHandler(product, cartItems, deleteCartItem)
    return createAction(CART_ACTION_TYPES.SET_CART, newCartItems)

}
export const deleteCartItem = (product, cartItems) => {
    const newCartItems = deleteCartItemHandler(product, cartItems)
    return createAction(CART_ACTION_TYPES.SET_CART, newCartItems)
}

export const setIsCartOpen = () => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN)