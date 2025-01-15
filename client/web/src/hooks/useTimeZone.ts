import useUser from "hooks/useUser";
import moment from "moment";
function useTimeZone() {
  const { user } = useUser();

  return user.timeZone ? user.timeZone : moment.tz.guess();
}
export default useTimeZone;
