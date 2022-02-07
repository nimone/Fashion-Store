import React, { useState, useEffect } from 'react'
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"
import api from '../api'
import Button from './Button'
import Loader from "./Loader"
import { CheckCircle, ChevronRight, CreditCard, X } from 'react-feather'
import { Link } from 'react-router-dom'

export default function CheckoutForm({onCancel,onSuccess}) {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [orderDetails, setOrderDetails] = useState({})
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    (async () => {
      const resp = await api.proceedCheckout()
      console.log(resp)
      if (resp.status !== "error") {
        setClientSecret(resp.clientSecret)
        setOrderDetails(resp.finalOrder)
      }
    })()
  }, [])

  const cardStyle = {
    style: {
      base: {
        fontSmoothing: "antialiased",
        fontSize: "16px",
        color: "#27272a",
        "::placeholder": {
          color: "gray"
        },
        "::-ms-clear": {
          border: "2px solid gray"
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
      onSuccess()
    }
  }

  if (succeeded) {
    return (
      <div className='flex flex-col items-center'>
        <CheckCircle className='w-20 h-20 text-green-400' />
        <p className='text-lg font-light my-4'>Order Placed Successfully</p>
        <Link to="/orders">
          <Button link>
            <span>Go to Orders</span>
            <ChevronRight className='ml-2' />
          </Button>
        </Link>
				<Button secondary onClick={onCancel}>Close</Button>
      </div>
    )
  }

  return (
    <div>
      <section className='mb-6'>
        {orderDetails?.amount && 
          <div className='flex justify-between text-lg mt-2'>
            <h4 className='text-lg mb-2'>Final Order</h4>
            <span className='font-bold text-xl'>${orderDetails.amount}</span>
          </div>
        }
        {orderDetails?.products?.length ?
          <ul>
            {orderDetails.products.map(product => (
              <CheckoutItem 
                key={product.productID._id}
                title={product.productID.title} 
                price={product.productID.price} 
                quantity={product.quantity} 
              />
            ))}
          </ul>
          : <Loader color="bg-gray-600" />
        }

      </section>
      <form onSubmit={handleSubmit}>
        <CardElement options={cardStyle} onChange={handleChange} />
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="text-red-400 mt-2" role="alert">
            {error}
          </div>
        )}
        <Button className="w-full mt-6" disabled={processing || disabled || succeeded}>
          {processing 
            ? <Loader/>
            : <>
              <CreditCard className='mr-2 opacity-70' /> 
              <span>Make Payment</span>
            </>
          }
        </Button>
				<Button className="w-full" secondary onClick={onCancel}>Cancel</Button>
      </form>
    </div>
  );
}

function CheckoutItem({title, price, quantity}) {
  return (
    <li className='flex justify-between'>
      <p>{title}</p>
      <div className='flex justify-between items-center'>
        {quantity > 1 &&
          <span className='inline-flex items-center text-gray-400 mr-5'>
            <X className='' />
            {quantity}
          </span>
        }
        <span className='text-lg font-light'>${quantity*price}</span>
      </div>
    </li>
  )
}