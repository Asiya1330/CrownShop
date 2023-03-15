import { InputHTMLAttributes } from 'react';
import { Input, FormInputLabel, Group } from './index.style'

type FormInputProps = {
    label: string,
} & InputHTMLAttributes<HTMLInputElement>

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
                <FormInputLabel moveUp={Boolean(inputProps.value &&
                    (inputProps?.value) === 'string' &&
                    inputProps?.value.length)}>{label}</FormInputLabel>
            }
        </Group>
    )
}
