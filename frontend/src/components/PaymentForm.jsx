import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function PaymentForm() {
    const [amount, setAmount] = useState(5000000); // L'importo in centesimi
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    // Funzione per creare il PaymentIntent
    const createPaymentIntent = async () => {
        const { data } = await axios.post('http://localhost:3005/create-payment-intent', { amount });
        setClientSecret(data.clientSecret);
    };

    // Funzione per gestire il pagamento
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (error) {
            console.log('[Error]', error);
            alert(error.message)
        } else {
            if (paymentIntent.status === 'succeeded') {
                console.log('Payment successful!');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">Complete Your Payment</h4>
                            <button className="btn btn-primary w-100 mb-3" onClick={createPaymentIntent}>
                                Create Payment Intent
                            </button>
                            {clientSecret && (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="card-element" className="form-label">
                                            Card details
                                        </label>
                                        <div className="border p-3 rounded">
                                            <CardElement id="card-element" />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success w-100" disabled={!stripe}>
                                        Pay Now
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentForm;
