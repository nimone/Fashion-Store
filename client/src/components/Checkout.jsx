import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm"
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY
const stripePromise = loadStripe(STRIPE_PUB_KEY);

export default function Checkout() {
	return (
		<div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
		</div>
	)
}