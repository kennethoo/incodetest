import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import BackButton from "Components/shared/BackButton";

import DropDownMenu from "Components/shared/DropDownMenu";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import { useNavigate } from "react-router-dom";

import ExtensionDisplayer from "Components/shared/ExtensionDisplayer";
import DeleteFileButton from "Components/PlaygroundV2/DeleteFileButton";
const Container = styled.div`
  width: 200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--main-bg-cool-rgb);
`;

const Header = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding-rigth: 10px;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: var(--text);
  width: calc(100% - 65px);
`;

const FileContainer = styled.div`
  height: 35px;
  color: var(--text);
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: var(--main-bg-cool-rgb);
    & .delete-file {
      display: flex;
    }
  }
`;
const Title = styled.div`
  display: -webkit-box;
  line-height: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`;
const FileTitle = styled.div`
  display: -webkit-box;
  line-height: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Fira Code", monospace;

  width: calc(100% - 70px);
`;
const SharedSideProjectNavigation = ({ project }): JSX.Element => {
  const navigate = useNavigate();
  const { title } = project ?? {};
  const { tab } = useParams();
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  return (
    <Container>
      <Header>
        <Wrapper>
          <BackButton />

          <Title>{title}</Title>
        </Wrapper>

        <DropDownMenu
          options={[
            {
              item: "Copy Link",
              handleClick: () => {
                copyLink();
              },
            },
          ]}
        />
      </Header>

      {project?.projectFiles?.map((file, index) => {
        return (
          <FileContainer
            style={{
              backgroundColor: index == tab ? "var(--main-bg-cool-rgb)" : "",
            }}
            onClick={() => {
              navigate(`/shared/${project._id}/${index}`);
            }}
          >
            <ExtensionDisplayer language={file.filename.split(".").pop()} />
            <FileTitle>{file.filename}</FileTitle>
            {!file.isEntryPoint && (
              <DeleteFileButton projectId={project._id} file={file} />
            )}
          </FileContainer>
        );
      })}
    </Container>
  );
};

export default SharedSideProjectNavigation;
