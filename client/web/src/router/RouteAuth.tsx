import useUser from "hooks/useUser";
import useCheckLogin from "hooks/useCheckLogin";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import Loading from "Components/loading";
const Container = styled.div`
  display: block;
`;
const AppSection = styled.div`
  display: flex;
`;

const WraperSection = styled.div`
  width: 100%;
  height: 100vh;
  height: 100dvh;
`;
function RouteAuth(): JSX.Element {
  const { currentStatus, userLoginEnum } = useCheckLogin();
  const navigate = useNavigate();

  const renderContent = () => {
    if (currentStatus === userLoginEnum.login) {
      return <Navigate to="/app/home" />;
    } else if (currentStatus === userLoginEnum.checking) {
      return <Loading />;
    } else if (currentStatus === userLoginEnum.notLogin) {
      return (
        <AppSection>
          <WraperSection>
            <Outlet />
          </WraperSection>
        </AppSection>
      );
    }
  };
  return <Container>{renderContent()}</Container>;
}

export default RouteAuth;
