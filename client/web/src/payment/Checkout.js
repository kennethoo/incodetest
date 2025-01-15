import React, { useState, useEffect } from "react";
import MeetingSessionCheckoutForm from "./MeetingSessionCheckoutForm";
import LoadingSpin from "Components/Loadingspin";
import meettumApi from "ApiServiveGateWay/apiConfig";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function Checkout({ user, plan, publisherId }) {
  const { email, userId } = user;
  const { price } = plan;
  const [stipePromise, setStipePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await meettumApi.get("/api/stripe/config");
      const { PUBLISHABLE_SECRET_KEY } = data;
      setStipePromise(loadStripe(PUBLISHABLE_SECRET_KEY));
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const payload = {
        name: userId,
        email,
        price,
      };
      const { data } = await meettumApi.post(
        "/api/book/paid/meetingsession",
        payload,
      );
      const { clientSecret } = data;
      setClientSecret(clientSecret);
    };
    fetch();
  }, []);
  return stipePromise && clientSecret ? (
    <Elements stripe={stipePromise} options={{ clientSecret }}>
      <MeetingSessionCheckoutForm
        userId={user.userId}
        publisherId={publisherId}
        plan={plan}
      />
    </Elements>
  ) : (
    <div className="wraping-button">
      <LoadingSpin />
    </div>
  );
}

export default Checkout;
