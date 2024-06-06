'use client';

import { Elements } from "@stripe/react-stripe-js";
import { Appearance, Stripe, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./checkoutForm";

export default function PaymentBox() {
  
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    
    const fetchData = async () => {
      const response = await fetch('/api/config');
      const data = await response.json();
      const { publishableKey } = data;
      setStripePromise(loadStripe(publishableKey));
    };
  
    fetchData();

  }, []);

  useEffect(() => {

    fetch('/api/webhook/create-payment-intent', {
      method: "POST",
      body: JSON.stringify({}),
    } )
      .then(async (result) => {
        const { clientSecret } = await result.json();
        setClientSecret(clientSecret);
      })

  }, []);

  const appearance : Appearance = {
    theme: 'night',
    labels: 'floating',
    variables: {
      colorPrimary: "#372fa3",
      borderRadius: '8px',
      fontFamily: ' "Inter", sans-serif',
    },
    rules: {
      '.Block': {
        boxShadow: "none",
        padding: "12px 16px",
      },
      '.Tab:hover': {
        borderColor: '#312d82'
      },
      '.Tab, .Input': {
        backgroundColor: '#02030c',
        borderColor: '#1e1b4b'
      },
      '.Input:focus': {
        borderColor: '#312d82',
        // boxShadow: 'none'
      },
      '.DropdownItem--highlight': {
        backgroundColor: 'red',
      }
    }
  }

  const options = {
    clientSecret,
    appearance,
  }

  return (
      <div className="max-w-lg mx-auto my-20 text-center">
        <h1 className="mb-4 font-semibold text-2xl text-gray-300">Payment method</h1>
        { stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
            <CheckoutForm layout="tabs" />
          </Elements>
        )}
      </div>
  );
}

