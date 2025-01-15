import { useState, useEffect } from "react";
import UserMannager from "ApiServiveGateWay/userMannager";

import useUser from "hooks/useUser";
function useSubscription() {
  const [isLoading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState({});
  const { user } = useUser();
  const userMannager = new UserMannager(user.userId);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await userMannager.getUserSubScription();
      setSubscription(result);
      setLoading(false);
    };
    fetchData();
  }, []);
  return { subscription, isLoading };
}
export default useSubscription;
