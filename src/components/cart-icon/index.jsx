import React, { useContext } from 'react'
import { ShoppingIcon, ItemCount, CartIconContainer } from './index.style.jsx';
import { CartContext } from '../../context/cart-context';

export default function CartIcon() {
    const { setIsCartOpen, isCartOpen, cartCount } = useContext(CartContext);
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleCart} >
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}
