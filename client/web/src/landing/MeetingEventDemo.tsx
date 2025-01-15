import calculateEventPosition from "utility/calculateEventPosition";

function MeetingEventDemo({ meetingSession }) {
  const ENDED_MEETIND_BACKGROUND = "#7B7D7D";
  const CONFIRM_MEETIND_BACKGROUND = "#3498DB";
  const { title, startTime, endTime, isActive } = meetingSession;
  const userStartIme = startTime;
  const time = userStartIme.split(" ")[1];

  const TimeE = endTime.split(" ")[1];
  const styleEvent = {
    top: calculateEventPosition(time) - 60,
    backgroundColor: "",
    backdropFilter: "none",
  };

  if (!isActive) {
    styleEvent.backgroundColor = ENDED_MEETIND_BACKGROUND;
  } else if (isActive) {
    styleEvent.backgroundColor = CONFIRM_MEETIND_BACKGROUND;
  }
  return (
    <div style={styleEvent} className="event-block">
      <div className="title-of-meeting">{title}</div>
      <div className="timer-bott">
        <span>{time}</span>
        <span>{TimeE}</span>
      </div>
    </div>
  );
}

export default MeetingEventDemo;
