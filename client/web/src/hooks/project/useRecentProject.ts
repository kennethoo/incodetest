import { useState, useEffect } from "react";
import useUser from "hooks/useUser";
import { useSelector, useDispatch } from "react-redux";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import { projectApi } from "ApiServiveGateWay/ProjectApi";
export function useRecentProject() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const [recentProject, seRecentProject] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [pagination, setPagination] = useState({ limit: 10000000, skip: 0 });
  const [canFetch, setCanFetch] = useState(true);
  const recentProjects = useSelector(
    (state: { recentProject: any }) => state.recentProject,
  );

  const addRecent = (value) => {
    dispatch({
      type: "UPDATE_RECENT_PROJECT_LIST",
      value: [...value, ...recentProjects],
    });
  };

  const getRecentProject = async (pagination) => {
    const query = {
      action: projectApi.GET_ALL_PROJECT_BY_USERID,
      payload: { userId: user.userId },
    };
    const resullt = await projectApi.get(query);
    const { projects } = resullt;
    return projects;
  };
  const fetchData = async (pagination) => {
    const projects = await getRecentProject(pagination);
    addRecent(projects);
    setIsloading(false);
  };

  useEffect(() => {
    if (!recentProjects.length) {
      fetchData(pagination);
    } else {
      setIsloading(false);
    }
  }, []);

  useEffect(() => {
    seRecentProject([...recentProjects]);
  }, [recentProjects]);

  const refetch = async (limit, skip) => {
    setPagination({ limit, skip });
    const sessions = await getRecentProject({ limit, skip });
    if (!canFetch) {
      return;
    }
    if (!sessions.length) {
      setCanFetch(false);
    }
    return sessions;
  };

  return {
    recentProject,
    isLoading,
    pagination,
    refetch,
    canFetch,
    addRecent,
  };
}
