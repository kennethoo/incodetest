import React from "react";
import styled from "styled-components";
import { BiRocket } from "react-icons/bi";
import { HiBadgeCheck, HiSpeakerphone } from "react-icons/hi";
import { BsGraphUp, BsFillLockFill, BsPieChartFill } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";

const FeatureContainer = styled.div`
  padding: 50px 20px;
  background-color: #1c1c1e;
  color: #fff;
  text-align: center;
  border-top: 1px solid var(--main-bg-cool-rgb);
  margin-top: 30px;

  margin: 0 auto;
`;

const Title = styled.div`
  color: var(--text);
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  font-size: 2rem;
  background: linear-gradient(45deg, #6ec3f4, #6f56e5, #e63946);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  border-radius: 5px;
  background-size: 400%;
  margin-bottom: 20px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-width: 1000px;

  margin: 0 auto;
`;

const Card = styled.div`
  background-color: #2c2c2e;
  border-radius: 12px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: #61dafb;
  margin-bottom: 10px;
`;

const FeatureTitle = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: ${(props) => (props.mode ? "#444" : "#ccc")};
`;

const features = [
  {
    title: "Code Execution",
    description:
      "Run and debug your code in real-time across various languages in a secure, isolated environment.",
    icon: <BiRocket />,
  },
  {
    title: "Collaborate",
    description:
      "Invite teammates to edit and run code together, with audio call, fostering collaboration in a shared workspace.",
    icon: <AiOutlineLink />,
  },
  {
    title: "Analytics",
    description:
      "Gain insights on code performance with detailed analytics for optimization and debugging.",
    icon: <BsPieChartFill />,
  },
  {
    title: "Growth Tracking",
    description:
      "Track your learning progress with milestones and shared achievements in your coding journey.",
    icon: <BsGraphUp />,
  },
  {
    title: "Secure Environment",
    description:
      "Enjoy an encrypted and secure platform with sandboxed environments for maximum safety.",
    icon: <BsFillLockFill />,
  },
  {
    title: "Code Interview",
    description:
      "Assign coding tasks and monitor progress in real-time during remote or in-person interviews. Writing code on a whiteboard is something no one enjoys.",
    icon: <HiBadgeCheck />,
  },
];

const Feature = () => {
  return (
    <FeatureContainer id="feature">
      <Title>Why Choose Meetcode?</Title>
      <CardWrapper>
        {features.map((feature, index) => (
          <Card key={index}>
            <IconWrapper>{feature.icon}</IconWrapper>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <Description>{feature.description}</Description>
          </Card>
        ))}
      </CardWrapper>
    </FeatureContainer>
  );
};

export default Feature;
