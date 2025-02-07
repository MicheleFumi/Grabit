import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';
function Payment() {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );

}


export default Payment;
