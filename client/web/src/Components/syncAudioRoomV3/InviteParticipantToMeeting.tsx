import { useState } from "react";
import { VscSend } from "react-icons/vsc";
import { MeetingSessionMannager } from "ApiServiveGateWay/meetingSessionMannager";
import LoadingSpin from "Components/Loadingspin";
import useUser from "hooks/useUser";
function InviteParticipantToMeeting({ meetingSessionId }) {
  const { user } = useUser();
  const [currentParticipant, setCurrentParticipant] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const meetingSessionMannager = new MeetingSessionMannager({
    meetingId: null,
  });
  function isEmail(email) {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const addPeople = async () => {
    if (isLoading) return;
    if (!isEmail(currentParticipant)) {
      setErrorMessage("Invalid Email");
      return;
    }
    setErrorMessage("");
    setIsLoading(true);
    await meetingSessionMannager.inviteUserInMeetingSession({
      meetingSessionId,
      email: currentParticipant.trim(),
      username: user.username,
    });
    setCurrentParticipant("");
    setIsLoading(false);
  };

  return (
    <>
      <div
        style={{ marginBottom: "0px", borderRadius: "60px" }}
        className="wraper0the-box"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            style={{ width: "100%" }}
            onChange={(e) => {
              setCurrentParticipant(e.target.value);
            }}
            value={currentParticipant}
            type="text"
            placeholder="Invite Participant via email ..."
          />
          {isLoading ? (
            <LoadingSpin />
          ) : (
            <button
              style={{
                border: "0",
                display: "flex",
                fontSize: "18px",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                color: "var(--text)",
                cursor: "pointer",
                marginRight: "0px",
              }}
              onClick={addPeople}
              className="close-that"
            >
              <VscSend />
            </button>
          )}
        </div>
      </div>
      <p className="error-message">{errorMessage}</p>
    </>
  );
}

export default InviteParticipantToMeeting;
