import React, { useContext } from 'react'
import { CartContext } from '../../context/cart-context';
import Button from '../button';
import CartItem from '../cart-item';
import './index.scss';

export default function CartDropDown() {
    const { cartItems } = useContext(CartContext);

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.map((product) => {
                        return <CartItem product={product} />
                    })
                }
            </div>
            <Button>CHECKOUT</Button>
        </div>
    )
}
