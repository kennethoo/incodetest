import { ImPhoneHangUp } from "react-icons/im";
import styled from "styled-components";
import Toggle from "Components/shared/Toggle";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: all 0.1s ease;
  display: flex;
  overflow: scroll;
  padding-top: 5px;
  padding-bottom: 5px;
  justify-content: flex-end;
  align-items: center;
`;

function AudioRoomActionV3({ handleLeaveClick }) {
  return (
    <Container>
      <Toggle
        setToggle={(value) => {
          handleLeaveClick();
        }}
        value={true}
      />
    </Container>
  );
}
export default AudioRoomActionV3;
