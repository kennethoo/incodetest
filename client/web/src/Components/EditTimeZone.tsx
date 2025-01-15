import { useEffect, useState } from "react";
import allTimeZones from "utility/TimeZone";
import useDebounce from "hooks/useDebounce";
import UserMannager from "ApiServiveGateWay/userMannager";
import { useDispatch } from "react-redux";

import useTimeZone from "hooks/useTimeZone";

function EditTimeZone({ user }) {
  const toTimeZone = useTimeZone();
  const dispatch = useDispatch();
  const userMannager = new UserMannager(user.userId);
  const DELAY = 100;
  const [durationSelected, setDurationSelected] = useState(
    user.timeZone ?? toTimeZone,
  );
  const [isOn, setIsOn] = useState(false);
  const debouceSelected = useDebounce(durationSelected, DELAY);

  const selectedpeople = (timeZone) => {
    if (durationSelected === timeZone) {
      setDurationSelected(toTimeZone);
    } else {
      setDurationSelected(timeZone);
    }
    setIsOn(false);
  };

  useEffect(() => {
    const newProfileDetails = { ...user, timeZone: durationSelected };
    userMannager.updateUserProfile(newProfileDetails);
    dispatch({ type: "UPDATE_USER", value: newProfileDetails });
  }, [debouceSelected]);

  return (
    <div className="wraper0the-box style">
      <div
        style={{ borderBottom: "2px solid var(--main-bg-cool-rgb)" }}
        className="titlerr"
      >
        Time Zone
      </div>
      <div
        onClick={() => {
          setIsOn(!isOn);
        }}
        style={{
          paddingLeft: !isOn && "0px",
        }}
        className={`selcteed-seel ${isOn && "active"}`}
      >
        {durationSelected}
      </div>
      <div className={`options-days ${isOn && "active"}`}>
        {isOn &&
          allTimeZones.map((timeZone) => {
            return (
              <div
                onClick={() => {
                  selectedpeople(timeZone);
                }}
                key={timeZone}
                className="selcteed-seel"
              >
                {timeZone}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default EditTimeZone;
