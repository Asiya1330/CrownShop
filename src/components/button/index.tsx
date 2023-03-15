import { ButtonHTMLAttributes, ReactNode } from 'react';
import { BaseButton, InvertedButton, GoogleSignInButton, ButtonSpinner } from './index.style';

export enum BUTTON_CLASS_TYPES {
    base = 'base',
    google = 'google-sign-in',
    inverted = "inverted"
}

const getButton = (buttonType = BUTTON_CLASS_TYPES.base): typeof BaseButton => ({
    [BUTTON_CLASS_TYPES.base]: BaseButton,
    [BUTTON_CLASS_TYPES.google]: GoogleSignInButton,
    [BUTTON_CLASS_TYPES.inverted]: InvertedButton,
}[buttonType]);

type IButtonProps = {
    children: ReactNode,
    isLoading?: boolean,
    buttonType?: BUTTON_CLASS_TYPES,
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, isLoading, buttonType, ...buttonProps }: IButtonProps) {
    const CustomButton = getButton(buttonType)
    return (
        < CustomButton disabled={isLoading} {...buttonProps}>
            {/* if we manually pass diabled in buttonProps.. it will overide previous disabled..hence working oin both conditions */}
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton >
    )
}
