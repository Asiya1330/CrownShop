import React from 'react'
import { Outlet } from 'react-router-dom';
import { CrownLogo } from '../../assets';
import { signingOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon'
import CartDropDown from '../../components/cart-dropdown';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './index.style.jsx';
import { useSelector } from 'react-redux';
import { selectUserReducer } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selectors';

export default function Navigation() {

    const currentUser = useSelector(selectUserReducer);
    const isCartOpen = useSelector(selectIsCartOpen);

    return (
        <>
            <NavigationContainer>
                <LogoContainer to='/' >
                    <div>
                        <CrownLogo />
                    </div>
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">SHOP</NavLink> 
                    {
                        currentUser
                        // {/* we can use as to change the html tag that we use in styled components */}
                            ? <NavLink as={'span'} onClick={signingOutUser}>SIGN OUT</NavLink>
                            : <NavLink to="/auth" >SIGN UP</NavLink>
                    }
                    <NavLink>
                        <CartIcon />
                    </NavLink>
                    {
                        isCartOpen && <CartDropDown />
                    }
                </NavLinks>
            </NavigationContainer>
            <Outlet />
        </>
    )
}
