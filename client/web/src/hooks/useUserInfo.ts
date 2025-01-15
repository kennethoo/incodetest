import { useEffect, useState } from "react";
import meettumApi from "ApiServiveGateWay/apiConfig";
import { useSelector, useDispatch } from "react-redux";

function useUserInfo(query) {
  const queryKey = JSON.stringify(query);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const usernameLists = useSelector((state: any) => state.usernameLists);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const signal: any = controller.signal;

    const fetchData = async () => {
      if (userInfo) {
        return;
      }
      const userFind = usernameLists.find((item) => {
        return item.queryKey === queryKey;
      });
      if (!userFind) {
        setIsLoading(true);
        const { data } = await meettumApi.get(
          `/api/v1/search/user/${queryKey}`,
          signal,
        );

        if (data.succeeded) {
          data.queryKey = queryKey;
          const list = [...usernameLists, { ...data }];
          dispatch({ type: "UPDATE_USERNAME", value: list });
        } else {
          setUserInfo(data);
          setIsLoading(false);
        }
      } else {
        setUserInfo(userFind);
      }
    };

    if (queryKey && queryKey !== "{}") {
      fetchData();
    }
    return () => controller.abort();
  }, [queryKey, userInfo, usernameLists]);

  useEffect(() => {
    const userFind = usernameLists.find((item) => item.queryKey === queryKey);
    if (userFind) {
      setUserInfo(userFind);
      setIsLoading(false);
    }
  }, [usernameLists]);

  return {
    userInfo,
    isLoading,
  };
}
export default useUserInfo;
