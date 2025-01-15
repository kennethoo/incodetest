import { useState } from "react";
import styled from "styled-components";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const Container = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 35px;
  min-width: 35px;
  max-width: 35px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--text);
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  &:hover {
    background-color: var(--main-bg-cool-rgb);
  }
`;

function BackButton() {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() => {
        navigate(-1);
      }}
    >
      <IoArrowBack />
    </Container>
  );
}

export default BackButton;
