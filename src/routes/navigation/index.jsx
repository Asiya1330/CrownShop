import React from 'react'
import { Outlet } from 'react-router-dom';
import { CrownLogo } from '../../assets';
import CartIcon from '../../components/cart-icon'
import CartDropDown from '../../components/cart-dropdown';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './index.style.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selectors';
import { signOutStart } from '../../store/user/user.actions';

export default function Navigation() {

    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const dispatch = useDispatch()
    const handleSignOut = () => dispatch(signOutStart())
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
                            ? <NavLink as={'span'} onClick={handleSignOut}>SIGN OUT</NavLink>
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
