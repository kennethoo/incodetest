import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Outputs from "Components/CodeEngine/Outputs";
import DropDownOptions from "Components/shared/DropDownOptions";
import useEditorTheme from "hooks/codeEngine/useEditorTheme";
import LoadingSpin from "Components/Loadingspin";
import CodeSanBox from "Components/CodeEngine/CodeSanBox";
import CodeSanBoxV2 from "Components/PlaygroundV2/CodeSanBoxV2";
import Tabs from "Components/shared/Tabs";
import useDebounce from "hooks/useDebounce";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import SelectableTabs from "Components/shared/SelectableTabs";
import CodeStats from "Components/CodeEngine/CodeStats";
import Explain from "Components/CodeEngine/Explain";
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
`;
const CodeWrapper = styled.div`
  width: 65%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const OutputsWrapper = styled.div`
  width: 35%;
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
`;

const DesktopMode = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  @media only screen and (min-width: 1200px) {
    display: flex;
  }
`;

const SharedPlayground = ({
  language,
  project,
  setFiles,
  files,
}): JSX.Element => {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(null);
  const [isOuputSectionOpen, setOuputSectionOpen] = useState(true);
  const [codeWrapperWidth, setCodeWrapperWidth] = useState("65%");

  const updateProjectProfile = ({ filename, code, isEntryPoint }) => {
    setFiles((prev) => {
      const index = prev?.findIndex((item) => item.filename === filename);

      if (index > -1) {
        const updateed = [...prev];
        updateed[index].code = code;

        return [...updateed];
      } else {
        return prev;
      }
    });
  };

  const builTabs = () => {
    if (language === apiGateway.HTML) {
      return {
        desktop: [
          {
            label: "Output",
            tabComponent: <Outputs isLoading={isLoading} result={result} />,
          },
        ],
        mobile: [
          {
            label: "Output",
            tabComponent: <Outputs isLoading={isLoading} result={result} />,
          },
        ],
      };
    } else {
      return {
        desktop: [
          {
            label: "Output",
            tabComponent: <Outputs isLoading={isLoading} result={result} />,
          },
          {
            label: "Stats",
            tabComponent: <CodeStats log={result} />,
          },
        ],
      };
    }
  };

  return (
    <Container>
      <DesktopMode>
        <CodeWrapper
          style={{ width: isOuputSectionOpen ? codeWrapperWidth : "100%" }}
        >
          <CodeSanBoxV2
            setOuputSectionOpen={setOuputSectionOpen}
            project={project}
            setCurrentTab={setCurrentTab}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setResult={setResult}
            files={files}
            updateProjectProfile={updateProjectProfile}
            setFiles={setFiles}
            canUpdate={false}
            baseTabLink={"/app/shared"}
          />
        </CodeWrapper>
        <OutputsWrapper style={{ width: isOuputSectionOpen ? "35%" : "0%" }}>
          <SelectableTabs
            setOuputSectionOpen={setOuputSectionOpen}
            setCurrentTab={setCurrentTab}
            forceTab={currentTab}
            sections={builTabs().desktop}
          />
        </OutputsWrapper>
      </DesktopMode>
    </Container>
  );
};

export default SharedPlayground;
