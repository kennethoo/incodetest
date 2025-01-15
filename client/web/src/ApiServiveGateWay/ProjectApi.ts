import { meettumApi } from "ApiServiveGateWay/apiConfig";

export class ProjectApi {
  JAVASCRIPT: string;
  PYTHON: string;
  GO: string;
  JAVA: string;
  HTML: string;
  RUBY: string;
  CPP: string;
  PYTHON_CODE_TEMPLATE: string;
  JAVA_CODE_TEMPLATE: string;
  JAVASCRIPT_CODE_TEMPLATE: string;
  CREATE_NEW_PROJECT_IDEA: string;
  CREATE_NEW_PROJECT: string;
  UPDATE_PROJECT_TITLE: string;
  UPDATE_PROJECT_EXISTING_FILE: string;
  UPDATE_PROJECT_BY_CREATING_NEW_FILE: string;
  DELETE_PROJECT_FILE: string;
  END_PROJECT: string;
  UPDATE_PROJECT_TO_PUBLIC: string;
  ACTIVE_PROJECT: string;
  SUPPORTED_LANGUAGE: string[];
  UPDATE_PROJECT_LANGUAGE: string;
  GET_PROJECT_BY_ID: string;
  GET_ALL_PROJECT_BY_USERID: string;
  GET_ACTIVE_PROJECT_BY_USERID: string;

  constructor() {
    this.JAVASCRIPT = "javascript";
    this.PYTHON = "python";
    this.GO = "go";
    this.JAVA = "java";
    this.HTML = "html";
    this.RUBY = "ruby";
    this.CPP = "cpp";
    this.SUPPORTED_LANGUAGE = [
      this.JAVASCRIPT,
      this.PYTHON,
      this.JAVA,
      this.RUBY,
    ];
    this.PYTHON_CODE_TEMPLATE = "print('Hello world')";
    this.JAVA_CODE_TEMPLATE = "print('Hello world')";
    this.JAVASCRIPT_CODE_TEMPLATE = "console('Hello world')";
    this.CREATE_NEW_PROJECT = "create_new_project";
    this.UPDATE_PROJECT_TITLE = "update_project_title";
    this.UPDATE_PROJECT_EXISTING_FILE = "update_project_existing_file";
    this.UPDATE_PROJECT_BY_CREATING_NEW_FILE =
      "update_project_by_creating_new_file";
    this.UPDATE_PROJECT_LANGUAGE = "update_project_language";
    this.DELETE_PROJECT_FILE = "delete_project_file";
    this.END_PROJECT = "end_project";
    this.UPDATE_PROJECT_TO_PUBLIC = "update_project_to_public";
    this.ACTIVE_PROJECT = "active_project";
    this.GET_PROJECT_BY_ID = "get_project_by_id";
    this.GET_ALL_PROJECT_BY_USERID = "get_all_project_by_userId";
    this.GET_ACTIVE_PROJECT_BY_USERID = "get_active_project_by_userId";
  }
  create = async (payload) => {
    const { data } = await meettumApi.post(`/api/v2/projects/action`, payload);
    return data;
  };
  get = async (payload) => {
    const stringify = await JSON.stringify(payload);
    const { data } = await meettumApi.get(`/api/v2/projects/${stringify}`);
    return data;
  };
}

export const projectApi = new ProjectApi();
