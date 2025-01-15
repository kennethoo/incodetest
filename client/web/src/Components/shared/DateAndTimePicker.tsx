import { useState, useRef, useEffect } from "react";
import DatePicker from "Components/DatePicker";
import OptionsSchedule from "Components/OptionsSchedule";
import moment from "moment";
import { meetingDisplayFormatWithNoTime } from "utility/momentFormat";
import { BsFillCalendarDateFill } from "react-icons/bs";
import styled from "styled-components";
const Container = styled.div``;
function DateAndTimePicker({
  date,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  setDate,
}) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const container: any = useRef();

  const addDate = (date) => {
    setDate(date);
    setIsDatePickerOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (container.current && !container.current.contains(event.target)) {
      setIsDatePickerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <Container>
      <div className="pick-time-wraper">
        <div
          onClick={() => {
            setIsDatePickerOpen(!isDatePickerOpen);
          }}
          className="timer-pick"
        >
          <div
            style={{
              height: "40px",
              display: "flex",
              marginRight: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BsFillCalendarDateFill />
          </div>
          {moment(date).format(meetingDisplayFormatWithNoTime)}
        </div>
        {isDatePickerOpen && (
          <div ref={container} className="wraprt-date-picker">
            <DatePicker date={date} addDate={addDate} />
          </div>
        )}
      </div>

      <div
        style={{ minHeight: "40px", position: "relative" }}
        className="wraper-select-time"
      >
        <div className="wraprr-wr">
          <OptionsSchedule
            time={startTime}
            updateTime={setStartTime}
            canEdit={true}
          />
        </div>
        <div className="wraprr-wr">
          <OptionsSchedule
            time={endTime}
            updateTime={setEndTime}
            canEdit={true}
          />
        </div>
      </div>
    </Container>
  );
}

export default DateAndTimePicker;
