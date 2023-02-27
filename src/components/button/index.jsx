import React from 'react';
import { BaseButton, InvertedButton, GoogleSignInButton } from './index.style.jsx';

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

export default function Button({ children, buttonType, ...buttonProps }) {
    const CustomButton = getButton(buttonType)
    return (
        <CustomButton {...buttonProps}>{children}</CustomButton>
    )
}
