import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { CrownLogo } from '../../assets';
import { UserContext } from '../../context/user.context';
import { auth, signingOutUser } from '../../utils/firebase/firebase.utils';
import './index.scss';
import CartIcon from '../../components/cart-icon'
import CartDropDown from '../../components/card-dropdown';
import { CartContext } from '../../context/cart-context';

export default function Navigation() {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    return (
        <div>
            <div className='navigation'>
                <Link to='/' className='logo-container'>
                    <div>
                        <CrownLogo />
                    </div>
                </Link>
                <div className='nav-links-container'>
                    <Link to="/shop" className='nav-link'>SHOP</Link>
                    {
                        currentUser
                            ? <span className='nav-link' onClick={signingOutUser}>SIGN OUT</span>
                            : <Link to="/auth" className='nav-link'>SIGN UP</Link>
                    }
                    <Link>
                        <CartIcon />
                    </Link>
                    {
                        isCartOpen && <CartDropDown />
                    }
                </div>
            </div>
            <Outlet />
        </div>
    )
}
