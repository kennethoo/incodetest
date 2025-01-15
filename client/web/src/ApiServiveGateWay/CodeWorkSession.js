import { meettumApi } from "ApiServiveGateWay/apiConfig";
import { codeSessionApi } from "ApiServiveGateWay/CodeSession";
import { apiGateway } from "ApiServiveGateWay/apiGateway";

//

// const modal = {
//   creatorId: "String",
//   startTime: "String",
//   endTime: "String",
//   title: "String",
//   sessionState: "String",
//   files: [
//     {
//       filename: "String",
//       code: "String",
//       isEntryPoint: "Boolean",
//     },
//   ],
//   language: "String",
//   connectedPlan: "String",
//   lastModified: "String",
//   isAIEnabled: "Boolean",
//   description: "String",
//   isPublic: "Boolean",
//   isGeneatedFromClone: "Boolean",
//   url: "pathodprojed",
// };

export class CodeWorkSessionApi {
  constructor({ codeWorkSession, isProject }) {
    this.codeWorkSession = codeWorkSession;
    this.isProject = isProject;
    this.EVENT_NEW_FILE = "event_new_file";
    this.EVENT_NEW_TITLE = "event_new_title";
    this.END_SESSION = "end_session";
    this.ACTIVE_SESSION = "active_session";
  }

  handleAction = async (payload) => {
    if (this.isProject) {
      //write the API for this Latter
    } else {
      return await codeSessionApi.handleAction(payload);
    }
  };
  getSession = async (payload) => {
    const stringify = await JSON.stringify(payload);
    const { data } = await meettumApi.get(`/api/v2/code/session/${stringify}`);
    return data;
  };

  build = () => {
    const modal = {
      ...this.codeWorkSession,
    };
    if (this.isProject) {
      modal.files = [...this.codeWorkSession.projectFiles];
      modal.isProject = true;
    } else {
      modal.isProject = false;
      modal.url = `/app/session/${this.codeWorkSession._id}`;
    }

    this.codeWorkSession = modal;

    return this.codeWorkSession;
  };

  updateTitle = async ({ id, title }) => {
    if (this.isProject) {
      //imoliment this
    } else {
      return await this.handleAction({
        action: codeSessionApi.UPDATE_SESSION_TITLE,
        payload: { sessionId: id, title },
      });
    }
  };

  updateFile = async ({ id, filename, newCode }) => {
    if (this.isProject) {
      //imoliment this
    } else {
      return await this.handleAction({
        action: codeSessionApi.UPDATE_SESSION_EXISTING_FILE,
        payload: {
          _id: id,
          filename,
          newCode,
        },
      });
    }
  };

  createNewFile = async ({ filename, id }) => {
    if (this.isProject) {
      //imoliment this
    } else {
      return await this.handleAction({
        action: codeSessionApi.UPDATE_SESSION_BY_CREATING_NEW_FILE,
        payload: {
          filename,
          sessionId: id,
        },
      });
    }
  };

  deleteFile = async ({ filename, id }) => {
    if (this.isProject) {
      //imoliment this
    } else {
      console.log({ filename, id });
      return await this.handleAction({
        action: codeSessionApi.DELETE_SESSION_FILE,
        payload: {
          filename,
          sessionId: id,
        },
      });
    }
  };
}
