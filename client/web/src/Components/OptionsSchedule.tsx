import { useState, useRef, useEffect } from "react";
import useUser from "hooks/useUser";
import { convertTimeToLocal } from "utility/convertTimeToLocal";

import { generateTimeSlots } from "utility/availabilityMannager";
function OptionsSchedule({
  canEdit,
  updateTime,
  time,
}: {
  time: string;
  updateTime: Function;
  canEdit?: boolean;
}) {
  const container = useRef(null);
  const optionContainer = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const options = generateTimeSlots();
  const [isOn, setIsOn] = useState(false);
  const { user } = useUser();
  const handleClick = (time) => {
    if (!canEdit) return;
    updateTime(time);
    setScrollTop(optionContainer.current.scrollTop);
    setIsOn(false);
  };
  const handleClickOn = () => {
    if (!canEdit) return;
    setIsOn(!isOn);
  };

  const handleClickOutside = (event: any) => {
    if (container.current && !container.current.contains(event.target)) {
      setScrollTop(optionContainer.current.scrollTop);
      setIsOn(false);
    }
  };

  useEffect(() => {
    optionContainer.current.scrollTop = scrollTop;
  }, [scrollTop]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{ zIndex: !isOn && "1" }}
      ref={container}
      className="options-schedule"
    >
      <div
        onClick={() => {
          handleClickOn();
        }}
        className={`selcteed-seel ${isOn ? "active" : ""}`}
      >
        {convertTimeToLocal(time, user.timezone)}
      </div>

      <div
        ref={optionContainer}
        className={`options-days ${isOn ? "active" : ""}`}
      >
        {options.map((item, index) => {
          return (
            <div
              onClick={() => {
                handleClick(item);
              }}
              key={index}
              className="selcteed-seel"
            >
              {convertTimeToLocal(item, user.timezone)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OptionsSchedule;
