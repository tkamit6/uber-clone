import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'

export default function CheckOutForm({ amount }) {
    const stripe = useStripe()
    const elements = useElements();
    const [secretKey, setSecretKey] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!elements) {
            return;
        }
        const { error: submitError } = await elements.submit();
        if (submitError) {
            return;
        }
        try {
            const res = await fetch('/api/create-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: amount
                })
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            setSecretKey(data)
            console.log(secretKey);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }


        const { error } = await stripe.confirmOxxoPayment({
            clientSecret: secretKey,
            elements,
            confirmParams: {
                returnUrl: 'http://localhost:3000/'
            }
        })
    }
    return (
        <div className='flex flex-col justify-center items-center w-full mt-6'>
            <h2 className='m-5 font-bold'>Amount to pay: {amount}</h2>
            <form onSubmit={handleSubmit} className='max-w-md'>
                <PaymentElement />
                <button className='w-full bg-black text-white  mt-2'>Pay</button>
            </form>
        </div>
    )
}
