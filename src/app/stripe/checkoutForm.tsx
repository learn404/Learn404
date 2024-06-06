'use client';

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";


export default function CheckoutForm(props: { layout: "tabs" | "accordion" | "auto" }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isFormCompleted, setFormCompleted] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormCompleted) return;
    if (!stripe || !elements) return;
    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/completion`
      }
    })

    if (error) {
      setMessage(error.message as string);
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment successful");
      setLoading(false);
    } else {
      setMessage("Unexpected error");
      setLoading(false);
    }

  }

  const handleStripeChange = (event: StripePaymentElementChangeEvent): void => {
    if (event.complete) {
      setFormCompleted(true);
    } else {
      if (isFormCompleted) setFormCompleted(false);
    }
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement  onChange={handleStripeChange}/>
      <div className="mt-4 flex items-center justify-end gap-2">
        <button className="px-8 py-3.5 rounded-full border-2 border-gray-400 font-semibold text-gray-400 hover:text-gray-300 hover:border-gray-300 focus:text-gray-300 focus:border-gray-300 outline-none">
          Previous
        </button>
        <button disabled={isLoading || !isFormCompleted} id="submit" className="bg-torea-800 border-2 border-torea-800 px-8 py-3.5 rounded-full 
          font-semibold text-torea-50 enabled:hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
           focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-torea-800/50 disabled:border-torea-800/50 disabled:text-gray-500">
          <span id="button-text">
            {isLoading ? (
              "Loading..."
            ) : (
              "Confirm payment EUR 5.99"     
            )}
          </span>
        </button>
      </div>
      {message && <div>{message}</div>}
    </form>
  )
}