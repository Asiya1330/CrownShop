import React, { useState } from 'react'


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export default function SignUpForm() {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        // formFields[name]=value
        setFormFields({ ...formFields, [name]: value });
    }
    return (
        <div>
            <h1>Sign up with your email and pasword</h1>
            <form onSubmit={() => { }}>
                <label htmlFor="display-name">Display Name</label>
                <input type="text" value={displayName} required id="display-name" name="displayName" onChange={handleChange} />


                <label htmlFor="email">Email</label>
                <input type="email" required id="email" value={email} name="email" onChange={handleChange} />


                <label htmlFor="password">Password</label>
                <input type="password" required id="password" value={password} name="password" onChange={handleChange} />


                <label htmlFor="confirm-pass">Confirm Password</label>
                <input type="password" required id="confirm-pass" value={confirmPassword} name="confirmPassword" onChange={handleChange} />

                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}
