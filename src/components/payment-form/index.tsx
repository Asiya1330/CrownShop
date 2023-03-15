import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeCardElement } from '@stripe/stripe-js';
import { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart.selectors';
import { selectCurrentUser } from '../../store/user/user.selector';
import { BUTTON_CLASS_TYPES } from '../button'
import { FormContainer, PaymentFormContainer, PaymentButton } from './index.style'

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null

export default function PaymentForm() {

    const [processingPayments, setProcessingPayments] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProcessingPayments(true);
        if (!stripe || !elements) return;
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 }) //100.00 is written as 10000
        }).then(res => res.json())
        const { paymentIntent: { client_secret } } = response; //this user intents to pay..

        const cardDetails = elements.getElement(CardElement); //there is only one CardElement componecnt under Elements.. so it will take amount from that component
        if (!ifValidCardElement(cardDetails)) return

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardDetails,
                billing_details: {
                    name: currentUser ? currentUser.displayName : "Guest"
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

