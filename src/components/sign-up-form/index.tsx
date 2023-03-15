import { ChangeEvent, FormEvent, useState } from 'react'
import FormInput from '../form-input'
import { SignUpContainer, SignUpHeader } from './index.style';
import Button, { BUTTON_CLASS_TYPES } from '../button'
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/user.actions';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export default function SignUpForm() {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const dispatch = useDispatch();
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { password, confirmPassword, displayName, email } = formFields;
        if (password !== confirmPassword) {
            alert('passwords should be matched');
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName));
            resetForm();
        }
        catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) alert('Email Already in Use');
            console.log(error);
        }
    }

    const resetForm = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
