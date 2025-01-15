import styled from "styled-components";
import TopNavigation from "landing/TopNavigation";
import GradientNavigation from "animation/GradientNavigation";
import MannageSubscriptionComptainer from "Components/pro/MannageSubscriptionComptainer";
import useUser from "hooks/useUser";
const Container = styled.div`
  display: block;
  background-color: var(--main-bg-pagebox);
`;
const ContainerApp = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5%;
  width: 55%;
  height: calc(100vh - 70px);
  overflow: scroll;

  @media only screen and (max-width: 1000px) {
    width: 100%;
    align-items: none;
  }
`;

const HeaderSection = styled.div`
  position: relative;
  color: var(--text);
  font-size: 40px;
  height: calc(100vh - 70px);
  width: 45%;

  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;
const HeaderContainerInfo = styled.div`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const HeaderAnimation = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  height: 100%;

  overflow: hidden;
  & canvas {
    width: 100%;
    height: 100% !important;
  }
`;

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 70px);
`;
function ProJoinPage() {
  const { user } = useUser();
  return (
    <Container>
      <TopNavigation />
      <AppContainer>
        <HeaderSection>
          <HeaderAnimation>
            <GradientNavigation />
          </HeaderAnimation>
          <HeaderContainerInfo>
            {user?.isProUser
              ? `Welcome back ${user.username}`
              : "Become a Member"}{" "}
          </HeaderContainerInfo>
        </HeaderSection>
        <ContainerApp>
          <MannageSubscriptionComptainer />
        </ContainerApp>
      </AppContainer>
    </Container>
  );
}

export default ProJoinPage;
