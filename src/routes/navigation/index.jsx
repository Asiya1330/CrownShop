import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { CrownLogo } from '../../assets';
import './index.scss'

export default function Navigation() {
    return (
        <div>
            <div className='navigation'>
                <Link to='/' className='logo-con'>
                    <div>
                        <CrownLogo />
                    </div>
                </Link>
                <div className='nav-links-cont'>
                    <Link to="/shop" className='nav-link'>SHOP</Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
