import styled from "styled-components";
import { Link } from "react-router-dom";
import { GrUpgrade } from "react-icons/gr";

const Button = styled(Link)`
  background-color: #6f56e5;
  border: 0;
  width: 40px;
  height: 40px;

  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  letter-spacing: 1px;
`;
const Container = styled(Link)`
  padding: 10px;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
const Label = styled.div`
  font-size: 10px;
  display: flex;
  align-items: center;

  font-weight: bold;
  color: var(--text);
  text-transform: uppercase;
`;

const ContainerNativation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.div`
  font-size: 20px;
  color: var(--text);
  padding: 10px;
  display: flex;
  border-radius: 50px;
`;

function UpgrateMeettumProCTA() {
  return (
    <Container to="/app/join/pro">
      <ContainerNativation>
        <Icon>
          <GrUpgrade />
        </Icon>
        <Label>Go pro</Label>
      </ContainerNativation>
    </Container>
  );
}

export default UpgrateMeettumProCTA;
