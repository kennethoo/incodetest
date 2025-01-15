import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import useColor from "hooks/useColor";

interface TabProps {
  sections: any;
  defaultTab?: string;
  tabsLabelsStyle?: any;
  labelStyle?: any;
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

  margin-bottom: 10px;
  overflow: scroll;
  padding: 5px;
  background-color: var(--main-bg-cool-rgb);
  box-shadow: inset 0px 0px 10px var(--main-bg-cool-rgb);
`;

const Label = styled(({ isactive, ...rest }) => <div {...rest} />)`
  box-sizing: border-box;
  color: ${({ color, isactive }) => (isactive ? "white" : color)};
  padding: 2px 10px 2px 10px;
  display: inline-flex;
  cursor: pointer;
  position: relative;
  border-radius: 100px;
  z-index: 2;
  text-transform: capitalize;
  background-color: ${({ isactive }) => (isactive ? "#6f56e5" : "transparent")};
  margin-right: 10px;
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

const Tabs = ({
  sections,
  defaultTab,
  tabsLabelsStyle = {},
  labelStyle = {},
}: TabProps) => {
  const labels = sections
    .filter((item) => !item.doNotShow)
    .map((item) => {
      return {
        name: item.label,
        badge: item?.badge,
      };
    });

  const selectedDefaultTabs = defaultTab ? defaultTab : 0;
  const [activeTabIndex, setActiveTabIndex] = useState(selectedDefaultTabs);

  const attribute = useColor();
  const tabsLabelsRef = useRef();
  const openTab = (label: string) => {
    setActiveTabIndex(label);
  };

  const sectionToShow = sections.filter((item) => !item.doNotShow);

  useEffect(() => {
    if (activeTabIndex >= sectionToShow.length) {
      setActiveTabIndex(Math.max(0, sectionToShow.length - 1));
    }
  }, [activeTabIndex, sectionToShow.length]);

  const showNavigation = labels.length > 1 || labels[0]?.badge > 1;
  return (
    <TabsWrapper>
      {showNavigation && (
        <TabsLabels ref={tabsLabelsRef} style={{ ...tabsLabelsStyle }}>
          {labels.map((label, index) => (
            <Label
              style={{ ...labelStyle }}
              color={attribute.text}
              isactive={activeTabIndex === index}
              className={activeTabIndex === index ? "activeTabIndex" : ""}
              key={label.name}
              onClick={() => openTab(index)}
            >
              {label.name}
              {label.badge ? ` ( ${label.badge} )` : ""}
            </Label>
          ))}
        </TabsLabels>
      )}

      <TabSectionWrapper
        style={{
          height: showNavigation ? "calc(100% - 40px" : "100%",
        }}
      >
        {sectionToShow.map((section, index) => {
          if (index === activeTabIndex) {
            return (
              <Tab isactive={activeTabIndex === index} key={section.label}>
                {section.tabComponent}
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

export default Tabs;
