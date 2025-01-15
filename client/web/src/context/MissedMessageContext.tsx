import React, { useState, useRef, useEffect } from "react";
import Loading from "Components/loading";
import SideNavigation from "Components/SideNavigation";
import styled from "styled-components";
import { Outlet, Navigate } from "react-router-dom";
import useCheckLogin from "hooks/useCheckLogin";

export const MissedMessageContext = React.createContext({});

export const MissedMessageProvider = ({ children }) => {
  const [sharedValue, setSharedValue] = useState({});
  const [count, setCount] = useState(0);
  const dataToProcess = useRef([]);
  const updateValue = ({ spaceId, count }) => {
    dataToProcess.current.push({ spaceId, count });
    setCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    const newValue = {};
    for (let data of dataToProcess.current) {
      const { spaceId, count } = data;
      newValue[spaceId] = count;
    }
    dataToProcess.current = [];
    setSharedValue(newValue);
  }, [count]);
  return (
    <MissedMessageContext.Provider value={{ value: sharedValue, updateValue }}>
      {children}
    </MissedMessageContext.Provider>
  );
};
