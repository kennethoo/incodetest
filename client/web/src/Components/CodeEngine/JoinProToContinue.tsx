import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  height: 35px;
  margin-top: 10px;
  border-radius: 30px;
  font-size: 15px;
  background-color: #6f56e5;
  border: 0;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  & p {
    font-weight: bold !important;
    color: white;
    letter-spacing: 1px;
  }
`;

const Header = styled.div`
  text-align: center;
  font-size: 200%;
  padding: 10px;
  background: linear-gradient(45deg, #6ec3f4, #6f56e5, #e63946);
  color: transparent;
  width: 100%;
  width: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  border-radius: 5px;
  background-size: 400%;
  animation: glowEffect 10s linear infinite;
  @media only screen and (max-width: 500px) {
    font-size: 100%;
  }

  @keyframes glowEffect {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 400% 0;
    }
  }
`;
function JoinProToContinue() {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>Try INCODE Pro to continue</Header>

      <Button
        onClick={() => {
          navigate("/app/join/pro");
        }}
      >
        <p>Continue</p>
      </Button>
    </Container>
  );
}

export default JoinProToContinue;
