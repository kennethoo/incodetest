import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import meettumApi from "ApiServiveGateWay/apiConfig";
import realtimeBoardSocket from "realtimeBoardSocket";
import useUser from "hooks/useUser";
const userLoginEnum = {
  checking: "checking",
  notLogin: "notLogin",
  login: "login",
};
function useCheckLogin() {
  const dispatch = useDispatch();
  const { user } = useUser();
  const userLoginStatus = useSelector((state: any) => state.userLoginStatus);
  const [currentStatus, setCurrentStatus] = useState(userLoginStatus);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const checkLogin = async () => {
      const { data } = await meettumApi.get("/api/check-login", {
        withCredentials: true,
        signal,
      });
      const { isLogIn, user } = data;
      if (isLogIn) {
        
        realtimeBoardSocket.auth = { userId: user.userId };
        await realtimeBoardSocket.connect();
          dispatch({
          type: "UPDATE_USER",
          value: { ...user, isTempUser: false },
        });
        dispatch({
          type: "UPDATE_USER_LOGIN_STATUS",
          value: userLoginEnum.login,
        });
        setCurrentStatus(userLoginEnum.login);


      } else {
        dispatch({ type: "UPDATE_USER", value: { email: "" } });
        dispatch({
          type: "UPDATE_USER_LOGIN_STATUS",
          value: userLoginEnum.notLogin,
        });
        setCurrentStatus(userLoginEnum.notLogin);
      }
      return () => controller.abort();
    };

    if (!user) {
      checkLogin();
    }
  }, []);

  return { currentStatus, userLoginEnum };
}
export default useCheckLogin;
