import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../store/cart/cart.selectors';
import Button from '../button';
import CartItem from '../cart-item';
import { CartDropDownContainer, CartItems, EmptyMessage } from './index.style.jsx';

export default function CartDropDown() {
    const cartItems = useSelector(selectCartItems)
    const navigate = useNavigate();
    const navigateCheckoutHandler = () => navigate('/checkout')
    return (
        <CartDropDownContainer>
            <CartItems>
                {   
                    cartItems.length ? (cartItems.map((product) => {
                        return <CartItem key={product.id} product={product} />
                    })) : (<EmptyMessage>Cart is empty!</EmptyMessage>)
                }
            </CartItems>
            <Button onClick={navigateCheckoutHandler}>
                CHECKOUT
            </Button>
        </CartDropDownContainer>
    )
}
