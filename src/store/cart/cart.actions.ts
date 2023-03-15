import { createAction } from '../../utils/reducers/reducers.utils'
import { CART_ACTION_TYPES, ICartItem } from './cart.types';
import { CategoryItem } from '../categories/categories.types'

const addToCartHandler = (product: CategoryItem, cartItems: ICartItem[]): ICartItem[] => {
    const cartItemExists = cartItems.find(item => item.id === product.id);
    if (cartItemExists) {
        return cartItems.map(item =>
            (item.id === product.id) ? { ...item, quantity: item.quantity + 1 } : item
        )
    }
    return [...cartItems, { ...product, quantity: 1 }]
}

const removeCartItemHandler = (product: ICartItem, cartItems: ICartItem[]): ICartItem[] => {
    if (product.quantity === 1) {
        return deleteCartItemHandler(product, cartItems);
    }
    return cartItems.map(item => item.id === product.id ? { ...item, quantity: product.quantity - 1 } : item)
}

const deleteCartItemHandler = (product: ICartItem, cartItems: ICartItem[]): ICartItem[] =>
    cartItems.filter(item => item.id !== product.id);


export const addCartItem = (product: CategoryItem, cartItems: ICartItem[]) => {
    const newCartItems = addToCartHandler(product, cartItems);
    return createAction(CART_ACTION_TYPES.SET_CART, newCartItems)
};
export const removeCartItem = (product: ICartItem, cartItems: ICartItem[]) => {
    const newCartItems = removeCartItemHandler(product, cartItems)
    return createAction(CART_ACTION_TYPES.SET_CART, newCartItems)
}
export const deleteCartItem = (product: ICartItem, cartItems: ICartItem[]) => {
    const newCartItems = deleteCartItemHandler(product, cartItems)
    return createAction(CART_ACTION_TYPES.SET_CART, newCartItems)
}

export const setIsCartOpen = () => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN)