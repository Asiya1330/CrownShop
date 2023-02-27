import React from 'react';
import { Input, FormInputLabel, Group } from './index.style.jsx'

export default function FormInput({ label, ...inputProps }) {
    return (
        <Group>
            <Input className='form-input' {...inputProps}
            // type="text"
            // value={displayName}
            // required
            // id="display-name"
            // name="displayName"
            // onChange={handleChange}
            />
            {
                label &&
                <FormInputLabel moveUp={inputProps.value.length}>{label}</FormInputLabel>
            }
        </Group>
    )
}
