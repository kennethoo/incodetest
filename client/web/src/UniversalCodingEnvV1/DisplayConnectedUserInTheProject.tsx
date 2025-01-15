import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import styled from "styled-components";
import UserPresentInRoom from "ApiServiveGateWay/UserPresentInRoom";
import useUser from "hooks/useUser";
import AvatarContainer from "Components/shared/AvatarContainer";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function DisplayConnectedUserInTheProject({ id, codeWorkSession }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const userPresent = useRef(
    new UserPresentInRoom({
      projectId: id,
      userId: user.userId,
      username: user.username,
    })
  );

  const [allUserInSessionRoom, setAllUserInSessionRoom] = useState([]);

  useEffect(() => {
    userPresent.current.server.on("user:join:project", (data) => {
      const { allUserInSessionRoom } = data;

      if (
        allUserInSessionRoom.length === 4 &&
        codeWorkSession.connectedPlan === "free"
      ) {
        navigate("/app/home");
      }
      setAllUserInSessionRoom(allUserInSessionRoom);
    });

    const handleUserDisconnected = ({ id }) => {
      if (id === userPresent.current.socketId) {
        navigate("/register");
      } else {
        setAllUserInSessionRoom((prev) => {
          const otherUserThanMe = [...prev].filter(
            (connectedUser) => connectedUser.socketId !== id
          );
          return otherUserThanMe;
        });
      }
    };
    userPresent.current.server.on(
      "leaved:session:room",
      handleUserDisconnected
    );
    userPresent.current.joinRoom();
    return () => {
      userPresent.current.leaveRoom();
    };
  }, []);
  return (
    <Container>
      {!!allUserInSessionRoom.length && (
        <AvatarContainer users={allUserInSessionRoom} />
      )}
    </Container>
  );
}
export default DisplayConnectedUserInTheProject;
