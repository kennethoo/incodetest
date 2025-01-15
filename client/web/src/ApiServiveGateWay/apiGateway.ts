import { meettumApi, rceApi } from "ApiServiveGateWay/apiConfig";

export class ApiGateway {
  JAVASCRIPT: string;
  SUPPORTED_LANGUAGE: string[];
  PYTHON: string;
  GO: string;
  JAVA: string;
  HTML: string;
  RUBY: string;
  CPP: string;
  PYTHON_CODE_TEMPLATE: string;
  JAVA_CODE_TEMPLATE: string;
  JAVASCRIPT_CODE_TEMPLATE: string;
  create: string;
  CREATE_NEW_PROJECT: string;
  UPDATE_PROJECT_TO_PUBLIC: string;
  UPDATE_PROJECT: string;
  DELETE_PROJECT: string;
  UPDATE_PROJECT_BY_CREATING_NEW_FILE: string;
  UPDATE_PROJECT_EXISTING_FILE: string;
  DELETE_PROJECT_FILE: string;
  UPDATE_PROJECT_TITLE: string;
  CLONE_PROJECT_IDEA: string;
  CREATE_NEW_PROJECT_IDEA: string;

  constructor() {
    this.JAVASCRIPT = "javascript";
    this.PYTHON = "python";
    this.GO = "go";
    this.JAVA = "java";
    this.HTML = "html";
    this.RUBY = "ruby";
    this.CPP = "cpp";
    this.UPDATE_PROJECT_TO_PUBLIC = "update_project_to_public";
    this.CREATE_NEW_PROJECT = "create_new_project";
    this.UPDATE_PROJECT = "update_project_title";
    this.UPDATE_PROJECT_BY_CREATING_NEW_FILE =
      "update_project_by_creating_new_file";
    this.DELETE_PROJECT = "delete_file";
    this.DELETE_PROJECT = "delete_project";
    this.DELETE_PROJECT_FILE = "delete_project_file";
    this.UPDATE_PROJECT_EXISTING_FILE = "update_project_existing_file";
    this.UPDATE_PROJECT_TITLE = "update_project_title";

    this.CLONE_PROJECT_IDEA = "clone_project_idea";
    this.CREATE_NEW_PROJECT_IDEA = "create_new_project_idea";

    this.SUPPORTED_LANGUAGE = [
      this.JAVASCRIPT,
      this.PYTHON,
      this.JAVA,
      this.RUBY,
    ];

    this.PYTHON_CODE_TEMPLATE = "print('Hello world')";
    this.JAVA_CODE_TEMPLATE = "print('Hello world')";
    this.JAVASCRIPT_CODE_TEMPLATE = `
    // A simple function to greet a user
  function greet(name) {
      if (!name) {
          console.log("Hello, Guest!");
      } else {
          console.log("Hello, " + name + "!");
      }
  }

  // Call the function with a sample name
  greet("Amzat");
  
  // Example of array manipulation
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(num => num * 2);
  console.log("Doubled Numbers:", doubled);

  // An object with a method
  const user = {
      name: "Amzat",
      age: 26,
      introduce() {
          console.log(\`Hi, I'm \${this.name} and I'm \${this.age} years old.\`);
      }
  };

  // Call the method
  user.introduce();`;
  }

  runCode = async ({ userId, language, code, saveMetric, projectId }) => {
    const { data } = await rceApi.post(`/api/v1/execute`, {
      userId,
      language,
      code,
      saveMetric,
      projectId,
    });
    return data;
  };

  runCodev2 = async ({ userId, language, files, saveMetric, projectId }) => {
    const { data } = await rceApi.post(`/api/v2/execute`, {
      userId,
      language,
      files,
      saveMetric,
      projectId,
    });
    return data;
  };

  getAnalytic = async (payload) => {
    const stringify = await JSON.stringify(payload);
    const { data } = await meettumApi.get(
      `/api/v2/analitic/${stringify}`,
      payload,
    );
    return data;
  };

  getProjects = async (payload) => {
    const stringify = await JSON.stringify(payload);
    const { data } = await meettumApi.get(`/api/v2/projects/${stringify}`);
    return data;
  };

  getShareProjects = async (payload) => {
    const stringify = await JSON.stringify(payload);
    const { data } = await meettumApi.get(
      `/api/v2/shared/projects/${stringify}`,
    );
    return data;
  };

  handleActionForProject = async (payload) => {
    const { data } = await meettumApi.post(`/api/v2/projects/action`, payload);
    return data;
  };

  handleActionForSharedProject = async (payload) => {
    const { data } = await meettumApi.post(
      `/api/v2/sharedprojects/action`,
      payload,
    );
    return data;
  };

  askAi = async (payload) => {
    const { data } = await meettumApi.post(`/api/v2/ai/explain`, payload);
    return data;
  };

  handleActionForRepository = async (payload) => {
    const { data } = await meettumApi.post(
      `/api/v1/repository/action`,
      payload,
    );
    return data;
  };

  getRepository = async (payload) => {
    const stringify = await JSON.stringify(payload);
    const { data } = await meettumApi.get(`/api/v1/repository/${stringify}`);
    return data;
  };
}

export const apiGateway = new ApiGateway();
