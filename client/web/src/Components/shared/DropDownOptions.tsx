import React, { useState, useRef, useEffect } from "react";
import useColor from "hooks/useColor";
import styled from "styled-components";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import useResizeObserver from "hooks/layout/useResizeObserver";
const Container = styled.div`
  position: relative;
  width: 95%;
  height: 35px;
`;

const DisplayItem = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 5px;
  text-transform: capitalize;
  border: 1px solid var(--main-bg-cool-rgb);
`;
const CurrentItem = styled.div`
  position: relative;
  width: calc(100% - 40px);
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
  color: var(--text);
`;
const Icon = styled.div`
  position: relative;

  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--text);
`;

const OptionsList = styled.div`
  position: absolute;
  border: 1px solid var(--main-bg-cool-rgb);
  z-index: 10;
  background-color: var(--main-bg-pagebox);
  border-radius: 5px;
  padding: 5px;
`;
const Option = styled.button`
  border: 0;
  height: 35px;
  width: 100%;

  text-align: start;
  padding-left: 20px;
  background-color: transparent;
  cursor: pointer;
  color: var(--text);
  text-transform: capitalize;

  border-radius: 5px;
  &:hover {
    background-color: var(--main-bg-cool-rgb);
  }
`;
export default function DropDownOptions({
  options,
  setSelectedOption,
  canEdit,
  selectedLanguage,
}) {
  const [isOpen, setIsOption] = useState(false);
  const handleChange = (item) => {
    setSelectedOption(item);

    setIsOption(false);
  };
  const containerRef: any = useRef();
  const { dimensions } = useResizeObserver(containerRef);
  const width = dimensions?.width ? `${dimensions?.width}px` : "0px";
  const handleClickOutside = (event: any) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOption(false);
    } else {
      // Handle logic when the click is inside the container
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <Container ref={containerRef}>
      <DisplayItem
        style={{ border: isOpen ? "0px" : "" }}
        onClick={() => {
          if (!canEdit) {
            return;
          }
          setIsOption(!isOpen);
        }}
      >
        <CurrentItem>{selectedLanguage}</CurrentItem>
        <Icon>{isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}</Icon>
      </DisplayItem>

      {isOpen && (
        <OptionsList style={{ width }}>
          {options.map((item, index) => {
            return (
              <Option
                key={index}
                onClick={() => {
                  handleChange(item);
                }}
              >
                {item}
              </Option>
            );
          })}
        </OptionsList>
      )}
    </Container>
  );
}
