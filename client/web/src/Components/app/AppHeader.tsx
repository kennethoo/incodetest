import { Link } from "react-router-dom";
import styled from "styled-components";
import LogUserInfo from "Components/LogUserInfo";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 55px;
  align-items: center;
  position: relative;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  z-index: 100000000000;
  width: 100%;
  padding-right: 10px;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
`;

const AppName = styled(Link)`
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const LinkSection = styled.div`
  display: flex;
  gap: 5px;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

function AppHeader() {
  return (
    <Container>
      <AppName to={"/app"}>
        <div
          style={{
            letterSpacing: "2px",
            fontWeight: "bold",
            fontSize: "20px",
          }}
          className="name-tof-napp"
        >
          MEETCODE
        </div>
      </AppName>

      <LinkSection></LinkSection>
      <LogUserInfo />
    </Container>
  );
}

export default AppHeader;
