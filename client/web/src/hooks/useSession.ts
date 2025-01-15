import { useState, useEffect } from "react";
import useUser from "hooks/useUser";
import { codeSessionApi } from "ApiServiveGateWay/CodeSession";
export function useSession({ action, payload }) {
  const { user } = useUser();
  const [sessionsResult, setProjects] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [pagination, setPagination] = useState({ limit: 100, skip: 0 });
  const [canFetch, setCanFetch] = useState(true);
  const getSession = async (pagination) => {
    const query = {
      action,
      payload: { ...payload, limit: pagination.limit, skip: pagination.skip },
    };
    return await codeSessionApi.getSession(query);
  };
  const fetchData = async (pagination) => {
    const result = await getSession(pagination);
    setProjects(result);
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

  return { sessionsResult, isLoading, pagination, refetch, canFetch };
}
