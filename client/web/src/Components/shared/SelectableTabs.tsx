import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import useColor from "hooks/useColor";
import { IoCloseSharp } from "react-icons/io5";

interface TabProps {
  sections: any;
  defaultTab?: string;
  tabsLabelsStyle?: any;
  labelStyle?: any;
  forceTab?: any;
  setCurrentTab: any;
  setOuputSectionOpen: any;
}

const CloseSection = styled.div`
  min-width: 50px;
  max-width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

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
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  overflow: scroll;
  height: 40px;
  border-bottom: 1px solid var(--main-bg-cool-rgb);
`;

const Label = styled.div<{
  color: string;
  isactive: boolean;
  isPopularChoice: boolean;
}>`
  box-sizing: border-box;
  color: ${({ color, isactive }) => (isactive ? "white" : color)};

  display: inline-flex;
  cursor: pointer;
  width: 100%;
  position: relative;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0px 10px 0px 10px;
  z-index: 2;
  text-transform: capitalize;
  border-bottom: ${({ isactive }) =>
    isactive ? "1px solid #6f56e5" : "transparent"};
  &:hover {
    background-color: var(--main-bg-cool-rgb);
  }

  ${({ isPopularChoice, isactive }) =>
    isPopularChoice &&
    !isactive &&
    `
    
  text-align: center;

  padding: 10px;
  background: linear-gradient(45deg, #6ec3f4, #6f56e5, #e63946);
  color: transparent;
  width: 100%;
  width: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  border-radius: 5px;
  background-size: 400%;
  animation: glowEffect 10s linear infinite;
  

  @keyframes glowEffect {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 400% 0;
    }
  }
  `}
`;

const TabSectionWrapper = styled.div`
  box-sizing: border-box;
`;

const Tab = styled(({ isactive, ...rest }) => <div {...rest} />)`
  box-sizing: border-box;
  display: ${({ isactive }) => (isactive ? "flex" : "none")};
  visibility: ${({ isactive }) => (isactive ? "visible" : "hidden")};
  height: 100%;
  width: 100%;
`;

const SelectableTabs = ({
  sections,
  defaultTab,
  tabsLabelsStyle = {},
  labelStyle = {},
  forceTab = null,
  setCurrentTab,
  setOuputSectionOpen,
}: TabProps) => {
  const labels = sections
    .filter((item) => !item.doNotShow)
    .map((item) => {
      return {
        name: item.label,
        badge: item?.badge,
        isPopularChoice: item?.isPopularChoice,
      };
    });

  const selectedDefaultTabs = defaultTab ? defaultTab : 0;
  const [activeTabIndex, setActiveTabIndex] = useState(selectedDefaultTabs);

  const attribute = useColor();
  const tabsLabelsRef = useRef();
  const openTab = (label: string) => {
    setCurrentTab(null);
    setActiveTabIndex(label);
  };

  const sectionToShow = sections.filter((item) => !item.doNotShow);

  useEffect(() => {
    if (activeTabIndex >= sectionToShow.length) {
      setActiveTabIndex(Math.max(0, sectionToShow.length - 1));
    }
  }, [activeTabIndex, sectionToShow.length]);

  const showNavigation = labels.length > 1 || labels[0]?.badge > 1;

  useEffect(() => {
    if (forceTab) {
      const index = labels.findIndex((tab) => tab.name === forceTab);
      setActiveTabIndex(index);
    }
  }, [forceTab, labels]);

  return (
    <TabsWrapper>
      {showNavigation && (
        <TabsLabels ref={tabsLabelsRef} style={{ ...tabsLabelsStyle }}>
          <CloseSection
            onClick={() => {
              setOuputSectionOpen(false);
            }}>
            <IoCloseSharp />
          </CloseSection>
          {labels.map((label, index) => (
            <Label
              isPopularChoice={label.isPopularChoice}
              style={{ ...labelStyle }}
              color={attribute.text}
              isactive={activeTabIndex === index}
              className={activeTabIndex === index ? "activeTabIndex" : ""}
              key={label.name}
              onClick={() => openTab(index)}>
              {label.name}
              {label.badge ? ` ( ${label.badge} )` : ""}
            </Label>
          ))}
        </TabsLabels>
      )}

      <TabSectionWrapper
        style={{
          height: showNavigation ? "calc(100% - 50px" : "100%",
        }}>
        {sectionToShow.map((section, index) => {
          return (
            <Tab isactive={activeTabIndex === index} key={section.label}>
              {section.tabComponent}
            </Tab>
          );
        })}
      </TabSectionWrapper>
    </TabsWrapper>
  );
};

export default SelectableTabs;
