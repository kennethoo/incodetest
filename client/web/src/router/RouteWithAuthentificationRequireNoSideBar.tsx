import Loading from "Components/loading";
import SideNavigation from "Components/SideNavigation";
import styled from "styled-components";
import { Outlet, Navigate } from "react-router-dom";
import useCheckLogin from "hooks/useCheckLogin";

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
function RouteWithAuthentificationRequireNoSideBar(): JSX.Element {
  const { currentStatus, userLoginEnum } = useCheckLogin();
  const renderContent = () => {
    if (currentStatus === userLoginEnum.notLogin) {
      return <Navigate to="/" />;
    } else if (currentStatus === userLoginEnum.checking) {
      return <Loading />;
    } else if (currentStatus === userLoginEnum.login) {
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

export default RouteWithAuthentificationRequireNoSideBar;
