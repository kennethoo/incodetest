import { useEffect } from "react";

import Loading from "Components/loading";

import useCheckLogin from "hooks/useCheckLogin";
import styled from "styled-components";
import { Outlet, Navigate } from "react-router-dom";
const Container = styled.div`
  display: block;
`;
const AppSection = styled.div`
  display: flex;
`;

const WraperSection = styled.div`
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
`;
function RouteWithNoAuthentificationRequire(): JSX.Element {
  const { currentStatus, userLoginEnum } = useCheckLogin();

  const renderContent = () => {
    if (currentStatus !== userLoginEnum.checking) {
      return (
        <AppSection>
          <WraperSection>
            <Outlet />
          </WraperSection>
        </AppSection>
      );
    } else {
      return <Loading />;
    }
  };
  return <Container>{renderContent()}</Container>;
}

export default RouteWithNoAuthentificationRequire;
