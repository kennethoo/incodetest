import { useState, useEffect } from "react";
import LoadingSpin from "Components/Loadingspin";
import meettumApi from "ApiServiveGateWay/apiConfig";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useUser from "hooks/useUser";
import { IoChevronBackOutline } from "react-icons/io5";
import SubscriptionCheckoutForm from "Components/MeettumPro/SubscriptionCheckoutForm";
import styled from "styled-components";
import useLogger from "hooks/useLogger";
const Container = styled.div`
  width: 100%;
  max-width: 500px;
`;
function PaymentContainer({ seletectedPlanId, setSeletedStep }) {
  const { user } = useUser();
  const logger = useLogger();
  const [stipePromise, setStipePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await meettumApi.get("/api/v1/stripe/config");
      const { PUBLISHABLE_SECRET_KEY } = data;
      setStipePromise(loadStripe(PUBLISHABLE_SECRET_KEY));
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const payload = {
        user,
        planId: seletectedPlanId,
      };
      const { data } = await meettumApi.post(
        "/api/meettum/subscribe/intent",
        payload,
      );

      const { clientSecret, succeeded, errorMessage } = data;
      if (succeeded) {
        setClientSecret(clientSecret);
      } else {
        logger({
          isErrorMessage: true,
          message: errorMessage,
          fileName: "PaymentContainer.tsx",
        });
      }
    };
    fetch();
  }, []);

  return (
    <Container>
      <div style={{ marginBottom: "10px" }} className="booking-session-tilte">
        <button
          onClick={() => {
            setSeletedStep("step_two");
          }}
          className="close-that"
        >
          <IoChevronBackOutline />
        </button>
        <p>Almost There 🎉🎉</p>
      </div>
      {stipePromise && clientSecret ? (
        <Elements stripe={stipePromise} options={{ clientSecret }}>
          <SubscriptionCheckoutForm planId={seletectedPlanId} />
        </Elements>
      ) : (
        <div className="wraping-button">
          <LoadingSpin />
        </div>
      )}
    </Container>
  );
}

export default PaymentContainer;
