import React from 'react';
import SignUpForm from '../../components/sign-up-form';
import SignInForm from '../../components/sign-in-form';
import './index.scss'

export default function SignIn() {

    return (
        <div className='signInPage'>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}
