import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { codeSessionApi } from "ApiServiveGateWay/CodeSession";
import { useSession } from "hooks/useSession";
import CodeWorkSession from "UniversalCodingEnvV1/CodeWorkSession";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const CodeSession = (): JSX.Element => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { sessionsResult } = useSession({
    action: codeSessionApi.GET_SESSION_BY_ID,
    payload: { sessionId },
  });
  const [session, setSession] = useState(null);
  useEffect(() => {
    if (sessionsResult) {
      if (sessionsResult.succeeded) {
        const session = sessionsResult.sessions[0];
        setSession(session);
      } else {
        navigate("/app/home");
      }
    }
  }, [sessionsResult]);
  return (
    <Container>
      {session && (
        <CodeWorkSession isProject={false} codeWorkSession={session} />
      )}
    </Container>
  );
};

export default CodeSession;
