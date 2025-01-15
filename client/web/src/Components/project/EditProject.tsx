import { useState } from "react";

import { apiGateway } from "ApiServiveGateWay/apiGateway";
import { IoCloseSharp } from "react-icons/io5";
import styled from "styled-components";
import ActionButton from "Components/shared/ActionButton";
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

function EditProject({
  project,
  setIsModalOpen,
  setProject,
  codeWorkSessionApiRef,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState(project.title);

  const handleClick = async () => {
    setIsLoading(true);
    await projectApi.create({
      action: apiGateway.UPDATE_PROJECT_TITLE,
      payload: { projectId: project._id, title },
    });
    setIsLoading(false);

    realtimeBoardSocket.emit("codeWorkSession:event", {
      eventName: codeWorkSessionApiRef.EVENT_NEW_TITLE,
      workSessionId: project._id,
      payload: {
        title,
      },
    });

    setProject((prev) => {
      const update = { ...prev, title };
      return update;
    });

    setIsModalOpen(false);
  };

  const label = "Edit";

  return (
    <div className={`overlay-new-program active`}>
      <div className="box-that-create-a-new-program">
        <div className="title-of--thise-action">
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="close-that"
          >
            <IoCloseSharp />
          </button>
          <p>Edit Project</p>
        </div>
        <InputContainer>
          <Title>Title</Title>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            value={title}
            placeholder={"title"}
          />
        </InputContainer>

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

export default EditProject;
