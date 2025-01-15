import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import LoadingSpin from "Components/Loadingspin";
import { meettumSubscriptionApi } from "ApiServiveGateWay/meettumSubscriptionApi";
import useUser from "hooks/useUser";
import useLogger from "hooks/useLogger";
import { useDispatch } from "react-redux";

function SubscriptionCheckoutForm({ planId }) {
  const dispath = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const logger = useLogger();
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingButtonState, setBookingButtonState] = useState("SUBSCRIBE");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    setErrorMessage("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      subscribeToMeettum(paymentIntent.id, paymentIntent.payment_method);
    }
  };

  const subscribeToMeettum = async (paymentIntentId, paymentMethodeId) => {
    setBookingButtonState("Subscribing....");
    const subscriptionPayload = {
      user,
      paymentIntentId,
      planId,
      isPaid: true,
      paymentMethodeId,
    };

    const result = await meettumSubscriptionApi.subscribe(subscriptionPayload);
    setLoading(false);
    const {
      succeeded,
      errorMessage,
    }: { succeeded: boolean; errorMessage: string } = result;
    setBookingCompleted(true);
    if (succeeded) {
      setBookingButtonState("Subscribing Completed 🎉🎉");
      logger({
        isErrorMessage: false,
        message: "Yayy , you are pro now , enjoy",
        fileName: "SubscriptionCheckoutForm.tsx",
      });
      dispath({ type: "UPDATE_CONFETTI", value: true });
      setTimeout(() => {
        window.location.replace("/app/home");
      }, 4000);
    } else {
      setErrorMessage(errorMessage);
      logger({
        isErrorMessage: true,
        message: errorMessage,
        fileName: "SubscriptionCheckoutForm.tsx",
      });
    }
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {!bookingCompleted ? <PaymentElement className="payment-element" /> : ""}

      <div className="button-container">
        {errorMessage?.length ? (
          <p className="error-message">{errorMessage}</p>
        ) : null}
        <input
          disabled={loading}
          type="submit"
          className={`button button--small button--green ${
            loading ? "loading" : ""
          }`}
          value={`${loading ? "" : bookingButtonState}`}
          id="submit"
        />
        {loading ? (
          <div className="jietiooeo">
            {" "}
            <LoadingSpin />
          </div>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}

export default SubscriptionCheckoutForm;
