import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";

import ActionButton from "Components/shared/ActionButton";
const Container = styled.div`
  width: 100%;
`;

const Title = styled.p`
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  color: var(--text);
`;
const Header = styled.div`
  width: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
  color: var(--text);
  text-align: center;
  margin-bottom: 10px;
`;
const ContainerOption = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;
const ContainerIcon = styled.div`
  min-width: 30px;
  max-width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);

  border-radius: 50%;
  color: #6f56e5;
  margin-right: 10px;
`;
function FeatureOfMeetumPro({ setSeletedStep }) {
  return (
    <Container>
      <Header style={{ fontSize: "25px" }}> INCODE PRO</Header>
      <ContainerOption>
        <ContainerIcon>
          <FaCheckCircle />
        </ContainerIcon>
        <Title>Save all Code Analytics</Title>
      </ContainerOption>
      <ContainerOption>
        <ContainerIcon>
          <FaCheckCircle />
        </ContainerIcon>
        <Title>AI-Powered Code Assistant</Title>
      </ContainerOption>
      <ContainerOption>
        <ContainerIcon>
          <FaCheckCircle />
        </ContainerIcon>
        <Title>Collaborate with 5+ Real-Time Users</Title>
      </ContainerOption>
      <ContainerOption>
        <ContainerIcon>
          <FaCheckCircle />
        </ContainerIcon>
        <Title>Unlimited Project Creation & Code Submissions</Title>
      </ContainerOption>
      <ContainerOption>
        <ContainerIcon>
          <FaCheckCircle />
        </ContainerIcon>
        <Title>Early Access to INCODE API + Credits</Title>
      </ContainerOption>

      <ContainerOption>
        <ContainerIcon>
          <FaCheckCircle />
        </ContainerIcon>
        <Title>Cancel Anytime, No Commitment</Title>
      </ContainerOption>

      <ActionButton
        label="NEXT"
        handleClick={() => {
          setSeletedStep("step_two");
        }}
        isLoading={false}
        isCancelAction={false}
      />
    </Container>
  );
}

export default FeatureOfMeetumPro;
