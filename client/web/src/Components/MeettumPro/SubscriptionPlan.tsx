import React from "react";
import styled from "styled-components";

// Styled card container
const CardContainer = styled.div<{ isPopularChoice }>`
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
  display: flex;
  text-align: center;
  z-index: 1;
  width: 100%;
  font-size: 14px;
  border: 2px solid var(--main-bg-cool-rgb);
  padding: 10px;

  justify-content: space-between;
  align-items: center;
  color: white;
  margin-bottom: 10px;

  ${({ isPopularChoice }) =>
    isPopularChoice
      ? `
      &:before {
    content: '';
    background: linear-gradient(45deg, #6ec3f4, #ff61ab, #6f56e5, #e63946);
    position: absolute;
    top: -4px;
    left: -4px;
    width: calc(100% + 8px);
    height: calc(100% + 8px);

    border-radius: 10px;
    background-size: 400%;
    z-index: -1;
    filter: blur(4px);
    animation: glowEffect 10s linear infinite;

    @keyframes glowEffect {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 400% 0;
      }
    }
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    z-index: -1;
    background: var(--main-bg-pagebox);
  }
    }`
      : ""}
`;

// Styled title
const Text = styled.p`
  text-transform: capitalize;
  font-weight: bold;
`;
const TextWraper = styled.div`
  display: flex;
  align-items: center;
`;

// Styled description
const Description = styled.div``;

// Styled price
const PriceContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PopularChoice = styled.div`
  border-radius: 30px;
  padding: 5px 10px 5px 10px;
  display: inline-block;
  text-align: center;
  z-index: 1;
  font-size: 14px;
  color: white;
  margin-bottom: 10px;

  background: #6f56e5;
`;

// Styled button
const Button = styled.button`
  background-color: var(--main-bg-cool-rgb);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1em;
  border-radius: 30px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  &:hover {
    background-color: #6f56e5;
  }
`;

// SubscriptionCard Component
function SubscriptionPlan({ item, setSeletedStep, setSelectedPlanId }) {
  const { price, name, planId, isPopularChoice } = item;

  return (
    <CardContainer isPopularChoice={isPopularChoice}>
      <Description>
        <PriceContainer>
          {isPopularChoice && <PopularChoice>Save 22%</PopularChoice>}
          <TextWraper>
            <Text style={{ fontSize: "25px" }}>${price}</Text>
            <Text
              style={{
                fontSize: "15px",
                marginLeft: "5px",
                marginRight: "5px",
              }}>
              /
            </Text>
            <Text style={{ color: "#dadada", fontSize: "15px" }}>{name}</Text>
          </TextWraper>
        </PriceContainer>
      </Description>
      <Button
        onClick={() => {
          setSelectedPlanId(planId);
          setSeletedStep("step_three");
        }}>
        Select
      </Button>
    </CardContainer>
  );
}

export default SubscriptionPlan;
