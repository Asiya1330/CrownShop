import React, { useState, useEffect } from 'react'
import FormInput from '../form-input'
import Button from '../button';
import { SignInContainer, SignInHeader, BtnContainer } from "./index.style.jsx";
import { BUTTON_CLASS_TYPES } from '../button'
import {
    auth,
    signInWithGooglePopup,
    signInUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';
import { getRedirectResult } from 'firebase/auth'
import { useDispatch } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../store/user/user.actions';

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
    const { email, password } = signinFormfields;

    const dispatch = useDispatch();
    const submitHandler = async (e) => {
        e.preventDefault(); //prevent default behavior of button
        try {
            const { email, password } = signinFormfields;
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        }
        catch (error) {
            if (error.code === 'auth/wrong-password') alert('You have entered the wrong credentials!');
            if (error.code === 'auth/user-not-found') alert("User does not exists!")
            console.log(error);
        }
    }

    const logGoogleUser = () => {
        dispatch(googleSignInStart());
    }

    const resetFormFields = () => {
        setsigninFormfields(defaultSignInValues);
    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setsigninFormfields({ ...signinFormfields, [name]: value })
    }

    return (
        <SignInContainer>
            <SignInHeader>Already have an account?</SignInHeader>
            <span>Sign in with your email and pasword</span>
            <form onSubmit={submitHandler}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    value={email}
                    name="email"
                    onChange={onChangeHandler}
                />
                <FormInput
                    label="Password"
                    type="passsord"
                    required
                    value={password}
                    name="password"
                    onChange={onChangeHandler}
                />
                <BtnContainer>
                    <Button type="submit">Sign IN</Button>
                    <Button type="button" buttonType={BUTTON_CLASS_TYPES.google} onClick={logGoogleUser}>Sign in with Google</Button>
                    {/* <Button buttonType="inverted" onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</Button> */}
                </BtnContainer>
            </form>
        </SignInContainer>
    )
}
