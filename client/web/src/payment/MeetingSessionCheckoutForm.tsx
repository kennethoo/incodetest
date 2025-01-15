import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import LoadingSpin from "Components/Loadingspin";
import { MeetingSessionMannager } from "ApiServiveGateWay/meetingSessionMannager";

import useUser from "hooks/useUser";

function MeetingSessionCheckoutForm({ meetingSesionDetail, note }) {
  const { meetingId } = meetingSesionDetail;
  const meetingSessionMannager = new MeetingSessionMannager({ meetingId });
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingButtonState, setBookingButtonState] = useState("BOOK");
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
      bookMeeting(paymentIntent.id);
    }
  };

  const bookMeeting = async (paymentIntentId) => {
    setBookingButtonState("Booking");
    const meetingSession = {
      ...meetingSesionDetail,
      meetingSessionType: meetingSessionMannager.BELONGTOAMEETINGMANAGER,
      paymentIntentId,
      isPaid: true,
    };
    const me = meetingSession.participantsDetails.participants.find(
      (userD) => userD.userId === user?.email,
    );
    me.userNote = note;
    const result =
      await meetingSessionMannager.createMeetingSession(meetingSession);
    setLoading(false);
    const {
      succeeded,
      errorMessage,
    }: { succeeded: boolean; errorMessage: string } = result;
    setBookingCompleted(true);
    if (succeeded) {
      setBookingButtonState("Booking Completed 🎉🎉");
    } else {
      setErrorMessage(errorMessage);
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

export default MeetingSessionCheckoutForm;
