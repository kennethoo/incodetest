import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useProjects } from "hooks/useProjects";
import { useParams } from "react-router-dom";
import EditProject from "Components/project/EditProject";
import DeleteProject from "Components/project/DeleteProject";
import { useNavigate } from "react-router-dom";
import Mainplayground from "Components/PlaygroundV2/Mainplayground";
import CreateNewFile from "Components/PlaygroundV2/CreateNewFile";
import SideProjectNavigation from "Components/PlaygroundV2/SideProjectNavigation";
import useUser from "hooks/useUser";
import { projectApi } from "ApiServiveGateWay/ProjectApi";
import { CodeWorkSessionApi } from "ApiServiveGateWay/CodeWorkSession";
import realtimeBoardSocket from "realtimeBoardSocket";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const PlaygroundContainer = styled.div`
  height: 100%;
  width: calc(100% - 200px);
`;

const ProjectsPlaygroud = (): JSX.Element => {
  const { user } = useUser();
  const { projectId, tab } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeledModal, setIsDeledModal] = useState(false);
  const [iscreateNewFileModalOpen, setIscreateNewFileModalOpen] =
    useState(false);

  const codeWorkSessionApiRef = useRef(
    new CodeWorkSessionApi({ codeWorkSession: {}, isProject: true })
  );

  const [project, setProject] = useState(null);
  const { projectsResult, isLoading } = useProjects({
    action: projectApi.GET_PROJECT_BY_ID,
    payload: {
      projectId,
    },
  });
  const [files, setFiles] = useState(project?.projectFiles ?? []);
  useEffect(() => {
    if (!isLoading) {
      const { project } = projectsResult;

      if (!project) {
        navigate(`/app/project`);
      }
      if (project.userId !== user.userId && !project.isPublic) {
        navigate(`/app/project`);
        return;
      }
      setProject(project);
      setFiles(project.projectFiles);
      const defaultFile = project.projectFiles.findIndex(
        (file) => file.isEntryPoint
      );

      if (tab === undefined) {
        navigate(`/app/project/${project._id}/${defaultFile}`);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    realtimeBoardSocket.on("codeWorkSession:event:update", (result) => {
      const { eventName, payload } = result;
      if (eventName === codeWorkSessionApiRef.current.EVENT_NEW_FILE) {
        const { files } = payload;
        setFiles(files);
      } else if (eventName === codeWorkSessionApiRef.current.EVENT_NEW_TITLE) {
        const { title } = payload;
        setProject((prev) => {
          const update = { ...prev };
          update.title = title;
          return { ...update };
        });
      }
    });

    return () => {
      realtimeBoardSocket.off("codeWorkSession:event:update");
    };
  }, []);

  return (
    <Container>
      {project && (
        <SideProjectNavigation
          setIsModalOpen={setIsModalOpen}
          setIsDeledModal={setIsDeledModal}
          setIscreateNewFileModalOpen={setIscreateNewFileModalOpen}
          project={project}
          files={files}
        />
      )}

      <PlaygroundContainer>
        {project && files.length && (
          <Mainplayground
            files={files}
            setFiles={setFiles}
            setProject={setProject}
            project={project}
            language={project.language}
          />
        )}
      </PlaygroundContainer>

      {project && isModalOpen && (
        <EditProject
          setProject={setProject}
          setIsModalOpen={setIsModalOpen}
          project={project}
          codeWorkSessionApiRef={codeWorkSessionApiRef}
        />
      )}
      {project && isDeledModal && (
        <DeleteProject setIsDeledModal={setIsDeledModal} project={project} />
      )}
      {project && iscreateNewFileModalOpen && (
        <CreateNewFile
          setFiles={setFiles}
          setIsModalOpen={setIscreateNewFileModalOpen}
          project={project}
          codeWorkSessionApiRef={codeWorkSessionApiRef}
        />
      )}
    </Container>
  );
};

export default ProjectsPlaygroud;
