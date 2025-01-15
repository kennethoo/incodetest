import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import useColor from "hooks/useColor";
import CodeFileWrapper from "UniversalCodingEnvV1/CodeFileWrapper";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
interface TabProps {
  language: String;
  sections: any;
  defaultTab?: string;
  tabsLabelsStyle?: any;
  labelStyle?: any;
  updateProjectProfile: any;
  canUpdate: boolean;
  baseTabLink: String;
  codeWorkSessionApiRef: any;
  codeWorkSessionId: String;
  isReadOnly: Boolean;
}

const TabsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
`;
const TabsLabels = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: inline-flex;
  white-space: nowrap;
  align-items: flex-start;
  flex-direction: row;
  height: 40px;
  overflow: scroll;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
`;

const Label = styled(({ isactive, ...rest }) => <div {...rest} />)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justifyp-content: center;
  font-family: "Fira Code", monospace;

  color: ${({ color, isactive }) => (isactive ? "white" : color)};
  padding: 0px 15px 0px 10px;
  display: inline-flex;
  cursor: pointer;
  position: relative;
  height: 100%;
  z-index: 2;

  cursor: pointer;

  background-color: ${({ isactive }) => (isactive ? "#1f2125" : "")};

  border-bottom: ${({ isactive }) => (isactive ? "1px solid #6f56e5" : "0")};
  &:hover {
    background-color: var(--main-bg-cool-rgb);
  }
`;

const TabSectionWrapper = styled.div`
  box-sizing: border-box;
`;

const Tab = styled(({ isactive, ...rest }) => <div {...rest} />)`
  box-sizing: border-box;
  display: ${({ isactive }) => (isactive ? "flex" : "flex")};
  visibility: ${({ isactive }) => (isactive ? "visible" : "hidden")};
  height: 100%;
  width: 100%;
`;

const FileTabs = ({
  language,
  sections,
  defaultTab,
  tabsLabelsStyle = {},
  labelStyle = {},
  codeWorkSessionId,
  updateProjectProfile,
  canUpdate,
  baseTabLink,
  codeWorkSessionApiRef,
  isReadOnly,
}: TabProps) => {
  const navigate = useNavigate();
  const { tab } = useParams();
  const labels = sections
    .filter((item) => !item.doNotShow)
    .map((item) => {
      return {
        name: item.filename,
        badge: item?.badge,
      };
    });

  const selectedDefaultTabs = defaultTab ? parseInt(defaultTab) : 0;

  const [activeTabIndex, setActiveTabIndex] = useState(parseInt(tab));

  const attribute = useColor();
  const tabsLabelsRef = useRef();
  const openTab = (label) => {
    if (canUpdate) {
      navigate(`${baseTabLink}/${codeWorkSessionId}/${label}`);
    } else {
      navigate(`${baseTabLink}/${codeWorkSessionId}/${label}`);
    }
  };

  const sectionToShow = sections.filter((item) => !item.doNotShow);

  useEffect(() => {
    if (activeTabIndex >= sectionToShow.length) {
      setActiveTabIndex(Math.max(0, sectionToShow.length - 1));
    }
  }, [activeTabIndex, sectionToShow.length]);

  useEffect(() => {
    setActiveTabIndex(parseInt(tab));
  }, [tab]);

  const showNavigation = true;
  return (
    <TabsWrapper>
      {showNavigation && (
        <TabsLabels ref={tabsLabelsRef} style={{ ...tabsLabelsStyle }}>
          {labels.map((label, index) => (
            <Label
              key={index}
              style={{ ...labelStyle }}
              color={attribute.text}
              isactive={activeTabIndex === index}
              className={activeTabIndex === index ? "activeTabIndex" : ""}
              onClick={() => openTab(index)}>
              {label.name}
            </Label>
          ))}
        </TabsLabels>
      )}

      <TabSectionWrapper
        style={{
          height: showNavigation ? "calc(100% - 40px" : "100%",
        }}>
        {sectionToShow.map((section, index) => {
          if (index === activeTabIndex) {
            return (
              <Tab isactive={true} key={section._id}>
                <CodeFileWrapper
                  isReadOnly={isReadOnly}
                  canUpdate={canUpdate}
                  updateProjectProfile={updateProjectProfile}
                  language={language}
                  value={section.code}
                  filename={section.filename}
                  codeWorkSessionId={codeWorkSessionId}
                  fileId={section._id}
                  codeWorkSessionApiRef={codeWorkSessionApiRef}
                  isEntryPoint={section.isEntryPoint}
                />
              </Tab>
            );
          } else {
            return null;
          }
        })}
      </TabSectionWrapper>
    </TabsWrapper>
  );
};

export default FileTabs;
