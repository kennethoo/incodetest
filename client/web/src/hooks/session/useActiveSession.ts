import { useState, useEffect } from "react";
import useUser from "hooks/useUser";
import { codeSessionApi } from "ApiServiveGateWay/CodeSession";
import { useSelector, useDispatch } from "react-redux";

export function useActiveSession() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const [activeSessionsResult, setActiveSessionsResult] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [pagination, setPagination] = useState({ limit: 10000000, skip: 0 });
  const [canFetch, setCanFetch] = useState(true);
  const activeSession = useSelector(
    (state: { activeSessions: any }) => state.activeSessions,
  );

  const addSession = (value) => {
    dispatch({
      type: "ADD_UPCOMING_MEETING_SESSION_TO_LIST",
      value: [...value, ...activeSession],
    });
  };

  const getSession = async (pagination) => {
    const query = {
      action: codeSessionApi.GET_ACTIVE_SESSION_BY_USERID,
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
    const { sessions } = result;
    addSession(sessions);
    setIsloading(false);
  };

  useEffect(() => {
    if (!activeSession.length) {
      fetchData(pagination);
    } else {
      setIsloading(false);
    }
  }, []);

  useEffect(() => {
    setActiveSessionsResult([...activeSession]);
  }, [activeSession]);

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
    activeSessionsResult,
    isLoading,
    pagination,
    refetch,
    canFetch,
    addSession,
  };
}
