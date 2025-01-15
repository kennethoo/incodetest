import styled from "styled-components";
import { Link } from "react-router-dom";
const Button = styled(Link)`
  background-color: #6f56e5;
  border: 0;
  width: 100%;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 30px;
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
const Container = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
function UpgrateMeettumProCTA() {
  return (
    <Container>
      <Button to="/app/meetttum/join/pro">Upgrade</Button>
    </Container>
  );
}

export default UpgrateMeettumProCTA;
