import styled from "styled-components";
import BackButton from "Components/shared/BackButton";
import DisplayConnectedUserInTheProject from "Components/PlaygroundV2/DisplayConnectedUserInTheProject";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  position: relative;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
`;

const Title = styled.div`
  display: -webkit-box;

  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  color: var(--text);
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: var(--text);
  width: calc(100% - 65px);
`;

function ProjectHeader({ project }) {
  const { title } = project;
  return (
    <Container>
      <Wrapper>
        <BackButton />
        <Title>{title}</Title>
      </Wrapper>
    </Container>
  );
}

export default ProjectHeader;
