import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 25em;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  text-align: center;
  font-size: 300%;
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
    font-size: 200%;
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
const Description = styled.div`
  color: var(--text);
  font-size: 20px;
  padding: 10px;
  text-align: center;
  max-width: 500px;
  margin-top: 10px;
`;

const PlayGronbutton = styled.button`
  width: 200px;
  height: 35px;
  margin-right: 10px;
  border-radius: 30px;
  background-color: #6f56e5;
  border: 0;
  cursor: pointer;
  color: white;
  font-weight: bolder;
  font-size: 18px;
  margin-top: 20px;
`;
function Info() {
  const navigate = useNavigate();
  return (
    <Container>
      <Header>AI Powered Collaborative Code Compiler </Header>
      <Description>
        Build, Test , Share, work, and Learn with AI Powered Code Collaboration
      </Description>
      <PlayGronbutton
        onClick={() => {
          navigate("/playground");
        }}
      >
        Try Playgound
      </PlayGronbutton>
    </Container>
  );
}
export default Info;
