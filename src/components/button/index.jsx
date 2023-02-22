/**
 * default, 
 * inverted
 * google
 */
import React from 'react';
import './index.scss';

const BTN_CLASS_TYPES = {
    google: 'google-sign-in',
    inverted: "inverted"
}
export default function Button({ children, buttonType, ...buttonProps }) {
    return (
        <button {...buttonProps} className={`${BTN_CLASS_TYPES[buttonType]} button-container`}>
            {children}
        </button>

    )
}
