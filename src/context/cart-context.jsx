import React, { useState } from 'react';
import { createContext } from 'react';

export const CartContext = createContext({
    cartItems: [],
    isCartOpen: false,
    setIsCartOpen: () => null,
    setCartItems: () => null,
    addToCartHandler: () => null,
    cartCount: 0
})

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const addToCartHandler = (product) => {
        const cartItemExists = cartItems.find(item => item.id === product.id);
        if (cartItemExists) {
            const updatedCartItemQuantity = cartItems.map(item =>
                (item.id === product.id) ? { ...item, quantity: item.quantity + 1 } : item
            )
            setCartItems(updatedCartItemQuantity);
        }
        else {
            const cartProduct = { ...product, quantity: 1 }
            setCartItems([...cartItems, cartProduct])
        }
        setCartCount(cartCount + 1)
    }

    const value = { cartItems, isCartOpen, setIsCartOpen, setCartItems, addToCartHandler, cartCount }
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
