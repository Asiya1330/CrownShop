import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart-context';
import Button from '../button';
import CartItem from '../cart-item';
import { CartDropDownContainer, CartItems, EmptyMessage } from './index.style.jsx';

export default function CartDropDown() {
    const { cartItems } = useContext(CartContext);
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
