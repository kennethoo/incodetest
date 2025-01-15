import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import DisplayAiResult from "Components/CodeEngine/DisplayAiResult";
import GuestLogin from "Components/GuestPlaygroud/GuestLogin";

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

const GuestCodeExplain = ({ codeLog }): JSX.Element => {
  const [currentKey, setCurrentKey] = useState(null);
  const [disPlaySigInModal, setDisPlaySigInModal] = useState(true);
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
    const numberOfFreeTry = localStorage.getItem("tryCount");

    if (parseInt(numberOfFreeTry) >= 2) {
      setDisPlaySigInModal(true);
      return;
    }
    if (isLoading) {
      return;
    }
    setCurrentKey(key);
    if (cacheResult[key]) {
      setResult(cacheResult[key]);
      return;
    }

    setIsLoading(true);

    const query = {
      code: codeLog.code,
      errorMessage: codeLog.errorMessage,
      action: key,
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
      const numberOfFreeTry = localStorage.getItem("tryCount");
      const count = numberOfFreeTry ? parseInt(numberOfFreeTry) + 1 : 1;
      localStorage.setItem("tryCount", count.toString());
    }
  };
  useEffect(() => {
    setCacheResult({});
  }, [jobId]);

  useEffect(() => {
    const numberOfFreeTry = localStorage.getItem("tryCount");
    if (numberOfFreeTry && parseInt(numberOfFreeTry) >= 2) {
      setDisPlaySigInModal(true);
    }
  }, []);

  const renderSigInModal = () => {
    if (disPlaySigInModal) {
      return <GuestLogin />;
    } else {
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
  };

  return <Container>{renderSigInModal()}</Container>;
};

export default GuestCodeExplain;
