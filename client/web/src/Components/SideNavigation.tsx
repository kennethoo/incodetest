import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import styled from "styled-components";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaFolder } from "react-icons/fa";
import useUser from "hooks/useUser";
import { IoSettings } from "react-icons/io5";
import UpgrateMeettumProCTA from "Components/pro/UpgrateMeettumProCTA";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";

const Container = styled.div`
  min-width: 70px;
  max-width: 70px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow: scroll;
  border-right: 1px solid var(--main-bg-cool-rgb);
  margin: 0;
  padding: 0;
`;
const Label = styled.div`
  font-size: 10px;
  display: flex;
  align-items: center;

  font-weight: bold;
  color: var(--text);
  text-transform: uppercase;
`;

const ContainerNativation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.div`
  font-size: 20px;
  color: var(--text);
  padding: 10px;
  display: flex;
  border-radius: 50px;
`;

function SideNavigation() {
  const { user } = useUser();
  return (
    <Container>
      <div className="nav-side">
        <NavLink to="/app/home" className="nacgg" id="nav-lii">
          <ContainerNativation>
            <Icon className="wrapper-nav">
              <FaHome />
            </Icon>
            <Label>Home</Label>
          </ContainerNativation>
        </NavLink>
        <NavLink to="/app/analytic" className="nacgg" id="nav-lii">
          <ContainerNativation>
            <Icon className="wrapper-nav">
              <IoAnalyticsSharp />
            </Icon>
            <Label>Analytics</Label>
          </ContainerNativation>
        </NavLink>
        <NavLink to="/app/repo" className="nacgg" id="nav-lii">
          <ContainerNativation>
            <Icon className="wrapper-nav">
              <FaRegLightbulb />
            </Icon>
            <Label>Repo</Label>
          </ContainerNativation>
        </NavLink>

        <NavLink to="/app/projects" className="nacgg" id="nav-lii">
          <ContainerNativation>
            <Icon className="wrapper-nav">
              <FaFolder />
            </Icon>
            <Label>Projects</Label>
          </ContainerNativation>
        </NavLink>
        <NavLink to="/app/apikeys" className="nacgg" id="nav-lii">
          {/* <ContainerNativation>
            <Icon className="wrapper-nav">
              <TbApi />
            </Icon>
            <Label>Api Keys</Label>
          </ContainerNativation> */}
        </NavLink>
        <NavLink to="/app/session" className="nacgg" id="nav-lii">
          <ContainerNativation>
            <Icon className="wrapper-nav">
              <FaLaptopCode />
            </Icon>
            <Label>Sessions</Label>
          </ContainerNativation>
        </NavLink>
        <NavLink to="/app/setting" className="nacgg" id="nav-lii">
          <ContainerNativation>
            <Icon className="wrapper-nav">
              <IoSettings />
            </Icon>
            <Label>Settings</Label>
          </ContainerNativation>
        </NavLink>
      </div>
      {!user.isProUser && <UpgrateMeettumProCTA />}
    </Container>
  );
}

export default SideNavigation;
