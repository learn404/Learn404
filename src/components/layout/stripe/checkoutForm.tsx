import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";


export default function CheckoutForm(props: { layout: "tabs" | "accordion" | "auto" }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="max-w-3xl">
      <PaymentElement />
      <button disabled={isLoading} id="submit">
        <span id="button-text">
          {isLoading ? (
            "Loading..."
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {message && <div>{message}</div>}
    </form>
  )
}