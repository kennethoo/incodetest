import { useState, useEffect } from "react";
import useUser from "hooks/useUser";
import { codeSessionApi } from "ApiServiveGateWay/CodeSession";
import { useSelector, useDispatch } from "react-redux";

export function usePastSession() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const [pastSessionsResult, setPastSessionsResult] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [pagination, setPagination] = useState({ limit: 10000000, skip: 0 });
  const [canFetch, setCanFetch] = useState(true);

  const addSession = (value) => {
    dispatch({
      type: "ADD_PAST_MEETING_SESSION_TO_LIST",
      value: [...value],
    });
  };

  const getSession = async (pagination) => {
    const query = {
      action: codeSessionApi.GET_PAST_SESSION_BY_USERID,
      payload: {
        userId: user.userId,
        limit: pagination.limit,
        skip: pagination.skip,
      },
    };
    return await codeSessionApi.getSession(query);
  };
  const fetchData = async (pagination) => {
    const result = await getSession(pagination);
    console.log(result);
    const { sessions, succeeded } = result;

    if (succeeded) {
      setPastSessionsResult([...sessions]);
    } else {
      setPastSessionsResult([]);
    }

    setIsloading(false);
  };

  useEffect(() => {
    fetchData(pagination);
  }, []);

  const refetch = async (limit, skip) => {
    setPagination({ limit, skip });
    const sessions = await getSession({ limit, skip });
    if (!canFetch) {
      return;
    }
    if (!sessions.length) {
      setCanFetch(false);
    }
    return sessions;
  };

  return {
    pastSessionsResult,
    isLoading,
    pagination,
    refetch,
    canFetch,
    addSession,
  };
}
