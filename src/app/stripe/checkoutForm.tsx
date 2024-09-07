"use client";

import { cn } from "@/lib/utils";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { FormEvent, use, useContext, useState } from "react";
import { EmailContext, PaymentInformations } from "./PaymentBox";
import PopupResponse from "./PopupResponse";
import { METHODS } from "http";
import { error } from "console";

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
  const [responsePayment, setResponsePayment] = useState<
    ResponsePayment | undefined
  >(undefined);

  const handleCodePromo = async () => {

    // si il y a un code promo
    if (paymentInformations.code) {
      // j'ajoute la database, le code promo,, la réduction
      const addPaymentInformation = async () => {
        return await fetch(
          "/api/user/add-payment-information",
  
          {
            method: "POST",
            body: JSON.stringify({
              code: paymentInformations.code,
              discount: paymentInformations.promo,
            }),
          }
        ).then((res) => {
          if (res.status === 200) {
            console.log("Payment informations added");
          } else {
            console.error("Error adding payment informations");
          }
        })
      };
      addPaymentInformation();
   
    }}

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

    /*  console.log(paymentIntent); */

    if (error) {
      setLoading(false);
      setResponsePayment({
        error:
          "Une erreur est survenue, si celle-ci persiste vous pouvez nous contacter à l'addresse suivante : contact.learn404@gmail.com",
        type: "Erreur",
      });
    } else {
      setLoading(false);
      await handleCodePromo();

      setResponsePayment({
        success:
          "Merci pour votre achat ! Vous pouvez maintenant accéder à votre tableau de bord.",
        type: "Paiement accepté",
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
      {responsePayment && (
        <>
          <PopupResponse {...responsePayment} />
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-black/25 z-40"></div>
        </>
      )}

      <form id="payment-form" onSubmit={handleSubmit}>
        <AddressElement className="my-6" options={{ mode: "shipping" }} />
        <PaymentElement onChange={handleStripeChange} />
        <div className="w-full mt-8">
          <div
            className={cn(
              "flex items-center justify-between pb-2 text-gray-300",
              !paymentInformations.code && "border-b border-gray-800 pb-4"
            )}
          >
            <span>Prix</span>
            <span>{paymentInformations.basePrice}€</span>
          </div>
          {paymentInformations.code && (
            <div className="flex items-center justify-between pb-4 border-b border-gray-800 text-gray-300">
              <span>Code : "{paymentInformations.code}"</span>
              <span>-{paymentInformations.promo}%</span>
            </div>
          )}
          <div className="flex items-center justify-between pt-4 text-xl text-gray-50">
            <span>Montant Total :</span>
            <span>{paymentInformations.finalPrice}€</span>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-end gap-2 ">
          <button
            disabled={isLoading || !isFormCompleted || !!responsePayment}
            id="submit"
            className="relative bg-torea-800 border-2 border-torea-800 px-8 py-3.5 rounded-full
            font-semibold text-torea-50 enabled:hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-torea-800/50 disabled:border-torea-800/50 disabled:text-gray-500"
          >
            <span id="button-text">
              {isLoading ? (
                "Chargement..."
              ) : responsePayment ? (
                responsePayment?.type
              ) : (
                <span>Confimer l'achat</span>
              )}
            </span>
          </button>
        </div>
      </form>
    </>
  );
}
