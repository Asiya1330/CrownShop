import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart.selectors';
import { selectCurrentUser } from '../../store/user/user.selector';
import Button, { BUTTON_CLASS_TYPES } from '../button'
import { FormContainer, PaymentFormContainer, PaymentButton } from './index.style'

export default function PaymentForm() {

    const [processingPayments, setProcessingPayments] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const paymentHandler = async (e) => {
        e.preventDefault();
        setProcessingPayments(true);
        if (!stripe || !elements) return;
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 }) //100.00 is written as 10000
        }).then(res => res.json())
        const { paymentIntent: { client_secret } } = response; //this user intents to pay..
        console.log(client_secret);

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement), //there is only one CardElement component under Elements.. so it will take amount from that component
                billing_details: {
                    name: currentUser ? currentUser.name : "Guest"
                }
            }
        })
        if (paymentResult.error) alert(paymentResult.error.message)
        else alert(`Payment of $${amount} is successfull!`)

        setProcessingPayments(false);
    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton isLoading={processingPayments} buttonType={BUTTON_CLASS_TYPES.inverted}>Pay Now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer >
    )
}

