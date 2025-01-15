import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div``;
const ContainerLogger = styled(motion.div)`
  & p {
    word-break: keep-all; /* Prevents word breaks */
    overflow-wrap: break-word; /* Allows long words to wrap to next line if needed */
    white-space: normal; /* Ensures normal text wrapping */
  }
`;
function Logger() {
  const dispatch = useDispatch();
  const closeLogger = () => {
    dispatch({
      type: "UPDATE_APPLICATION_LOGGER",
      value: { messageToLog: "", isErrorMessage: false },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      closeLogger();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  });
  const isErrorMessage = useSelector(
    (state: { isErrorMessage: boolean }) => state.isErrorMessage,
  );
  const message = useSelector(
    (state: { messageToLog: string }) => state.messageToLog,
  );
  const classNameMessage = isErrorMessage
    ? "error-message"
    : "succeeded-message";
  return (
    <Container className="applition-error-logger-wraper">
      <ContainerLogger
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          mass: 1,
          delay: 0.2,
        }}
        className={`message-to-log ${classNameMessage}`}
      >
        <button onClick={closeLogger} className="close-that">
          <IoCloseSharp />
        </button>
        <p>{message}</p>
      </ContainerLogger>
    </Container>
  );
}

export default Logger;
