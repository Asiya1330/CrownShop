import React from 'react';
import SignUpForm from '../../components/sign-up-form';
import SignInForm from '../../components/sign-in-form';
import { SignInDiv } from './index.style.jsx'

export default function SignIn() {

    return (
        <SignInDiv>
            <SignInForm />
            <SignUpForm />
        </SignInDiv>
    )
}
