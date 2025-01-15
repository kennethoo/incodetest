import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Outputs from "Components/CodeEngine/Outputs";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import SelectableTabs from "Components/shared/SelectableTabs";
import Explain from "Components/CodeEngine/Explain";
import TopNavigation from "landing/TopNavigation";
import GuestCodeSanBox from "Components/GuestPlaygroud/GuestCodeSanBox";
import GuestCodeStats from "Components/GuestPlaygroud/GuestCodeStats";
import GuestCodeExplain from "Components/GuestPlaygroud/GuestCodeExplain";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
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
  display: none;
  height: 100%;
  @media only screen and (min-width: 1200px) {
    display: flex;
  }
`;

const MobileMode = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  display: none;
  @media only screen and (max-width: 1200px) {
    display: block;
  }
`;

const ApplicationContainer = styled.div`
  height: calc(100% - 70px);
  border-top: 1px solid var(--main-bg-cool-rgb);
`;

const GuestPlaygroud = (): JSX.Element => {
  const [language, setLanguage] = useState(apiGateway.JAVA);
  const [code, setCode] = useState("");

  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(null);

  const [isOuputSectionOpen, setOuputSectionOpen] = useState(true);
  const [codeWrapperWidth, setCodeWrapperWidth] = useState("65%");

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
            tabComponent: <GuestCodeExplain codeLog={result} />,
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
            tabComponent: <GuestCodeStats log={result} />,
          },
          {
            isPopularChoice: true,
            label: "AI Explain",
            tabComponent: <GuestCodeExplain codeLog={result} />,
          },
        ],
        mobile: [
          {
            label: "Code",
            tabComponent: (
              <GuestCodeSanBox
                setCurrentTab={setCurrentTab}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setLanguage={setLanguage}
                setResult={setResult}
                code={code}
                setCode={setCode}
              />
            ),
          },
          {
            label: "Output",
            tabComponent: <Outputs isLoading={isLoading} result={result} />,
          },
          {
            label: "Stats",
            tabComponent: <GuestCodeStats log={result} />,
          },
          {
            label: "AI Explain",
            isPopularChoice: true,
            tabComponent: <GuestCodeExplain codeLog={result} />,
          },
        ],
      };
    }
  };
  return (
    <Container>
      <TopNavigation />
      <ApplicationContainer>
        <DesktopMode>
          <CodeWrapper
            style={{ width: isOuputSectionOpen ? codeWrapperWidth : "100%" }}
          >
            <GuestCodeSanBox
              setCurrentTab={setCurrentTab}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setLanguage={setLanguage}
              setResult={setResult}
              code={code}
              setCode={setCode}
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
        <MobileMode>
          <SelectableTabs
            setOuputSectionOpen={setOuputSectionOpen}
            setCurrentTab={setCurrentTab}
            forceTab={currentTab}
            sections={builTabs().mobile}
          />
        </MobileMode>
      </ApplicationContainer>
    </Container>
  );
};

export default GuestPlaygroud;
