import styled, { css } from 'styled-components'

const SubColor = 'grey';

// mixin like in sass
const moveUpLabelStyles = css`
 top: -14px;
    font-size: 12px;
    color: $main-color;
`

export const FormInputLabel = styled.label`
color: ${SubColor};
font-size: 16px;
font-weight: normal;
position: absolute; //label will remain above inputs whether we place it below input
pointer-events: none;
left: 5px;
top: 10px;
transition: 300ms ease all;

${({ moveUp }) => moveUp && moveUpLabelStyles}

// &.move-up {
//     @include moveUpLabel();
// }
`

export const Input = styled.input`
background: none;
background-color: white;
color: ${SubColor};
font-size: 18px;
padding: 10px 10px 10px 5px;
display: block;
width: 100%;
border: none;
border-radius: 0;
border-bottom: 1px solid ${SubColor};
margin: 25px 0;

&:focus {
    outline: none;
}

&:focus~${FormInputLabel} {
    ${moveUpLabelStyles}
}
`

export const Group = styled.div`
    position: relative;
    margin: 45px 0;

    input[type='password'] {
        letter-spacing: 0.3em;
    }
`
