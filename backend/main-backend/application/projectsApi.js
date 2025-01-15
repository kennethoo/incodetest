import mongoose from "mongoose";
import moment from "moment";
import { remoteCode } from "../engine-application/remoteCode.js";
const Schema = mongoose.Schema;

const project = new Schema({
  userId: String,
  title: String,
  description: String,
  language: String,
  code: String,
  lastModified: String,
  isPublic: Boolean,
  isGeneatedFromClone: Boolean,
  projectFiles: [
    {
      filename: String,
      code: String,
      isEntryPoint: Boolean,
    },
  ],
});

const Project = mongoose.model("project", project);

class ProjectApi {
  constructor() {
    this.CREATE_NEW_PROJECT = "create_new_project";
    this.UPDATE_PROJECT_TITLE = "update_project_title";
    this.UPDATE_PROJECT_EXISTING_FILE = "update_project_existing_file";
    this.UPDATE_PROJECT_BY_CREATING_NEW_FILE =
      "update_project_by_creating_new_file";
    this.DELETE_PROJECT_FILE = "delete_project_file";
    this.DELETE_PROJECT = "delete_project";
    this.UPDATE_PROJECT_TO_PUBLIC = "update_project_to_public";
    this.GET_PROJECT_BY_ID = "get_project_by_id";
    this.GET_ALL_SESSION_BY_USERID = "get_all_project_by_userId";
  }

  ///Main function

  create = async (payload) => {
    const project = await Project.create({
      ...payload,
      isPublic: false,
      projectFiles: this.getDefaultProJectFile(payload.language),
      lastModified: moment.utc().format(),
    });
    return { succeeded: true, project };
  };

  delete = async (payload) => {
    const { _id } = payload;
    const result = await Project.deleteOne({ _id });
    return result;
  };

  get = async (query) => {
    const { limit, skip, filter } = query;
    const projects = await Project.find(filter)
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip);
    return { succeeded: true, projects };
  };

  ///end of main  function

  updateTitle = async (payload) => {
    const { projectId, title } = payload;
    await Project.findOneAndUpdate(
      { _id: projectId },
      { title, lastModified: moment.utc().format() },
    );
    return { succeeded: true };
  };
  updateToPublic = async (payload) => {
    const { projectId, isPublic } = payload;
    await Project.findOneAndUpdate(
      { _id: projectId },
      { isPublic, lastModified: moment.utc().format() },
    );
    return { succeeded: true };
  };
  createNewFile = async (payload) => {
    const { projectId, filename } = payload;
    const project = await Project.findById(projectId);
    const fileExists = project.projectFiles.some(
      (file) => file.filename === filename,
    );

    if (fileExists) {
      return {
        succeeded: false,
        errorMessage: "A file with this name already exists.",
      };
    }
    const result = await Project.findOneAndUpdate(
      { _id: projectId },
      {
        $push: {
          projectFiles: {
            filename,
            code: "",
            isEntryPoint: false,
          },
        },
        lastModified: moment.utc().format(),
      },
      { new: true },
    );

    return {
      succeeded: true,
      files: result.projectFiles,
    };
  };

  updateCurrentFileCode = async (payload) => {
    const { _id, filename, newCode } = payload;
    const result = await Project.findOneAndUpdate(
      { _id, "projectFiles.filename": filename },
      {
        $set: {
          "projectFiles.$.code": newCode,
          lastModified: moment.utc().format(),
        },
      },
      { new: true },
    );
    return result;
  };

  deleteFile = async (payload) => {
    const { _id, filename } = payload;
    const result = await Project.findOneAndUpdate(
      { _id },
      {
        $pull: {
          projectFiles: { filename },
        },
        lastModified: moment.utc().format(),
      },
      { new: true },
    );
    return result;
  };

  createClone = async (payload) => {
    const result = await Project.create({
      ...payload,
      lastModified: moment.utc().format(),
    });

    return { succeeded: true, result };
  };

  getProjectById = async (payload) => {
    const { projectId } = payload;
    const project = await Project.findOne({ _id: projectId });
    if (!project) {
      return {
        succeeded: false,
        errorMessage: "Session not found",
      };
    }
    return {
      succeeded: true,
      project,
    };
  };

  getProjectByUserId = async (payload) => {
    const { userId, limit = 10, skip = 0 } = payload;
    const projects = await Project.find({ userId }).limit(limit).skip(skip);

    return {
      succeeded: true,
      projects,
    };
  };
  handleGetAction = async (actionPayload) => {
    const { action, payload } = actionPayload;
    if (action == this.GET_PROJECT_BY_ID) {
      return this.getProjectById(payload);
    } else if (action == this.GET_ALL_SESSION_BY_USERID) {
      return this.getProjectByUserId(payload);
    }
    return { succeeded: false, errorMessage: "not valid action" };
  };

  handleAction = (actionPayload) => {
    const { action, payload } = actionPayload;
    if (action == this.CREATE_NEW_PROJECT) {
      return this.create(payload);
    } else if (action == this.DELETE_PROJECT) {
      return this.delete(payload);
    } else if (action === this.UPDATE_PROJECT_BY_CREATING_NEW_FILE) {
      return this.createNewFile(payload);
    } else if (action === this.UPDATE_PROJECT_EXISTING_FILE) {
      return this.updateCurrentFileCode(payload);
    } else if (action === this.DELETE_PROJECT_FILE) {
      return this.deleteFile(payload);
    } else if (action === this.UPDATE_PROJECT_TITLE) {
      return this.updateTitle(payload);
    } else if (action === this.UPDATE_PROJECT_TO_PUBLIC) {
      return this.updateToPublic(payload);
    }
    return { succeeded: false, errorMessage: "not valid action" };
  };

  // helpeer function
  getDefaultProJectFile = (language) => {
    if (language == remoteCode.JAVASCRIPT) {
      return [
        {
          filename: "main.js",
          code: "console.log('Hello wolrd')",
          isEntryPoint: true,
        },
      ];
    } else if (language == remoteCode.PYTHON) {
      return [
        {
          filename: "main.py",
          code: "print('hello world')",
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
    } else if (language == remoteCode.HTML) {
      return [
        {
          filename: "index.html",
          code: "",
          isEntryPoint: true,
        },
        {
          filename: "style.css",
          code: "",
          isEntryPoint: false,
        },
        {
          filename: "index.js",
          code: "",
          isEntryPoint: false,
        },
      ];
    } else {
      return [];
    }
  };
}

const projectApi = new ProjectApi();
export default projectApi;
