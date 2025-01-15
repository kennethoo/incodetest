import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useUser from "hooks/useUser";
import LoadingSpin from "Components/Loadingspin";

import Toggle from "Components/shared/Toggle";
import { MeetingSessionMannager } from "ApiServiveGateWay/meetingSessionMannager";

function MeettumEvent({ setIsModalOpen }): JSX.Element {
  const { user } = useUser();

  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean | null>(false);
  const [error, setError] = useState<string>("");
  const meetingSessionMannager = new MeetingSessionMannager({
    meetingId: null,
  });

  const validateGeneralMeeting = () => {
    if (!title.length || isPaid == null) {
      let message = "";
      if (!title.length) {
        message = "Please enter a title";
      } else if (isPaid == null) {
        message = "Please select between paid or free meeting";
      }

      return {
        isValid: false,
        errorMessage: message,
      };
    }
    return {
      isValid: true,
    };
  };

  const create = async () => {
    const { isValid, errorMessage } = validateGeneralMeeting();
    if (!isValid) {
      setError(errorMessage);
      return;
    }
    setError("");
    setLoading(true);
    const eventSessionDetail = {
      isPaid,
      meetingSessionTitle: title,
      publisherId: user.userId,
      meetingSessionState: meetingSessionMannager.UNCONFIRM,
      meetingSessionSubState: meetingSessionMannager.NOTSTARTED,
      isPrivate: true,
      participantsDetails: {
        participantsDetails: {
          publisherEmail: user?.email,
          participants: [],
        },
      },
      numberOfSpots: 1,
      numberOfBookSpots: 0,
      meetingSessionType: meetingSessionMannager.STANDALONE_EVENT,
      featureType: meetingSessionMannager.MEETTUMEVENT,
    };
    const { meetingSession } =
      await meetingSessionMannager.createMeetingSession(eventSessionDetail);
    navigate(`/app/event/${meetingSession._id}`);
  };

  return (
    <div style={{ width: "100%" }} className="box-wrpper">
      {/* <div className="isPaid-section">
        <p>Is Paid</p>
        <Toggle setToggle={setIsPaid} value={isPaid} />
      </div> */}
      <div className="edit-box-profile">
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="username-profile"
          type="text"
          placeholder="Add a title..."
          value={title}
        />
      </div>

      <p className="error-message">{error}</p>

      <div className="conte-thise-action">
        {loading ? (
          <button className={`create active`}>
            <LoadingSpin />
          </button>
        ) : (
          <button onClick={create} className={`create active`}>
            CREATE
          </button>
        )}
      </div>
    </div>
  );
}

export default MeettumEvent;
