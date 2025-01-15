import styled from "styled-components";
import socket from "realtimeBoardSocket";
import {
  addUserToStage,
  removeUserFromStage,
} from "Components/syncAudioRoomV3/roomEnum";
import IconProfile from "Components/IconProfile";
import { GoPlus } from "react-icons/go";
import { FaMinus } from "react-icons/fa6";
import useUser from "hooks/useUser";
import { FaUserMinus } from "react-icons/fa";

const Container = styled.div`
  border-radius: 10px;
  width: 100%;
  background-color: var(--main-bg-side);
  display: inline-flex;
  margin-bottom: 10px;
  padding: 5px;
`;

const Username = styled.p`
  font-size: 16px;
  padding: 2px 10px 2px 10px;

  text-align: start;
  backdrop-filter: blur(100px);
  max-width: calc(100% - 60px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const WrapDetail = styled.div`
  top: 0;
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
`;
const ActionButtonSection = styled.div`
  height: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px;
  -webkit-backdrop-filter: blur(100px);
  backdrop-filter: blur(100px);
  cursor: pointer;
  color: white;
  font-size: 25px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

function PeopleDetails({ userDetail }) {
  return (
    <Container>
      <WrapDetail>
        <Icon>
          <IconProfile userId={userDetail.userId} />
        </Icon>
        <Username>{userDetail.username}</Username>
      </WrapDetail>
      <ActionButtonSection></ActionButtonSection>
    </Container>
  );
}
export default PeopleDetails;
