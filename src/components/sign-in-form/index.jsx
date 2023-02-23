import React, { useState, useEffect } from 'react'
import FormInput from '../form-input'
import Button from '../button';
import "./index.scss";
import {
    auth,
    signInWithGooglePopup,
    signInUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';
import { getRedirectResult } from 'firebase/auth'


const defaultSignInValues = {
    email: '',
    password: ""
}
export default function SignInForm() {

    useEffect(() => {
        async function fetchData() {
            const response = await getRedirectResult(auth); //auth maintain the getRedirectResult and sen us bacl the user response
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user)
                console.log(userDocRef);
            }
        }
        fetchData()
    }, []);

    const [signinFormfields, setsigninFormfields] = useState(defaultSignInValues);
    const { email, password } = signinFormfields
    const submitHandler = async (e) => {
        e.preventDefault(); //prevent default behavior of button
        try {
            const { email, password } = signinFormfields;
            await signInUserWithEmailAndPassword(email, password)
            resetFormFields();
        }
        catch (error) {
            if (error.code === 'auth/wrong-password') alert('You have entered the wrong credentials!');
            if (error.code === 'auth/user-not-found') alert("User does not exists!")
            console.log(error);
        }
    }

    const resetFormFields = () => {
        setsigninFormfields(defaultSignInValues);
    }
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    }

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setsigninFormfields({ ...signinFormfields, [name]: value })
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account??</h2>
            <span>Sign in with your email and pasword</span>
            <form onSubmit={submitHandler}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    value={email}
                    name="email"
                    onChange={changeHandler}
                />
                <FormInput
                    label="Password"
                    type="passsord"
                    required
                    value={password}
                    name="password"
                    onChange={changeHandler}
                />
                <div className='btn-container'>
                    <Button type="submit">Sign IN</Button>
                    <Button type="button" buttonType="google" onClick={logGoogleUser}>Sign in with Google</Button>
                    {/* <Button buttonType="inverted" onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</Button> */}
                </div>
            </form>

        </div>
    )
}
