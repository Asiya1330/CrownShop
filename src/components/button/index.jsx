import React from 'react';
import { BaseButton, InvertedButton, GoogleSignInButton, ButtonSpinner } from './index.style.jsx';

export const BUTTON_CLASS_TYPES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: "inverted"
}

const getButton = (buttonType = 'base') => ({
    [BUTTON_CLASS_TYPES.base]: BaseButton,
    [BUTTON_CLASS_TYPES.google]: GoogleSignInButton,
    [BUTTON_CLASS_TYPES.inverted]: InvertedButton,
}[buttonType]);

export default function Button({ children, isLoading, buttonType, ...buttonProps }) {
    const CustomButton = getButton(buttonType)
    return (
        < CustomButton disabled={isLoading} {...buttonProps}>
            {/* if we manually pass diabled in buttonProps.. it will overide previous disabled..hence working oin both conditions */}
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton >
    )
}
