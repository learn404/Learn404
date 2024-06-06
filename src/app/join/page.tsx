'use client';

import CheckoutForm from "@/components/layout/stripe/checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { Appearance, Stripe, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

export default function Payment(props: any) {
  
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    
    fetch('/api/config')
      .then(async (result) => {
        const { publishableKey } = await result.json();

        setStripePromise(loadStripe(publishableKey));
      })

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
    theme: "night",
  }




  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      { stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <CheckoutForm layout="tabs" />
        </Elements>
      )}
    </>
  );
}