import { useState } from "react";
import styled from "styled-components";
import SubscriptionPlan from "Components/MeettumPro/SubscriptionPlan";
import PaymentContainer from "Components/MeettumPro/PaymentContainer";
import FeatureOfMeetumPro from "Components/MeettumPro/FeatureOfMeetumPro";
import { IoChevronBackOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

const SectionContainer = styled(motion.div)`
  width: 100%;
`;

const ContainerOptionsWraper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  max-width: 500px;
  flex-direction: column;
`;
const option = [
  { name: "month", price: 15, planId: "1" },
  { name: "Year", price: 140, planId: "3", isPopularChoice: true },
  { name: "6 months", price: 75, planId: "2" },
];
const step_one = "step_one";
const step_two = "step_two";
const step_three = "step_three";
function SubscriptionToPro() {
  const [seletectedPlanId, setSelectedPlanId] = useState(null);
  const [seletedStep, setSeletedStep] = useState(step_one);

  const renderContent = () => {
    let content;
    switch (seletedStep) {
      case step_one:
        content = (
          <SectionContainer
            key={step_one}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}>
            <FeatureOfMeetumPro setSeletedStep={setSeletedStep} />
          </SectionContainer>
        );
        break;
      case step_two:
        content = (
          <SectionContainer
            key={step_two}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}>
            <ContainerOptionsWraper>
              <div
                style={{ marginBottom: "10px" }}
                className="booking-session-tilte">
                <button
                  onClick={() => {
                    setSeletedStep("step_one");
                  }}
                  className="close-that">
                  <IoChevronBackOutline />
                </button>
                <p>Select a Plan</p>
              </div>
              {option.map((item) => {
                return (
                  <SubscriptionPlan
                    key={item.planId}
                    item={item}
                    setSeletedStep={setSeletedStep}
                    setSelectedPlanId={setSelectedPlanId}
                  />
                );
              })}
            </ContainerOptionsWraper>
          </SectionContainer>
        );
        break;
      case step_three:
        content = (
          <SectionContainer
            key={step_three}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.2 }}>
            <PaymentContainer
              seletectedPlanId={seletectedPlanId}
              setSeletedStep={setSeletedStep}
            />
          </SectionContainer>
        );
        break;
      default:
        content = <div key="default">MEETCODE</div>;
    }

    return content;
  };

  return (
    <Container>
      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </Container>
  );
}

export default SubscriptionToPro;
