import React, { useState, useEffect } from 'react'
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/checkout/payment", {
      // method: "POST",
      headers: {
        // "Content-Type": "application/json",
        "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTZhZDY5Nzg5YTQ3NDMxMDRjZGQ2MzciLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjM0MzkxNzEyLCJleHAiOjE2MzQ2NTA5MTJ9.MRatnztCi5JofJ6kNdIMvMI2hKj85NpOtauxM6hlIjg",
      },
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setClientSecret(data.clientSecret)
    })
  }, [])

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  }
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    })
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={cardStyle} onChange={handleChange} />
      <button disabled={processing || disabled || succeeded}>
        <span id="button-text">
          {processing ? "processing..." : "Pay now"}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      {succeeded && (
        <p>
          Payment succeeded, see the result in your
          <a
            href={`https://dashboard.stripe.com/test/payments`}
          >
            {" "}
            Stripe dashboard.
          </a> Refresh the page to pay again.
        </p>
      )}
    </form>
  );
}