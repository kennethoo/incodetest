import React, { useState, useRef, useEffect } from "react";
import Loading from "Components/loading";
import SideNavigation from "Components/SideNavigation";
import styled from "styled-components";
import { Outlet, Navigate } from "react-router-dom";
import useCheckLogin from "hooks/useCheckLogin";
import AppHeader from "Components/app/AppHeader";

const Container = styled.div`
  display: block;
`;
const AppSection = styled.div`
  display: flex;
  height: calc(100% - 55px);
`;

const WraperSection = styled.div`
  width: calc(100% - 70px);
  height: 100%;
  overflow: scroll;
`;

const ApplicationWraper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  flex-direction: column;
`;
export function RouteWithAuthentificationRequireWithSideBar(): JSX.Element {
  const { currentStatus, userLoginEnum } = useCheckLogin();
  const renderContent = () => {
    if (currentStatus === userLoginEnum.notLogin) {
      return <Navigate to="/" />;
    } else if (currentStatus === userLoginEnum.checking) {
      return <Loading />;
    } else if (currentStatus === userLoginEnum.login) {
      return (
        <ApplicationWraper>
          <AppHeader />
          <AppSection>
            <SideNavigation />
            <WraperSection>
              <Outlet />
            </WraperSection>
          </AppSection>
        </ApplicationWraper>
      );
    }
  };
  return <Container>{renderContent()}</Container>;
}
