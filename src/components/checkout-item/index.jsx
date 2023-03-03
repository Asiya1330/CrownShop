import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, deleteCartItem, removeCartItem } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selectors';
import './index.scss';

export default function CheckoutItem({ product }) {
    const { name, quantity, price, imageUrl } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)

    const incrementQuantity = () => dispatch(addCartItem(product, cartItems))
    const decrementQuantity = () => dispatch(removeCartItem(product, cartItems))
    const removeCartItemHandler = () => dispatch(deleteCartItem(product, cartItems));

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <div className="name">
                {name}
            </div>
            <div className="quantity">
                <div className="arrow" onClick={decrementQuantity}>
                    &#10094;
                </div>
                <span className="value">
                    {quantity}
                </span>
                <div className="arrow" onClick={incrementQuantity}>
                    &#10095;
                </div>
            </div>
            <div className="price">
                {price}
            </div>
            <div onClick={removeCartItemHandler} className="remove-button">
                &#10005;
            </div>
        </div>
    )
}
