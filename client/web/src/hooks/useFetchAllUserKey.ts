import { useState, useEffect } from "react";
import userWalletApi from "ApiServiveGateWay/userWalletApi";

function useFetchAllUserKey() {
  const [userKeys, setUserKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { userKeys } = await userWalletApi.getAllUserKeys();
      setUserKeys(userKeys);
    };
    fetchData();
  }, []);

  return { userKeys };
}
export default useFetchAllUserKey;
