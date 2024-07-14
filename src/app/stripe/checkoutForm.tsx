"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { FormEvent, useContext, useState } from "react";
import { EmailContext, PaymentInformations } from "./PaymentBox";
import PopupResponse from "./PopupResponse";

type ResponsePayment = {
  type?: string;
  success?: string;
  error?: string;
};

export default function CheckoutForm(paymentInformations: PaymentInformations) {
  
  const stripe = useStripe();
  const elements = useElements();
  const userEmail = useContext(EmailContext);

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
        payment_method_data: {
          billing_details: {
            email: userEmail,
          },
        },
      },
    });

    if (error) {
      setLoading(false);
      setResponsePayment({ error: error.message, type: "Error" });
    } else {
      setLoading(false);

      setResponsePayment({
        success:
          "Votre paiement a été traité avec succès. Vous pouvez maintenant accéder à votre tableau de bord.",
        type: "Success",
      });
      try {
        await fetch("/api/email/subscription-mail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        });
      
      } catch (error) {
        console.error("Error sending email", error);
      }
    }
  };

  const handleStripeChange = (event: StripePaymentElementChangeEvent): void => {
    if (event.complete) {
      setFormCompleted(true);
    } else {
      if (isFormCompleted) {
        setFormCompleted(false);
      }
    }
  };

  return (
    <>
      { responsePayment && (
        <>
          <PopupResponse {...responsePayment} />
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-black/25 z-40"></div>
        </>
      )}
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement onChange={handleStripeChange} />
        {paymentInformations.code && (
          <div className="mt-2 text-sm text-gray-400 text-right">Code : "{paymentInformations.code}" | -{paymentInformations.promo}%</div>
        )}
        <div className="mt-6 flex items-center justify-end gap-2 ">
          <button
            disabled={isLoading || !isFormCompleted || !!responsePayment}
            id="submit"
            className="relative bg-torea-800 border-2 border-torea-800 px-8 py-3.5 rounded-full
            font-semibold text-torea-50 enabled:hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-torea-800/50 disabled:border-torea-800/50 disabled:text-gray-500"
          >
            <span id="button-text">
              {isLoading
                ? "Chargement..."
                : responsePayment
                  ? responsePayment?.type
                  : (<span>Confimer l'achat <span className={paymentInformations.code ? "line-through" : ""}>{paymentInformations.basePriceFormated}</span></span>)}
            </span>
            {(paymentInformations.promo > 0) && !isLoading && !responsePayment && (
              <span className={"absolute right-8 bottom-0 text-sm " + (isFormCompleted && "text-torea-300")}>~{paymentInformations.finalPriceFormated}</span>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
