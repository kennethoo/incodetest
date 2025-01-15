import { useState, useEffect } from "react";
import userWalletApi from "ApiServiveGateWay/userWalletApi";

function useFetchUserBalance() {
  const [userKeys, setUserKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { userKeys } = await userWalletApi.getAllUserKeys();
      setUserKeys(userKeys);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { userKeys, isLoading };
}
export default useFetchUserBalance;
