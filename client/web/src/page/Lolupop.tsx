import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const HomeContainer = styled.div`
  width: calc(100% - 20px);
  margin: 0 auto;
  margin-top: 10px;
`;
const Lolupop = (): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/meeting/session/66a1d228a0ff34937f34b04f");
  }, []);
  return <HomeContainer></HomeContainer>;
};

export default Lolupop;
