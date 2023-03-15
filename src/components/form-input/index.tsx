import React, { HTMLAttributes } from 'react';
import { Input, FormInputLabel, Group } from './index.style.jsx'

type FormInputProps = {
    label: string,
    value: string;
}
export default function FormInput({ label, ...inputProps }: FormInputProps) {
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
