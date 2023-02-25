import React, { useContext } from 'react'
import CheckoutItem from '../../components/checkout-item'
import { CartContext } from '../../context/cart-context'
import './index.scss';

export default function Checkout() {
    const { cartItems, updateCountAndTotal, cartTotal } = useContext(CartContext)
    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((product) => {
                return <CheckoutItem key={product.id} product={product} />
            })}
            <span className="total">
                Total:${cartTotal}
            </span>
        </div>
    )
}
