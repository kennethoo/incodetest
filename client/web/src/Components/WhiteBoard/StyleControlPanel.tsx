import React, { useRef, useState, useEffect } from "react";
import { FaRegSquare, FaRegCircle, FaMinus } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { BsCursorFill } from "react-icons/bs";
import { whiteBoardEnum } from "Components/WhiteBoard/whiteBoardCanvas";
import styled from "styled-components";
import { LuUndo } from "react-icons/lu";
import { GoPlus } from "react-icons/go";

const Container = styled.div`
  position: absolute;
  display: flex;
  left: 5px;
  z-index: 100;
  top: 10px;
  padding: 2px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  background-color: white;
  width: 100%;
  max-width: 200px;
  flex-direction: column;
  padding: 10px;
`;

const ActionButton = styled.button<{ isActive }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  padding: 5px;
  height: 30px;
  font-size: 20px;
  border: 0;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: rgb(111, 86, 229, 0.5);
  }

  ${({ isActive }) =>
    isActive
      ? `
 background-color: rgb(111, 86, 229);
      color: white;
    }`
      : ""}
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;
const SectionTitle = styled.p`
  color: #000;
`;
const SectionItemsContainer = styled.div`
  color: #000;
  display: flex;
`;
const ColorBox = styled.button`
  color: #000;
  width: 30px;
  height: 30px;
  margin-right: 5px;
  border-radius: 5px;
`;
const colors = ["#191919", "#e03131", "#2f9e44", "#6ec3f4", "#6f56e5"];

function StyleControlPanel() {
  const [currentStokeColor, setCurrentStokeColor] = useState("#e03131");
  const [currentBackgroundColor, setCurrentBackgroundColor] =
    useState("#e03131");

  return (
    <Container>
      <Section>
        <SectionTitle>Stroke</SectionTitle>
        <SectionItemsContainer>
          {colors.map((color) => {
            return (
              <ColorBox
                onClick={() => {
                  setCurrentStokeColor(color);
                }}
                style={{
                  backgroundColor: color,
                  border:
                    currentStokeColor === color ? "3px solid #000" : "0px",
                }}
              />
            );
          })}
        </SectionItemsContainer>
      </Section>
      <Section>
        <SectionTitle>Background Color</SectionTitle>
        <SectionItemsContainer>
          {colors.map((color) => {
            return (
              <ColorBox
                onClick={() => {
                  setCurrentBackgroundColor(color);
                }}
                style={{
                  backgroundColor: color,
                  border:
                    currentBackgroundColor === color ? "3px solid #000" : "0px",
                }}
              />
            );
          })}
        </SectionItemsContainer>
      </Section>
    </Container>
  );
}

export default StyleControlPanel;
