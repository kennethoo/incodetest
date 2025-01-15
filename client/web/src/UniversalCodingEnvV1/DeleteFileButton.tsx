import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import useColor from "hooks/useColor";
import { FaRegTrashAlt } from "react-icons/fa";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import realtimeBoardSocket from "realtimeBoardSocket";
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

const DeleteFileButton = ({ file, id, codeWorkSessionApiRef, setFiles }) => {
  const { filename } = file;
  const handleClick = async () => {
    const { succeeded, files } = await codeWorkSessionApiRef.deleteFile({
      filename,
      id,
    });

    if (succeeded) {
      setFiles(files);
      realtimeBoardSocket.emit("codeWorkSession:event", {
        eventName: codeWorkSessionApiRef.EVENT_NEW_FILE,
        workSessionId: id,
        payload: {
          files,
        },
      });
    } else {
      //loger error
    }
  };
  return (
    <Container onClick={handleClick} className="delete-file">
      <FaRegTrashAlt />
    </Container>
  );
};

export default DeleteFileButton;
