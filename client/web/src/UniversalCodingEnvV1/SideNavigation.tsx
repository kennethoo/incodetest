import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ExtensionDisplayer from "Components/shared/ExtensionDisplayer";
import DeleteFileButton from "UniversalCodingEnvV1/DeleteFileButton";
import BottomCommunication from "CodeSession/BottomCommunication";
import { Link } from "react-router-dom";
import CodeSessionActionHeader from "CodeSession/CodeSessionActionHeader";
import DropDownOptions from "Components/shared/DropDownOptions";
import { codeSessionApi } from "ApiServiveGateWay/CodeSession";
import ActionCenter from "UniversalCodingEnvV1/ActionCenter";
const Container = styled.div`
  width: 250px;

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

const EditButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 40px;
  width: 40px;
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: var(--text);
  width: calc(100% - 65px);
`;

const FileContainer = styled.div`
  height: 40px;
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
const AppName = styled(Link)`
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
  height: 40px;
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
const SectionWrapper = styled.div`
  width: 100%;
  flex: 1;
`;

const OptionSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`;
const SideNavigation = ({
  codeWorkSession,
  setIscreateNewFileModalOpen,
  setIsModalOpen,
  setIsDeledModal,
  currentLanguage,
  handleChangeLanguage,
  isEndSessionModal,
  setIsEndSessionModal,
  files,
  codeWorkSessionApiRef,
  setFiles,
}): JSX.Element => {
  const navigate = useNavigate();
  const { tab } = useParams();

  return (
    <Container>
      <AppName to={"/app/home"}>
        <div
          style={{
            letterSpacing: "2px",
            fontWeight: "bold",
            fontSize: "20px",
          }}
          className="name-tof-napp"
        >
          INCODE
        </div>
      </AppName>

      <ActionCenter
        isEndSessionModal={isEndSessionModal}
        setIsDeledModal={setIsDeledModal}
        setIscreateNewFileModalOpen={setIscreateNewFileModalOpen}
        setIsModalOpen={setIsModalOpen}
        codeWorkSession={codeWorkSession}
        setIsEndSessionModal={setIsEndSessionModal}
      />

      <OptionSection>
        {!codeWorkSession.isProject && (
          <DropDownOptions
            canEdit={true}
            setSelectedOption={(item) => {
              handleChangeLanguage(item);
            }}
            selectedLanguage={currentLanguage}
            options={[
              codeSessionApi.JAVASCRIPT,
              codeSessionApi.PYTHON,
              codeSessionApi.JAVA,
              codeSessionApi.HTML,
              codeSessionApi.GO,
            ]}
          />
        )}
      </OptionSection>

      <SectionWrapper>
        {files?.map((file, index) => {
          return (
            <FileContainer
              style={{
                backgroundColor: index == tab ? "var(--main-bg-cool-rgb)" : "",
              }}
              key={file.filename}
              onClick={() => {
                navigate(`${codeWorkSession.url}/${index}`);
              }}
            >
              <ExtensionDisplayer language={file.filename.split(".").pop()} />
              <FileTitle>{file.filename}</FileTitle>
              {!file.isEntryPoint && (
                <DeleteFileButton
                  setFiles={setFiles}
                  codeWorkSessionApiRef={codeWorkSessionApiRef}
                  id={codeWorkSession._id}
                  file={file}
                />
              )}
            </FileContainer>
          );
        })}
      </SectionWrapper>
      {codeWorkSession && <BottomCommunication id={codeWorkSession._id} />}
    </Container>
  );
};

export default SideNavigation;
