import styled from "styled-components";
import useUser from "hooks/useUser";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import StartSession from "CodeSession/StartSession";
const Container = styled.div`
  display: flex;
  background: linear-gradient(45deg, #6ec3f4, #6f56e5, #e63946);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  min-height: 150px;
  padding: 15px;

  width: 100%;
  margin: 0 auto;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @media only screen and (max-width: 600px) {
    min-height: 100px;
  }
`;

const Username = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: white;
  text-transform: capitalize;
  @media only screen and (max-width: 600px) {
    font-size: 20px;
  }
`;

const SeachBarWraper = styled.div`
  position: relative;
  width: 100%;

  margin-bottom: 20px;
`;
function HomeHeader() {
  const { user } = useUser();

  return (
    <Container>
      <SeachBarWraper></SeachBarWraper>
      <Username> Welcome back {user.username}</Username>
      <StartSession />
    </Container>
  );
}

export default HomeHeader;
