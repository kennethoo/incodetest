import { useState, useEffect } from "react";
import useUser from "hooks/useUser";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import { projectApi } from "ApiServiveGateWay/ProjectApi";
export function useProjects({ action, payload }) {
  const { user } = useUser();
  const [projectsResult, setProjects] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [pagination, setPagination] = useState({ limit: 100, skip: 0 });
  const [canFetch, setCanFetch] = useState(true);
  const getProjects = async (pagination) => {
    const query = {
      action,
      payload: { ...payload, limit: pagination.limit, skip: pagination.skip },
    };
    return await projectApi.get(query);
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

  return { projectsResult, isLoading, pagination, refetch, canFetch };
}
