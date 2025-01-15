import { useState, useEffect } from "react";
import UserMannager from "ApiServiveGateWay/userMannager";
import useUser from "hooks/useUser";

function usePaymentMethode() {
  const [isLoading, setLoading] = useState(true);
  const [paymentMethode, setSubscription] = useState({});
  const { user } = useUser();
  const userMannager = new UserMannager(user.userId);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { result } = await userMannager.getCustomerPaymentMethode();
      setSubscription(result);
      setLoading(false);
    };
    fetchData();
  }, []);
  return { paymentMethode, isLoading };
}
export default usePaymentMethode;
