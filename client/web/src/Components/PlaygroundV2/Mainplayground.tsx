import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Outputs from "Components/CodeEngine/Outputs";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import SelectableTabs from "Components/shared/SelectableTabs";
import CodeStats from "Components/CodeEngine/CodeStats";
import Explain from "Components/CodeEngine/Explain";
import CodeSanBoxV2 from "Components/PlaygroundV2/CodeSanBoxV2";
import ProjectHeader from "Components/PlaygroundV2/ProjectHeader";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const CodeWrapper = styled.div`
  width: 65%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 600px) {
    height: 60%;
    width: 100%;
  }
`;

const OutputsWrapper = styled.div`
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
  flex: 1;
  @media only screen and (max-width: 600px) {
    height: 40%;
    width: 100%;
  }
`;

const DesktopMode = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 40px);
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

const Resiser = styled.div`
  border: 1px solid var(--main-bg-cool-rgb);
  cursor: ew-resize;
  &:hover {
    background-color: #6f56e5;
  }
`;

const Mainplayground = ({
  language,
  project,
  setProject,
  files,
  setFiles,
}): JSX.Element => {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(null);
  const [isOuputSectionOpen, setOuputSectionOpen] = useState(true);
  const [codeWrapperWidth, setCodeWrapperWidth] = useState("65%");
  const codeWrapperRef = useRef(null);

  const isMouseDown = useRef(false);

  const handleMouseDown = (e) => {
    isMouseDown.current = true;
  };
  const handleMouseMove = (e) => {
    if (isMouseDown.current) {
      const newWidth =
        e.clientX - codeWrapperRef.current.offsetLeft - 273 + "px";
      setCodeWrapperWidth(newWidth);
    }
  };

  const handleMouseup = (e) => {
    isMouseDown.current = false;
  };
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
          {
            isPopularChoice: true,
            label: "AI Explain",
            tabComponent: <Explain codeLog={result} />,
          },
        ],
        mobile: [
          {
            label: "Output",
            tabComponent: <Outputs isLoading={isLoading} result={result} />,
          },
          {
            isPopularChoice: true,
            label: "AI Explain",
            tabComponent: <Explain codeLog={result} />,
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
          {
            isPopularChoice: true,
            label: "AI Explain",
            tabComponent: <Explain codeLog={result} />,
          },
        ],
      };
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseup);

    return () => {
      document.removeEventListener("mousemove", () => {});
    };
  }, []);

  return (
    <Container>
      <ProjectHeader project={project} />
      <DesktopMode>
        <CodeWrapper
          ref={codeWrapperRef}
          style={{ width: isOuputSectionOpen ? codeWrapperWidth : "100%" }}
        >
          <CodeSanBoxV2
            setOuputSectionOpen={setOuputSectionOpen}
            canUpdate={true}
            updateProjectProfile={updateProjectProfile}
            files={files}
            setFiles={setFiles}
            project={project}
            setCurrentTab={setCurrentTab}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setResult={setResult}
            baseTabLink={"/app/project"}
          />
        </CodeWrapper>
        <Resiser onMouseDown={handleMouseDown} />
        <OutputsWrapper>
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

export default Mainplayground;
