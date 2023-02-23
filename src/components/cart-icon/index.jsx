import React, { useContext } from 'react'
import './index.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../context/cart-context';

export default function CartIcon() {
    const { setIsCartOpen, isCartOpen, cartCount } = useContext(CartContext);
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <div className='cart-icon-container' onClick={toggleCart} >
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}
