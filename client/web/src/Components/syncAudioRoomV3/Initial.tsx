import IconProfile from "Components/IconProfile";
import styled from "styled-components";

const Item = styled.div`
  width: 100%;
  display: flex;
  max-width: 60%;
  border-radius: 20%;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

  &:before {
    content: "";
    padding-top: 100%;
    display: block;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WrapperIcon = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function Initial({ userId }) {
  return (
    <Container>
      <WrapperIcon>
        <Item>
          <IconProfile userId={userId} />
        </Item>
      </WrapperIcon>
    </Container>
  );
}

export default Initial;
