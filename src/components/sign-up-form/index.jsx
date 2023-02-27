import React, { useState } from 'react'
import { creatAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input'
import { SignUpContainer, SignUpHeader } from './index.style.jsx';
import Button, { BUTTON_CLASS_TYPES } from '../button'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export default function SignUpForm() {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const submitHandler = async (e) => {
        e.preventDefault();
        const { password, confirmPassword, displayName, email } = formFields;
        if (password !== confirmPassword) {
            alert('passwords should be matched');
            return;
        }
        try {
            const { user } = await creatAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName }); //displayname will be null in case of createuserbyemailandpass
            resetForm();
        }
        catch (error) {
            if (error.code === 'auth/email-already-in-use') alert('Email Already in Use');
            console.log(error);
        }
    }

    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }
    return (
        <SignUpContainer>
            <SignUpHeader>Don't have an account?</SignUpHeader>
            <span>Sign up with your email and pasword</span>
            <form onSubmit={submitHandler}>
                <FormInput
                    type="text"
                    label="Display Name"
                    value={displayName}
                    required
                    id="display-name"
                    name="displayName"
                    onChange={handleChange}
                />

                <FormInput
                    label="Email"
                    type="email"
                    required
                    id="email"
                    value={email}
                    name="email"
                    onChange={handleChange}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    id="password"
                    value={password}
                    name="password"
                    onChange={handleChange}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    id="confirm-pass"
                    value={confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange} />

                <Button buttonType={BUTTON_CLASS_TYPES.inverted} type='submit'>Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}
