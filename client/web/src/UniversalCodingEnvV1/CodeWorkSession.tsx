import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import EndSession from "UniversalCodingEnvV1/EndSession";
import Mainplayground from "UniversalCodingEnvV1/Mainplayground";
import SideNavigation from "UniversalCodingEnvV1/SideNavigation";
import { CodeWorkSessionApi } from "ApiServiveGateWay/CodeWorkSession";
import CreateNewFile from "UniversalCodingEnvV1/CreateNewFile";
import EditWorkSession from "UniversalCodingEnvV1/EditWorkSession";
import { codeSessionApi } from "ApiServiveGateWay/CodeSession";
import realtimeBoardSocket from "realtimeBoardSocket";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const PlaygroundContainer = styled.div`
  height: 100%;
  width: calc(100% - 250px);
`;

const CodeWorkSession = ({ codeWorkSession, isProject }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeledModal, setIsDeledModal] = useState(false);
  const [isEndSessionModal, setIsEndSessionModal] = useState(false);
  const [iscreateNewFileModalOpen, setIscreateNewFileModalOpen] =
    useState(false);
  const [files, setFiles] = useState([]);
  const [codeWorkSessionData, setCodeWorkSessionData] = useState(null);
  const isLoading = useRef(false);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [isEnvSetup, setIsEnvSetup] = useState(false);
  const codeWorkSessionApiRef = useRef(
    new CodeWorkSessionApi({ codeWorkSession, isProject }),
  );
  const handleChangeLanguage = async (language) => {
    isLoading.current = true;
    const { succeeded, files } = await codeSessionApi.handleAction({
      action: codeSessionApi.UPDATE_SESSION_LANGUAGE,
      payload: {
        language,
        sessionId: codeWorkSessionData._id,
      },
    });

    isLoading.current = false;
    if (succeeded) {
      setCurrentLanguage(language);
      setFiles(files);
      codeWorkSessionApiRef.current.codeWorkSession.langauge = language;
      realtimeBoardSocket.emit("codeWorkSession:event", {
        eventName: codeWorkSessionApiRef.current.EVENT_NEW_FILE,
        workSessionId: codeWorkSession._id,
        payload: { files, language },
      });
    } else {
      //log the error here
    }
  };

  useEffect(() => {
    const data = codeWorkSessionApiRef.current.build();
    setCodeWorkSessionData(data);
    setCurrentLanguage(data.language);
    setFiles(data.files);
    setIsEnvSetup(true);

    realtimeBoardSocket.on("codeWorkSession:event:update", (result) => {
      const { eventName, payload } = result;
      if (eventName === codeWorkSessionApiRef.current.EVENT_NEW_FILE) {
        const { files, language } = payload;
        setFiles(files);
        if (language) {
          setCurrentLanguage(language);
        }
      } else if (eventName === codeWorkSessionApiRef.current.EVENT_NEW_TITLE) {
        const { title } = payload;
        setCodeWorkSessionData((prev) => {
          const update = { ...prev };
          update.title = title;
          return { ...update };
        });
        codeWorkSessionApiRef.current.codeWorkSession.title = title;
      } else if (eventName === codeWorkSessionApiRef.current.END_SESSION) {
        window.location.reload();
      }
    });

    return () => {
      realtimeBoardSocket.off("codeWorkSession:event:update");
    };
  }, []);

  const isReadOnly =
    codeWorkSessionData?.sessionState ===
    codeWorkSessionApiRef.current.END_SESSION;

  return (
    <Container>
      {isEnvSetup && (
        <>
          <SideNavigation
            files={files}
            setFiles={setFiles}
            codeWorkSessionApiRef={codeWorkSessionApiRef.current}
            setIsEndSessionModal={setIsEndSessionModal}
            isEndSessionModal={isEndSessionModal}
            setIsModalOpen={setIsModalOpen}
            setIsDeledModal={setIsDeledModal}
            setIscreateNewFileModalOpen={setIscreateNewFileModalOpen}
            codeWorkSession={codeWorkSessionData}
            handleChangeLanguage={handleChangeLanguage}
            currentLanguage={currentLanguage}
          />
          <PlaygroundContainer>
            {files.length && (
              <Mainplayground
                isReadOnly={isReadOnly}
                codeWorkSessionData={codeWorkSessionData}
                files={files}
                setFiles={setFiles}
                codeWorkSessionApiRef={codeWorkSessionApiRef.current}
                language={currentLanguage}
              />
            )}
          </PlaygroundContainer>
          {isEndSessionModal && (
            <EndSession
              setIsEndSessionModal={setIsEndSessionModal}
              session={codeWorkSessionApiRef.current.codeWorkSession}
            />
          )}

          {isModalOpen && (
            <EditWorkSession
              setCodeWorkSessionData={setCodeWorkSessionData}
              setIsModalOpen={setIsModalOpen}
              codeWorkSessionApiRef={codeWorkSessionApiRef.current}
            />
          )}

          {iscreateNewFileModalOpen && (
            <CreateNewFile
              setFiles={setFiles}
              setIsModalOpen={setIscreateNewFileModalOpen}
              codeWorkSessionApiRef={codeWorkSessionApiRef.current}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default CodeWorkSession;
