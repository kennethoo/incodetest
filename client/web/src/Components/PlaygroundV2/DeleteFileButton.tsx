import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import useColor from "hooks/useColor";
import { FaRegTrashAlt } from "react-icons/fa";
import { apiGateway } from "ApiServiveGateWay/apiGateway";

const Container = styled.button`
  display: none;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  width: 35px;
  align-items: center;
  justify-content: center;
  color: var(--text);
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;

const DeleteFileButton = ({ file, projectId }) => {
  const { filename } = file;
  const handleClick = async () => {
    //validate for duplicate file name fiest

    await apiGateway.handleActionForProject({
      action: apiGateway.DELETE_PROJECT_FILE,
      payload: { filename, _id: projectId },
    });

    window.location.reload();
  };
  return (
    <Container onClick={handleClick} className="delete-file">
      <FaRegTrashAlt />
    </Container>
  );
};

export default DeleteFileButton;
