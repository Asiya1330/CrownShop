import React from 'react'
import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkout-item'
import PaymentForm from '../../components/payment-form';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selectors';
import { CheckoutContainer, CheckoutHeader, TotleDiv, HeaderBlock } from './index.style.jsx';

export default function Checkout() {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal)
    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map((product) => {
                    return <CheckoutItem key={product.id} product={product} />
                })
            }
            <TotleDiv>
                Total:${cartTotal}
            </TotleDiv>
            <PaymentForm />
        </CheckoutContainer>
    )
}
