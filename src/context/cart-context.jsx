import React, { useEffect, useState } from 'react';
import { createContext } from 'react';

export const CartContext = createContext({
    cartItems: [],
    isCartOpen: false,
    setIsCartOpen: () => null,
    addItemToCart: () => null,
    decreaseCartItemQuantity: () => null,
    removeCartItem: () => null,
    cartCount: 0,
    cartTotal: 0,
    updateCountAndTotal: 0
})

const addToCartHandler = (product, cartItems) => {
    const cartItemExists = cartItems.find(item => item.id === product.id);
    if (cartItemExists) {
        return cartItems.map(item =>
            (item.id === product.id) ? { ...item, quantity: item.quantity + 1 } : item
        )
    }
    return [...cartItems, { ...product, quantity: 1 }]
}

const decrementItemQuantityHandler = (product, cartItems, removeCartItem) => {
    if (product.quantity === 1) {
        return removeCartItem(product);
    }
    return cartItems.map(item => item.id === product.id ? { ...item, quantity: product.quantity - 1 } : item)
}

const removeItemFromCartHandler = (product, cartItems) => {
    return cartItems.filter(item => item.id !== product.id);
}

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => { 
        updateCountAndTotal();
    }, [cartItems])

    const cartTotalItems = () => {
        const cartItemsCount = cartItems.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)
        setCartCount(cartItemsCount);
    }
    const cartTotalPrice = () => {
        const cartTotal = cartItems.reduce((totalPrice, item) => totalPrice + (item.price * item.quantity), 0)
        setCartTotal(cartTotal)
    }
    const updateCountAndTotal = () => {
        cartTotalPrice();
        cartTotalItems();
    }
    const addItemToCart = (product) => {
        setCartItems(addToCartHandler(product, cartItems))
    };
    const decreaseCartItemQuantity = (product) => {
        setCartItems(decrementItemQuantityHandler(product, cartItems, removeCartItem))
    }
    const removeCartItem = (product) => {
        setCartItems(removeItemFromCartHandler(product, cartItems))
    }

    const value = { cartItems, isCartOpen, removeCartItem, setIsCartOpen, addItemToCart, cartCount, decreaseCartItemQuantity, cartTotal, updateCountAndTotal }

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
