import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "hooks/useUser";
import LoadingSpin from "Components/Loadingspin";
import styled from "styled-components";
import { codeSessionApi } from "ApiServiveGateWay/CodeSession";
import useLogger from "hooks/useLogger";
import { useActiveSession } from "hooks/session/useActiveSession";

const Button = styled.button`
  border: 0;
  min-width: 120px;
  border: 2px solid #6f56e5;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
`;

function StartSession() {
  const [isLoading, setIsLoading] = useState(false);
  const logger = useLogger();
  const { user } = useUser();
  const navigate = useNavigate();
  const { addSession } = useActiveSession();

  const startMeeting = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const sessionPayload = {
      creatorId: user.userId,
      title: "New Session",
      connectedPlan: user.isProUser ? "paid" : "free",
    };
    const { session, succeeded, errorMessage } =
      await codeSessionApi.handleAction({
        action: codeSessionApi.CREATE_NEW_SESSION,
        payload: sessionPayload,
      });

    setIsLoading(false);

    if (succeeded) {
      addSession([session]);
      navigate(`/app/session/${session._id}/0`);
    } else {
      logger({
        isErrorMessage: true,
        message: errorMessage,
        fileName: "StartSession.tsx",
      });
    }
  };
  return (
    <Button
      style={{ backgroundColor: isLoading ? "transparent" : "#6f56e5" }}
      onClick={startMeeting}>
      {isLoading ? <LoadingSpin /> : "Start Session"}
    </Button>
  );
}
export default StartSession;
