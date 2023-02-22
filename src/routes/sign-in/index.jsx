import React, { useEffect, useState } from 'react';
import { getRedirectResult } from 'firebase/auth'
import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form';


export default function SignIn() {

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

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    }

    return (
        <div>
            <button onClick={logGoogleUser}>Sign in with Google</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
            <SignUpForm />
        </div>
    )
}
