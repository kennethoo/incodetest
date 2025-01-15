import { useState, useEffect } from "react";
import useUser from "hooks/useUser";
import { apiGateway } from "ApiServiveGateWay/apiGateway";

export function useRepository(speciFicFilter = {}) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [pagination, setPagination] = useState({ limit: 100, skip: 0 });
  const [canFetch, setCanFetch] = useState(true);
  const getProjects = async (pagination) => {
    const query = {
      filter: { ...speciFicFilter },
      limit: pagination.limit,
      skip: pagination.skip,
    };
    const { projects } = await apiGateway.getRepository(query);
    return projects;
  };
  const fetchData = async (pagination) => {
    const projects = await getProjects(pagination);
    setProjects(projects);
    setIsloading(false);
  };

  useEffect(() => {
    fetchData(pagination);
  }, []);

  const refetch = async (limit, skip) => {
    setPagination({ limit, skip });
    const projects = await getProjects({ limit, skip });
    if (!canFetch) {
      return;
    }
    if (!projects.length) {
      setCanFetch(false);
    }
    return projects;
  };

  return { projects, isLoading, pagination, refetch, canFetch };
}
