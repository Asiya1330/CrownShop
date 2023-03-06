import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './index.style'

export default function Spinner() {
    return (
        <SpinnerOverlay >
            <SpinnerContainer />
        </SpinnerOverlay>
    )
}
