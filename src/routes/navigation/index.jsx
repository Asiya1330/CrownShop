import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { CrownLogo } from '../../assets';
import { UserContext } from '../../context/user.context';
import { signingOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon'
import CartDropDown from '../../components/cart-dropdown';
import { CartContext } from '../../context/cart-context';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './index.style.jsx';

export default function Navigation() {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
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
