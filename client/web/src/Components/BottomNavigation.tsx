/* eslint-disable react/jsx-no-duplicate-props */

import { NavLink } from "react-router-dom";
import { BsChatDots } from "react-icons/bs";

import { FaHome, FaCalendar } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { RiGroupLine } from "react-icons/ri";
import { FaLink } from "react-icons/fa";
import styled from "@emotion/styled";

const MissedMessageContainer = styled.div`
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  border-radius: 50%;
  color: white;
  position: absolute;
  background-color: #fa3e3e;
  top: -5px;
  z-index: 1;
  right: -10px;
`;
function BottomNavigation() {
  const count = 0;
  const showBadge = count > 0;

  return (
    <div id="navigation">
      <NavLink to="/app/home" className="navvf">
        <div className="icon-box">
          <FaHome />
        </div>
      </NavLink>

      <NavLink to="/app/calendar" className="navvf">
        <div className="icon-box">
          <FaCalendar />
        </div>
      </NavLink>
      <NavLink to="/app/profile" className="navvf">
        <div className="icon-box">
          <RiGroupLine />
        </div>
      </NavLink>
      <NavLink to="/app/chat" className="navvf">
        <div className="icon-box">
          {showBadge && (
            <MissedMessageContainer>{count}</MissedMessageContainer>
          )}
          <BsChatDots />
        </div>
      </NavLink>
      <NavLink to="/app/setting" className="navvf">
        <div className="icon-box">
          <FiSettings />
        </div>
      </NavLink>
    </div>
  );
}

export default BottomNavigation;
