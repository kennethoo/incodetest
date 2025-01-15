import codeExecutionApi from "./application/codeExecution.js";
import projectApi from "./application/projectsApi.js";
import sharedProjectApi from "./application/sharedProject.js";
import projectRepositoryIdeaApi from "./application/repository/projectRepositoryIdea.js";
import codingSessionApi from "./application/CodingSession.js";
// Step verify that the user can execute the giving code
// Execute the code

// recriment hte user wallet

class ApiGateWay {
  constructor() {}
  // this is to created a space

  //verify if the key is valid
  executeCode = async ({ language, code, projectId, userId, saveMetric }) => {
    if (!language || code == undefined) {
      return { succeeded: false, errorMessage: "Invalid input" };
    }
    // const keydetail = await userApiKeysApi.verifyKey(apiKey);
    // if (!keydetail.isKeyValid) {
    //   return { succeeded: false, errorMessage: keydetail.errorMessage };
    // }
    // const { userKey } = keydetail;
    // const userId = userKey.userId;

    // const walletDetails = await userWalletApi.haveEnoughtMoney(userId);

    // if (walletDetails.errorMessage) {
    //   return { succeeded: false, errorMessage: walletDetails.errorMessage };
    // }

    // this is the sauce
    // if (result.succeeded) {
    //   userWalletApi.decrimentWallet(userId);
    // }
    return { succeeded: true, result };
  };

  getLogs = async (query) => {
    return await codeExecutionApi.get(query);
  };
  getProjects = async (query) => {
    return await projectApi.handleGetAction(query);
  };

  handleActionForProject = async (payload) => {
    return await projectApi.handleAction(payload);
  };

  handleActionForSharedProject = async (payload) => {
    return await sharedProjectApi.handleAction(payload);
  };
  handleActionForRepository = async (payload) => {
    return await projectRepositoryIdeaApi.handleAction(payload);
  };

  getRepository = async (query) => {
    return await projectRepositoryIdeaApi.get(query);
  };
  getSharedProjects = async (query) => {
    return await sharedProjectApi.get(query);
  };

  // code session API
  handleActionForCodeSession = async (payload) => {
    return await codingSessionApi.handleAction(payload);
  };
  getCodeSession = async (payload) => {
    return await codingSessionApi.handleGetAction(payload);
  };
}

const apiGateWay = new ApiGateWay();
export default apiGateWay;
