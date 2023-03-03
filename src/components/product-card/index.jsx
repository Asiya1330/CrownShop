import React from 'react';
import './index.scss'
import Button, { BUTTON_CLASS_TYPES } from '../button';
import { addCartItem } from '../../store/cart/cart.actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selectors';

export default function ProductCard({ product }) {
    const { name, imageUrl, price } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)
    const addItemtoCartHandler = () => dispatch(addCartItem(product, cartItems))
    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={name} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType={BUTTON_CLASS_TYPES.inverted} onClick={addItemtoCartHandler}>Add To Cart</Button>
        </div>
    )
}
