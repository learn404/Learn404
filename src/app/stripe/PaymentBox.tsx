'use client';

import { Elements } from "@stripe/react-stripe-js";
import { Appearance, Stripe, loadStripe } from "@stripe/stripe-js";
import { createContext, useEffect, useState } from "react";
import { getStripePublishableKey } from "../api/config/route";
import CheckoutForm from "./checkoutForm";

export const EmailContext = createContext<string | null>(null);

interface PaymentBoxProps {
  userEmail: string;
}

export default function PaymentBox({ userEmail }: PaymentBoxProps) {
  
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [isLoadingFirst, setLoadingFirst] = useState<boolean>(true);
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    
    const fetchData = async () => {
      // Utilisation d'un composant serveur pour récupérer la clé publique de Stripe
      const result = await getStripePublishableKey();
      const { publishableKey } = result;      
      setStripePromise(loadStripe(publishableKey!));
    };
  
    fetchData();

  }, []);

  useEffect(() => {

    const fetchData = async () => {
      const response = await fetch('/api/webhook/create-payment-intent', {
        method: "POST",
        body: JSON.stringify({}),
      });
      const { clientSecret } = await response.json();

      setClientSecret(clientSecret);
      setLoadingFirst(false);
    };

    fetchData();

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
        { isLoadingFirst && (
          <div>
            <span className="text-lg text-gray-400">Loading</span>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-2.5 aspect-square rounded-full bg-slate-300 animate-pulse-fast"></div>
              <div className="w-2.5 aspect-square rounded-full bg-slate-300 animate-pulse-fast loading2"></div>
              <div className="w-2.5 aspect-square rounded-full bg-slate-300 animate-pulse-fast loading3"></div>
            </div>
          </div> 
        )}
        { stripePromise && clientSecret && (
          <EmailContext.Provider value={userEmail}>
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm />
            </Elements>
          </EmailContext.Provider>
        )}
      </div>
  );
}

