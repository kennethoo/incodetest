import { dateFormat } from "utility/momentFormat";
import { convertUtcToTimezone } from "utility/convertUtcToTimezone";
import calculateEventPosition from "utility/calculateEventPosition";
import { convertTimeToLocal } from "utility/convertTimeToLocal";
import { motion, useInView } from "framer-motion";
import useTimeZone from "hooks/useTimeZone";
import { useRef } from "react";
import taskReminderMannagerApi from "ApiServiveGateWay/TaskReminderMannager";

function TaskReminderInfo({ taskReminder, index }) {
  const timeZone = useTimeZone();
  const { startTime, title, taskStatus } = taskReminder;

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const userStartIme = convertUtcToTimezone(startTime, timeZone, dateFormat);
  const time = userStartIme.split(" ")[1];

  const displayTitle = title;
  const styleEvent = {
    top: calculateEventPosition(time) - 60,
    backgroundColor: "rgba(233, 115, 49,0.5)",
    border: "2px solid  rgba(233, 115, 49,1)",
  };

  if (taskStatus === taskReminderMannagerApi.COMPLETED) {
    styleEvent.backgroundColor = "rgba(123, 125, 125,0.5)";
    styleEvent.border = "2px solid  rgba(123, 125, 125,1)";
  }

  const animationVariants = {
    initial: {
      opacity: 0,
      y: 20, // Adjust the value to control the slide distance
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // Adjust the duration as needed
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate={!!isInView && "animate"}
      variants={animationVariants}
      style={styleEvent}
      ref={containerRef}
      className="event-block"
    >
      <div className="title-of-meeting">{displayTitle}</div>
      <div className="timer-bott">
        <span>{convertTimeToLocal(time, timeZone)}</span>
      </div>
    </motion.div>
  );
}

export default TaskReminderInfo;
