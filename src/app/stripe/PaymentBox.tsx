'use client';

import { Elements } from "@stripe/react-stripe-js";
import { Appearance, Stripe, loadStripe } from "@stripe/stripe-js";
import { FormEvent, createContext, useState } from "react";
import { getStripePublishableKey } from "../api/config/publishableKey";
import CheckoutForm from "./checkoutForm";

export const EmailContext = createContext<string | null>(null);

interface PaymentBoxProps {
  userEmail: string;
}

export type PaymentInformations = {
  basePrice: number,
  basePriceFormated: string,
  finalPrice: number,
  finalPriceFormated: string,
  currency: string;
  promo: number;
  code?: string;
}

type CodePromo = {
  code: string;
  value: number;
}

let stripePromise: Promise<Stripe | null>;

export default function PaymentBox({ userEmail }: PaymentBoxProps) {
  
  const [isLoadingFirst, setLoadingFirst] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentStep, setPaymentStep] = useState<boolean>(false);
  const [codePromo, setCodePromo] = useState<CodePromo>({ code: "", value: 0});
  const [paymentInformations, setPaymentInformations] = useState<PaymentInformations | null>(null);

  const verifyCodePromo = async (codePromo: string) => {

    if (!codePromo || codePromo === "") {
      setCodePromo(({code: codePromo , value: 0}));
      return;
    } 

    const response = await fetch("/api/verify-code-promo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codePromo }),
    })

    const verifyCodePromoResult = await response.json();

    setCodePromo(({ code: codePromo, value: verifyCodePromoResult.isCodePromoValid ? verifyCodePromoResult.percent_off : 0 }));

    return verifyCodePromoResult.isCodePromoValid;
  }

  const handleCodePromo = async (e: FormEvent<HTMLInputElement>) => {
    verifyCodePromo(e.currentTarget.value)
  }

  async function fetchStripePublishableKey() {
    const result = await getStripePublishableKey();
    const { publishableKey } = result;      
    stripePromise = loadStripe(publishableKey!);

    return publishableKey;
  }

  async function createPaymentIntent() {
    const response = await fetch('/api/webhook/create-payment-intent', {
      method: "POST",
      body: JSON.stringify({ email: userEmail!, code: codePromo.code }),
    });

    const paymentInformations = await response.json();

    if (!paymentInformations.success) {
      console.error(paymentInformations.error); // A revoir
      return;
    }

    setClientSecret(paymentInformations.clientSecret);
    setPaymentInformations(paymentInformations.fullPrice);
    setLoadingFirst(false);
  }

  // This function is called when the user clicks on the "Next" button
  const handleNextStep = async () => {

    // If the user has entered a promo code, we check if it is valid
    if (codePromo && codePromo.code !== "") {
      const isCodePromoValid = await verifyCodePromo(codePromo.code);
      
      // If the promo code is not valid, we stop the process
      if (!isCodePromoValid) {
        return;
      }
    }

    // We load the Stripe publishable key and create a payment intent
    setPaymentStep(true);
    setLoadingFirst(true);
    await fetchStripePublishableKey();
    await createPaymentIntent();
  }

  // We define the appearance of the Stripe Elements
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
      <div className="max-w-md w-full">
        { isLoadingFirst && (
          <div className="text-center">
            <span className="text-lg text-gray-400">Loading</span>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-2.5 aspect-square rounded-full bg-slate-300 animate-pulse-fast"></div>
              <div className="w-2.5 aspect-square rounded-full bg-slate-300 animate-pulse-fast loading2"></div>
              <div className="w-2.5 aspect-square rounded-full bg-slate-300 animate-pulse-fast loading3"></div>
            </div>
          </div> 
        )}
        { !paymentStep && (
          <div>
            <div className="flex flex-col gap-1">
              <span className="text-lg text-torea-50">Tu as un code promo ? (facultatif)</span>
              <input 
                type="text"
                id="codePromo" 
                className={"rounded-md px-4 py-2 bg-gray-950 border-[1px] outline-none " + 
                  ((codePromo.value > 0) ? "border-green-500/50 focus:border-green-500/50" : "border-torea-950 focus:border-torea-800" )
                }
                placeholder="Code promo"
                onChange={handleCodePromo}
              />
              { (codePromo.value > 0) ? (
                <span className="text-green-500 mt-1 text-right">Valide</span>
              ) : (codePromo.value === 0 && codePromo.code !== "") && (
                <span className="text-red-500 mt-1 text-right">Invalide</span>
              )}
            </div>  
            <div className="mt-4 flex justify-end items-center">
              <button 
                className="bg-torea-800 border-2 border-torea-800 px-8 py-2.5 rounded-full
                font-semibold text-torea-50 enabled:hover:bg-indigo-900 "
                onClick={handleNextStep} >
                  Next
                </button>
            </div>
          </div>

        )}
        { stripePromise && clientSecret && paymentStep && paymentInformations && (
          <EmailContext.Provider value={userEmail}>
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm {...paymentInformations}/>
            </Elements>
          </EmailContext.Provider>
        )}
      </div>
  );
}

