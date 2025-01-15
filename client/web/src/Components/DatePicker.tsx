import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import moment from "moment";
import { dateFormatWithNoTime } from "utility/momentFormat";
import useTimeZone from "hooks/useTimeZone";
import { buildCalendar, populateDays } from "utility/calendar";
function DatePicker({ date, addDate }) {
  const toTimeZone = useTimeZone();
  const [currentMonth, setCurrentMonth] = useState(moment.tz(toTimeZone));

  function prevMonth() {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
  }

  function nextMonth() {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
  }

  // create an array of all the days to display in the calendar
  const days = populateDays(currentMonth);

  const calendarMatrix = buildCalendar(currentMonth, days);

  return (
    <div
      style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)" }}
      className="calendar-box"
    >
      <div
        style={{ border: "0px", height: "45px", paddingLeft: "10px" }}
        className="booking-session-tilte"
      >
        <div
          style={{ display: "flex", width: "100%", height: "35px" }}
          className="book-wrapper"
        >
          <button
            onClick={prevMonth}
            className="close-that"
            style={{ minWidth: "35px", height: "35px" }}
          >
            <IoIosArrowBack />
          </button>
          <button
            style={{ minWidth: "35px", height: "35px" }}
            onClick={nextMonth}
            className="close-that"
          >
            <IoIosArrowForward />
          </button>
          <p
            style={{
              width: "100%",
              fontSize: "15px",
              alignItems: "center",

              display: "flex",
              marginLeft: "0px",
            }}
            className="currentMont"
          >
            {currentMonth.clone().format("MMM  YYYY")}
          </p>
        </div>
      </div>

      <div className="calendar-render-Book">
        {calendarMatrix.map((weekRow, weekIndex) => (
          <div className="calendar-row" key={weekIndex}>
            {weekRow.map((dayInfo) => {
              const key = dayInfo.currentDay.format(dateFormatWithNoTime);

              return (
                <DateOption
                  addDate={addDate}
                  date={date}
                  key={key}
                  currentDay={dayInfo.currentDay}
                  currentMonth={dayInfo.currentMonth}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DatePicker;

function DateOption({ addDate, date, currentDay, currentMonth }) {
  const todayClass =
    currentDay.format(dateFormatWithNoTime) === date ? "today" : "";
  const classToSow =
    currentDay.month() === currentMonth.month()
      ? "current-month"
      : "other-month";
  const isAvailableForBookingClass = true;
  const toTimeZone = useTimeZone();

  const hanldeBooking = () => {
    if (!isAvailableForBookingClass) return;
    if (todayClass === "today") {
      addDate(moment.tz(toTimeZone).format(dateFormatWithNoTime));
    } else {
      addDate(currentDay.format(dateFormatWithNoTime));
    }
  };
  const seleectedDateStyle =
    todayClass === "today"
      ? {
          backgroundColor: "#6f56e5",
        }
      : {};

  return (
    <button
      onClick={() => {
        hanldeBooking();
      }}
      style={{ margin: "3px", fontSize: "12px", ...seleectedDateStyle }}
      className={`date_in_calendar  ${classToSow} ${todayClass} ${isAvailableForBookingClass} `}
    >
      <p>{currentDay.format("D")}</p>
    </button>
  );
}
