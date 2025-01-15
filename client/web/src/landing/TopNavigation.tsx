import { Link } from "react-router-dom";
import styled from "styled-components";
import OpenMeettumButton from "Components/OpenMeettumButton";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70px;
  align-items: center;
  position: relative;
  width: 100%;
  border: 1px solid var(--main-bg-cool-rgb);
  position: sticky;
  top: 0;
  background-color: var(--main-bg-pagebox);
  z-index: 1;
`;
const AppName = styled(Link)`
  display: flex;
  align-items: center;
`;

const LinkSection = styled.div`
  display: flex;
  gap: 5px;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

const LogoWraoer = styled.div`
  width: 10px;
  height: 50px;

  & img {
    width: 100%;
  }
`;

const NagigationContainer = styled.a`
  text-transform: uppercase;
  color: var(--text);
  margin-left: 10px;
  letter-spacing: 0.5px;
  font-size: 15px;

  &:hover {
    color: #6ec3f4;
  }
`;
const NagigationContainerLi = styled(Link)`
  text-transform: uppercase;
  color: var(--text);
  margin-left: 10px;
  letter-spacing: 0.5px;
  font-size: 15px;

  &:hover {
    color: #6ec3f4;
  }
`;

const NavigationWrapper = styled.div`
  display: flex;
  width: calc(100% - 350px);
`;

function TopNavigation() {
  return (
    <Container>
      <AppName to={"/app"}>
        <LogoWraoer></LogoWraoer>

        <div
          style={{
            letterSpacing: "2px",
            fontWeight: "bold",
          }}
          className="name-tof-napp"
        >
          MEETCODE
        </div>
      </AppName>
      <NavigationWrapper>
        <LinkSection>
          <NagigationContainerLi to={"/hello"}>Home</NagigationContainerLi>
          <NagigationContainer href={"/hello/#feature"}>
            Feature
          </NagigationContainer>
          <NagigationContainerLi to={"/playground"}>
            Playground
          </NagigationContainerLi>
        </LinkSection>
      </NavigationWrapper>
      <OpenMeettumButton />
    </Container>
  );
}

export default TopNavigation;
