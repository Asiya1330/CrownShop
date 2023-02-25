import React, { useContext } from 'react';
import './index.scss'
import Button from '../button';
import { CartContext } from '../../context/cart-context';

export default function ProductCard({ product }) {
    const { name, imageUrl, price } = product;
    const { addItemToCart } = useContext(CartContext);

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={name} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={() => addItemToCart(product)}>Add To Cart</Button>
        </div>
    )
}
