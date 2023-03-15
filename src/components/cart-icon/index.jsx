import { ShoppingIcon, ItemCount, CartIconContainer } from './index.style';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount } from '../../store/cart/cart.selectors';
import { setIsCartOpen } from '../../store/cart/cart.actions';

export default function CartIcon() {
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const toggleCart = () => dispatch(setIsCartOpen())

    return (
        <CartIconContainer onClick={toggleCart} >
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}
