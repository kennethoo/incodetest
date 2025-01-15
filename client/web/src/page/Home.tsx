import styled from "styled-components";
import HomeHeader from "Components/home/HomeHeader";
import RecentProject from "Components/home/RecentProject";
import ActiveSession from "Components/home/ActiveSession";
// create some stuff
const HomeContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;
const Home = (): JSX.Element => {
  return (
    <HomeContainer>
      <HomeHeader />
      <ActiveSession />
      <RecentProject />
    </HomeContainer>
  );
};

export default Home;
