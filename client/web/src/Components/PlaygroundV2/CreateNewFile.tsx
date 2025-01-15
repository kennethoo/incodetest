import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import styled from "styled-components";
import ActionButton from "Components/shared/ActionButton";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import useLogger from "hooks/useLogger";
import validateFileName from "utility/validateFileName";
import { projectApi } from "ApiServiveGateWay/ProjectApi";

import realtimeBoardSocket from "realtimeBoardSocket";

const InputContainer = styled.div`
  border: 1px solid var(--main-bg-cool-rgb);
  padding: 5px;
  border-radius: 10px;
  margin-bottom: 10px;

  & input {
    background: none;
    border: 0;
    height: 35px;
    color: var(--text);
    outline: none;
    font-size: 18px;
    width: 100%;
  }
`;

const Title = styled.p`
  color: #dadada;
  letter-spacing: 1px;
`;

function FileNameInput({ fileName, setFileName }) {
  return (
    <InputContainer>
      <Title>Filename</Title>
      <input
        onChange={(e) => {
          setFileName(e.target.value);
        }}
        type="text"
        value={fileName}
        placeholder={"Enter filename example something.py"}
      />
    </InputContainer>
  );
}

function CreateNewFile({
  project,
  setIsModalOpen,
  setFiles,
  codeWorkSessionApiRef,
}) {
  const logger = useLogger();
  const [isLoading, setIsLoading] = useState(false);
  const [filename, setFileName] = useState("");
  const handleClick = async () => {
    //validate for duplicate file name fiest

    if (isLoading) {
      return;
    }

    const { valid, errorMessage } = validateFileName(filename);
    if (!valid) {
      logger({
        isErrorMessage: true,
        message: errorMessage,
        fileName: "CreateNewFile.tsx",
      });
      return;
    }

    setIsLoading(true);

    const result = await projectApi.create({
      action: apiGateway.UPDATE_PROJECT_BY_CREATING_NEW_FILE,
      payload: { filename, projectId: project._id },
    });

    setIsLoading(false);

    if (!result.succeeded) {
      logger({
        isErrorMessage: true,
        message: result.errorMessage,
        fileName: "CreateNewFile.tsx",
      });
      return;
    }

    setFiles(result.files);

    realtimeBoardSocket.emit("codeWorkSession:event", {
      eventName: codeWorkSessionApiRef.EVENT_NEW_FILE,
      workSessionId: codeWorkSessionApiRef.codeWorkSession._id,
      payload: {
        files: result.files,
      },
    });
    setIsModalOpen(false);
  };

  const label = "CREATE";

  return (
    <div className={`overlay-new-program active`}>
      <div className="box-that-create-a-new-program">
        <div className="title-of--thise-action">
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="close-that">
            <IoCloseSharp />
          </button>
          <p>New File</p>
        </div>

        {/* Input for Filename */}
        <FileNameInput fileName={filename} setFileName={setFileName} />

        {/* Action Button */}
        <ActionButton
          isCancelAction={false}
          label={label}
          isLoading={isLoading}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}

export default CreateNewFile;
