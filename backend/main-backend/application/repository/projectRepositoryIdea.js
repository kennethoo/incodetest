import mongoose from "mongoose";
import { remoteCode } from "../../engine-application/remoteCode.js";
import projectApi from "../projectsApi.js";
import idealist from "./idea.js";
const Schema = mongoose.Schema;
const idea = new Schema({
  creatorId: String,
  title: String,
  description: String,
  languages: [{ type: String }],
  difficulty: String,
  cloneCount: Number,
  tags: [String],
  likes: Number,
  shortDescription: String,
});

/** */

const ProjectRepositoryIdea = mongoose.model("projectRepositoryidea", idea);

class ProjectRepositoryIdeaApi {
  constructor() {
    this.CREATE_NEW_PROJECT_IDEA = "create_new_project_idea";
    this.CLONE_PROJECT_IDEA = "clone_project_idea";
    this.UPDATE_PROJECT_TITLE = "update_project_title";
    this.DELETE_PROJECT = "delete_project";
  }

  ///Main function

  create = async (payload) => {
    const result = await ProjectRepositoryIdea.create({
      ...payload,
      cloneCount: 0,
    });
    return result;
  };

  delete = async (payload) => {
    const { _id } = payload;
    const result = await ProjectRepositoryIdea.deleteOne({ _id });
    return result;
  };

  get = async (query) => {
    const { limit, skip, filter } = query;
    const projects = await ProjectRepositoryIdea.find(filter)
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip);
    return { succeeded: true, projects };
  };

  ///end of main  function

  handleAction = (actionPayload) => {
    const { action, payload } = actionPayload;
    if (action == this.CREATE_NEW_PROJECT_IDEA) {
      return this.create(payload);
    } else if (action == this.DELETE_PROJECT) {
      return this.delete(payload);
    } else if (action === this.CLONE_PROJECT_IDEA) {
      return this.cloneProject(payload);
    } else if (action === this.UPDATE_PROJECT_EXISTING_FILE) {
      return this.updateCurrentFileCode(payload);
    } else if (action === this.DELETE_PROJECT_FILE) {
      return this.deleteFile(payload);
    } else if (action === this.UPDATE_PROJECT_TITLE) {
      return this.updateTitle(payload);
    }
    return { succeeded: false, errorMessage: "not valid action" };
  };

  //clone a project

  cloneProject = async (payload) => {
    const { projectId, userId, language } = payload;
    const projectIdea = await ProjectRepositoryIdea.findOne({ _id: projectId });
    if (!projectIdea) {
      return { succeeded: false, errorMessage: "Invalid project" };
    }

    const projectFiles = [
      ...this.getDefaultProJectFile(language),
      {
        filename: "explain.meetcode",
        code: projectIdea.description,
        isEntryPoint: false,
      },
    ];
    const payloadProject = {
      userId,
      title: projectIdea.title,
      description: projectIdea.description,
      language,
      projectFiles,
      isGeneatedFromClone: true,
    };
    projectIdea.save();
    return await projectApi.createClone(payloadProject);
  };

  // helpeer function
  getDefaultProJectFile = (language) => {
    if (language == remoteCode.JAVASCRIPT) {
      return [
        {
          filename: "main.js",
          code: "",
          isEntryPoint: true,
        },
      ];
    } else if (language == remoteCode.PYTHON) {
      return [
        {
          filename: "main.py",
          code: "",
          isEntryPoint: true,
        },
      ];
    } else if (language == remoteCode.JAVA) {
      return [
        {
          filename: "Main.java",
          code: "",
          isEntryPoint: true,
        },
      ];
    } else if (language == remoteCode.GO) {
      return [
        {
          filename: "main.go",
          code: "",
          isEntryPoint: true,
        },
      ];
    } else {
      return [];
    }
  };

  buildRepository = async () => {
    const creatorId = "meetcode";
    for (let idea of idealist) {
      await this.create({
        ...idea,
        creatorId,
      });
    }
  };
  build = async () => {
    await ProjectRepositoryIdea.deleteMany({});
    this.buildRepository();
  };
}

const projectRepositoryIdeaApi = new ProjectRepositoryIdeaApi();
projectRepositoryIdeaApi.build();

export default projectRepositoryIdeaApi;
