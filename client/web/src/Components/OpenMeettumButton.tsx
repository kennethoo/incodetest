import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useCheckLogin from "hooks/useCheckLogin";

const Container = styled.div``;

const Button = styled.button`
  width: 90px;
  height: 35px;
  margin-right: 10px;
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
function OpenMeettumButton() {
  const { currentStatus, userLoginEnum } = useCheckLogin();
  const text = currentStatus === userLoginEnum.login ? "Open" : "Sign Up";
  const isLogin = currentStatus === userLoginEnum.login;
  const link = isLogin ? "/app/home" : "/register";

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };
  return (
    <Container>
      {!isLogin && (
        <Button
          style={{ backgroundColor: "var(--main-bg-cool-rgb)" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          <p>Login</p>
        </Button>
      )}

      <Button onClick={handleClick}>
        <p>{text}</p>
      </Button>
    </Container>
  );
}

export default OpenMeettumButton;
