import React, { useContext } from 'react'
import { CartContext } from '../../context/cart-context';
import './index.scss';

export default function CheckoutItem({ product }) {
    const { name, quantity, price, imageUrl } = product;
    const { addItemToCart, decreaseCartItemQuantity, removeCartItem } = useContext(CartContext);

    const incrementQuantity = () => addItemToCart(product)
    const decrementQuantity = () => decreaseCartItemQuantity(product)

    const removeCartItemHandler = () => removeCartItem(product);

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
