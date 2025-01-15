import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import DisplayAiResult from "Components/CodeEngine/DisplayAiResult";
import useUser from "hooks/useUser";
import JoinProToContinue from "Components/CodeEngine/JoinProToContinue";
const Container = styled.div`
  width: 100%;
  overflow: scroll;
  display: block;
  flex-direction: column;
`;

const MainSection = styled.div`
  width: 100%;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 10px;
  display: flex;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
`;

const Option = styled.div`
  padding: 10px;
  color: var(--text);

  margin: 5px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: var(--main-bg-cool-rgb);
  }
`;

const PlaceHolder = styled.div<{ delay }>`
  background-color: var(--main-bg-cool-rgb);
  margin-bottom: 10px;
  border-radius: 30px;
  height: 40px;
  width: 100%;

  position: relative;
  overflow: hidden;
  animation: showIt 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &: before {
    content: "";
    display: block;
    position: absolute;
    left: -200px;
    top: 0;
    height: 100%;
    width: 200px;
    background: linear-gradient(
      to right,
      transparent 0%,
      #8a8484 50%,
      transparent 100%
    );
    animation-delay: 1s;
    animation: load ${({ delay }) => delay}s cubic-bezier(0.4, 0, 0.2, 1)
      infinite;
  }

  @keyframes load {
    from {
      opacity: 0;
      left: -150px;
    }
    to {
      opacity: 1;
      left: 100%;
    }
  }

  @keyframes showIt {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ResultContainer = styled.div`
  padding: 10px;
`;

const RunCodeMessage = styled.div`
  color: var(--text);
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  padding: 10px;
`;

const mapIndexToAction = {
  explain_code: "explain_code",
  explain_code_error: "explain_code_error",
  make_code_better: "make_code_better",
};

const Explain = ({ codeLog }): JSX.Element => {
  const { user } = useUser();
  const [disPlayProModal, setDisPlayProModal] = useState(false);

  const [currentKey, setCurrentKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [cacheResult, setCacheResult] = useState({});
  const jobId = codeLog.jobId;
  const options =
    codeLog && codeLog.errorMessage
      ? [
          { name: "Explain Code", key: mapIndexToAction.explain_code },
          { name: "Explain Error", key: mapIndexToAction.explain_code_error },

          { name: "Make Better", key: mapIndexToAction.make_code_better },
        ]
      : [
          { name: "Explain Code", key: mapIndexToAction.explain_code },

          { name: "Make Better", key: mapIndexToAction.make_code_better },
        ];

  const handleSelectionOption = async (key) => {
    if (isLoading) {
      return;
    }
    setCurrentKey(key);
    if (cacheResult[key]) {
      setResult(cacheResult[key]);
      return;
    }

    const numberOfFreeTry = localStorage.getItem("tryCount");

    if (!user.isProUser && parseInt(numberOfFreeTry) >= 2) {
      setDisPlayProModal(true);
      return;
    }

    setIsLoading(true);

    const mainCode = codeLog.files.find((item) => item.isEntryPoint).code;

    const query = {
      code: mainCode,
      errorMessage: codeLog.errorMessage,
      action: key,
      language: codeLog.language,
    };
    const result = await apiGateway.askAi(query);
    setIsLoading(false);
    if (result.succeeded) {
      setCacheResult((prev) => {
        const updateValue = { ...prev };
        updateValue[key] = result.result;
        return updateValue;
      });
      setResult(result.result);
      if (!user.isProUser) {
        const numberOfFreeTry = localStorage.getItem("tryCount");
        const count = numberOfFreeTry ? parseInt(numberOfFreeTry) + 1 : 1;
        localStorage.setItem("tryCount", count.toString());
      }
    }
  };

  useEffect(() => {
    setCacheResult({});
  }, [jobId]);

  function renderContent() {
    if (disPlayProModal) {
      return <JoinProToContinue />;
    }
    return (
      <>
        {codeLog && (
          <MainSection>
            {options.map((item, index) => {
              const isSelected = currentKey === item.key;
              return (
                <Option
                  onClick={() => {
                    handleSelectionOption(item.key);
                  }}
                  style={{
                    background: isSelected ? "var(--main-bg-cool-rgb)" : "",
                    border: isSelected
                      ? "0"
                      : "1px solid var(--main-bg-cool-rgb)",
                  }}
                  key={index}
                >
                  {item.name}
                </Option>
              );
            })}
          </MainSection>
        )}
        {codeLog ? (
          <ResultContainer>
            {isLoading && <PlaceHolder delay={1} />}
            {isLoading && <PlaceHolder delay={1.2} />}
            {isLoading && <PlaceHolder delay={1.3} />}
            {isLoading && <PlaceHolder delay={1.4} />}
            {isLoading && <PlaceHolder delay={1.5} />}
            {result && !isLoading && <DisplayAiResult result={result} />}
          </ResultContainer>
        ) : (
          <RunCodeMessage>Please run your code first</RunCodeMessage>
        )}
      </>
    );
  }

  useEffect(() => {
    if (!user.isProUser) {
      const numberOfFreeTry = localStorage.getItem("tryCount");
      if (numberOfFreeTry && parseInt(numberOfFreeTry) >= 2) {
        setDisPlayProModal(true);
      }
    }
  }, []);
  return <Container>{renderContent()}</Container>;
};

export default Explain;
