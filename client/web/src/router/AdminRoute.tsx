import Loading from "Components/loading";
import SideNavigation from "Components/SideNavigation";
import styled from "styled-components";
import { Outlet, Navigate } from "react-router-dom";
import useCheckLogin from "hooks/useCheckLogin";
import useUser from "hooks/useUser";
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

const validUserIds = [
  "670bfea1f1fa01c6d9f7a870",
  "67006796d72ea191402bd3ca",
  "671884ce1ae718c70a659629",
];
function AdminRoute(): JSX.Element {
  const { currentStatus, userLoginEnum } = useCheckLogin();
  const { user } = useUser();

  const renderContent = () => {
    if (currentStatus === userLoginEnum.notLogin) {
      return <Navigate to="/" />;
    } else if (currentStatus === userLoginEnum.checking) {
      return <Loading />;
    } else if (
      currentStatus === userLoginEnum.login &&
      validUserIds.includes(user.userId)
    ) {
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

export default AdminRoute;
