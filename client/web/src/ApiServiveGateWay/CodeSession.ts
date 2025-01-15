import { meettumApi } from "ApiServiveGateWay/apiConfig";

export class CodeSession {
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
  CREATE_NEW_SESSION: string;
  UPDATE_SESSION_TITLE: string;
  UPDATE_SESSION_EXISTING_FILE: string;
  UPDATE_SESSION_BY_CREATING_NEW_FILE: string;
  DELETE_SESSION_FILE: string;
  END_SESSION: string;
  UPDATE_SESSION_TO_PUBLIC: string;
  ACTIVE_SESSION: string;
  SUPPORTED_LANGUAGE: string[];
  UPDATE_SESSION_LANGUAGE: string;
  GET_SESSION_BY_ID: string;
  GET_ALL_SESSION_BY_USERID: string;
  GET_ACTIVE_SESSION_BY_USERID: string;
  GET_PAST_SESSION_BY_USERID: string;

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
    this.CREATE_NEW_SESSION = "create_new_session";
    this.UPDATE_SESSION_TITLE = "update_session_title";
    this.UPDATE_SESSION_EXISTING_FILE = "update_session_existing_file";
    this.UPDATE_SESSION_BY_CREATING_NEW_FILE =
      "update_session_by_creating_new_file";
    this.UPDATE_SESSION_LANGUAGE = "update_session_language";
    this.DELETE_SESSION_FILE = "delete_session_file";
    this.END_SESSION = "end_session";
    this.UPDATE_SESSION_TO_PUBLIC = "update_session_to_public";
    this.ACTIVE_SESSION = "active_session";
    this.GET_SESSION_BY_ID = "get_session_by_id";
    this.GET_ALL_SESSION_BY_USERID = "get_all_session_by_userId";
    this.GET_ACTIVE_SESSION_BY_USERID = "get_active_session_by_userId";
    this.GET_PAST_SESSION_BY_USERID = "get_past_session_by_userId";
  }
  handleAction = async (payload) => {
    const { data } = await meettumApi.post(
      `/api/v2/code/session/action`,
      payload,
    );
    return data;
  };
  getSession = async (payload) => {
    const stringify = await JSON.stringify(payload);
    const { data } = await meettumApi.get(`/api/v2/code/session/${stringify}`);
    return data;
  };
}

export const codeSessionApi = new CodeSession();
