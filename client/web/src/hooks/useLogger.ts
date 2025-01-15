import { useDispatch } from "react-redux";
import loggerApi from "ApiServiveGateWay/logger";
import moment from "moment";
import { dateFormat } from "utility/momentFormat";
function useLogger() {
  const dispatch = useDispatch();
  const logger = ({
    isErrorMessage,
    message,
    fileName,
    shouldDisplay = true,
  }) => {
    loggerApi.log({
      isError: isErrorMessage,
      platform: "web",
      date: moment.utc().format(dateFormat),
      message,
      fileName,
    });
    if (shouldDisplay) {
      dispatch({
        type: "UPDATE_APPLICATION_LOGGER",
        value: { messageToLog: message, isErrorMessage },
      });
    }
  };
  return logger;
}

export default useLogger;
