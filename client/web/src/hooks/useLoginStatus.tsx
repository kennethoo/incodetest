import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import meettumApi from "ApiServiveGateWay/apiConfig";
import socket from "realtimeBoardSocket";

const userLoginEnum = {
  checking: "checking",
  notLogin: "notLogin",
  login: "login",
};
function useLoginStatus() {
  const userLoginStatus = useSelector((state: any) => state.userLoginStatus);
  const isLogin = userLoginStatus === userLoginEnum.login;

  return { userLoginStatus, userLoginEnum, isLogin };
}
export default useLoginStatus;
