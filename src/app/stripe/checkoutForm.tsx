'use client';

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { FormEvent, useContext, useState } from "react";
import { EmailContext } from "./PaymentBox";
import PopupResponse from "./PopupResponse";

type ResponsePayment = {
  type?: string;
  success?: string;
  error?: string;
};

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const userEmail = useContext(EmailContext);  

  // const [message, setMessage] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isFormCompleted, setFormCompleted] = useState<boolean>(false);
  const [responsePayment, setResponsePayment] = useState<ResponsePayment | undefined>(undefined);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormCompleted) return;
    if (!stripe || !elements) return;
    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        // return_url: `${window.location.origin}/dashboard/completion`,
        payment_method_data: {
          billing_details: {
            email: userEmail,
          }
        }
      }
    })

    if (error) {
      setLoading(false);
      setResponsePayment({ error: error.message, type: "Error"});
    } else {
      setLoading(false);
      console.log(paymentIntent);
      setResponsePayment({ success: "Your payment has been successfully processed. You can now access your dashboard.", type: "Success" });
    }

  }

  const handleStripeChange = (event: StripePaymentElementChangeEvent): void => {
    if (event.complete) {
      setFormCompleted(true);
    } else {
      if (isFormCompleted) {
        setFormCompleted(false);
      }
    }
  }
  
  return (
    <> 
      { responsePayment && (
        <PopupResponse {...responsePayment} />
      )}
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement  onChange={handleStripeChange} />
        <div className="mt-4 flex items-center justify-end gap-2 ">
          <button disabled={isLoading || !isFormCompleted || !!responsePayment} id="submit" className="bg-torea-800 border-2 border-torea-800 px-8 py-3.5 rounded-full 
            font-semibold text-torea-50 enabled:hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-torea-800/50 disabled:border-torea-800/50 disabled:text-gray-500">
            <span id="button-text">
              {isLoading ? (
                "Loading..."
              ) : responsePayment ? (
                responsePayment?.type     
              ) : (
                "Confirm payment EUR 5.99"     
              )}
            </span>
          </button>
        </div>
      </form>
    </>
  )
}