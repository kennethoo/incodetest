import { useEffect, useState } from "react";
import useUser from "hooks/useUser";
import NotificationMannager from "ApiServiveGateWay/notification";
function useNotification() {
  const [notification, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const notificationMannager = new NotificationMannager(user?.userId);
  useEffect(() => {
    const fecthData = async () => {
      setIsLoading(true);
      const { succeeded, result } =
        await notificationMannager.getNoticationCont({
          notifiyiEmail: user?.email,
        });
      setIsLoading(false);
      if (succeeded) {
        setNotification(result);
      }
    };
    fecthData();
  }, []);
  return {
    notification,
    isLoading,
  };
}

export default useNotification;
