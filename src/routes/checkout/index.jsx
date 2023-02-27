import React, { useContext } from 'react'
import CheckoutItem from '../../components/checkout-item'
import { CartContext } from '../../context/cart-context'
import { CheckoutContainer, CheckoutHeader, TotleDiv, HeaderBlock } from './index.style.jsx';

export default function Checkout() {
    const { cartItems, cartTotal } = useContext(CartContext);

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
        </CheckoutContainer>
    )
}
