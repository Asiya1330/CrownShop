import React from 'react';
import './index.scss'

export default function CartItem({ product }) {
    const { name, quantity, price, imageUrl } = product;
    return (
        <div className='cart-item-container'>
            <img src={imageUrl} alt={name} />
            <div className='item-details'>
                <span>{name}</span>
                <span>{quantity} x {price}</span>
            </div>
        </div>
    )
}
