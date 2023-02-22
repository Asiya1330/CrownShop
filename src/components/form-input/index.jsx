import React from 'react';
import './index.scss'

export default function FormInput({ label, ...inputProps }) {
    return (
        <div className='group'>
            <input className='form-input' {...inputProps}
            // type="text"
            // value={displayName}
            // required
            // id="display-name"
            // name="displayName"
            // onChange={handleChange}
            />
            {
                label &&
                <label className={`${inputProps.value.length > 0 ? 'move-up' : ''} form-input-label`}>{label}</label>
            }
        </div>
    )
}
