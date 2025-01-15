import { useState, useEffect } from "react";
import useUser from "hooks/useUser";
import { apiGateway } from "ApiServiveGateWay/apiGateway";

export function useAnalitic(defaultFilter = {}) {
  const { user } = useUser();
  const [logs, setMessages] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [pagination, setPagination] = useState({ limit: 10, skip: 0 });
  const [canFetch, setCanFetch] = useState(true);
  const getAnalitic = async (pagination) => {
    const query = {
      filter: { userId: user.userId, ...defaultFilter },
      limit: pagination.limit,
      skip: pagination.skip,
    };
    const { logs } = await apiGateway.getAnalytic(query);
    return logs;
  };
  const fetchData = async (pagination) => {
    const logs = await getAnalitic(pagination);
    setMessages(logs);
    setIsloading(false);
  };

  useEffect(() => {
    fetchData(pagination);
  }, []);

  const refetch = async (limit, skip) => {
    setPagination({ limit, skip });
    const logs = await getAnalitic({ limit, skip });
    if (!canFetch) {
      return;
    }
    if (!logs.length) {
      setCanFetch(false);
    }
    return logs;
  };

  return { logs, isLoading, pagination, refetch, canFetch };
}
