import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart-context';
import Button from '../button';
import CartItem from '../cart-item';
import './index.scss';

export default function CartDropDown() {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const navigateCheckoutHandler = () => navigate('/checkout')
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.map((product) => {
                        return <CartItem key={product.id} product={product} />
                    })
                }
            </div>
            <Button onClick={navigateCheckoutHandler}>
                CHECKOUT
            </Button>
        </div>
    )
}
