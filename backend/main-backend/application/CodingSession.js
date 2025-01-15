// Now this is a Top level feature feature

import mongoose from "mongoose";
import moment from "moment";
import { remoteCode } from "../engine-application/remoteCode.js";
import { paidPlan, freePlan } from "../application/meettumSubscription.js";
import { dateFormat } from "../utility/momentFormat.js";
import productAccessManagerApi from "./validateProductAcces.js";
/// User action
// user  click start Session
// get redirecting to the session and start coding

const Schema = mongoose.Schema;
const model = new Schema({
  creatorId: String,
  startTime: String,
  endTime: String,
  title: String,
  sessionState: String,
  files: [
    {
      filename: String,
      code: String,
      isEntryPoint: Boolean,
    },
  ],
  language: String,
  connectedPlan: String,
  lastModified: String,
  isAIEnabled: Boolean,
});

const CodingSession = mongoose.model("codingsession", model);

class CodingSessionApi {
  constructor() {
    this.CREATE_NEW_SESSION = "create_new_session";
    this.UPDATE_SESSION_TITLE = "update_session_title";
    this.UPDATE_SESSION_EXISTING_FILE = "update_session_existing_file";
    this.UPDATE_SESSION_BY_CREATING_NEW_FILE =
      "update_session_by_creating_new_file";
    this.DELETE_SESSION_FILE = "delete_session_file";
    this.UPDATE_SESSION_TO_PUBLIC = "update_session_to_public";
    this.END_SESSION = "end_session";
    this.ACTIVE_SESSION = "active_session";
    this.UPDATE_SESSION_LANGUAGE = "update_session_language";
    this.GET_SESSION_BY_ID = "get_session_by_id";
    this.GET_ALL_SESSION_BY_USERID = "get_all_session_by_userId";
    this.GET_ACTIVE_SESSION_BY_USERID = "get_active_session_by_userId";
  }

  createSession = async (payload) => {
    // create a session
    const { creatorId, title, connectedPlan } = payload;
    if (connectedPlan == freePlan) {
      const { canAccess, message } = await productAccessManagerApi.handleAction(
        {
          action: productAccessManagerApi.ACTION_VALIDATE_ACCESS,
          payload: {
            userId: creatorId,
            productType: productAccessManagerApi.PRODUCT_SESSION,
          },
        }
      );

      if (!canAccess) {
        return { succeeded: false, errorMessage: message };
      }
    }
    //add validation here

    const { startTime, endTime } = this.getDate();
    const sessionState = this.ACTIVE_SESSION;
    const isAIEnabled = connectedPlan === paidPlan;

    const sessionPayload = {
      creatorId,
      title,
      connectedPlan,
      startTime,
      endTime,
      sessionState,
      files: remoteCode.getDefaultFile(remoteCode.JAVASCRIPT),
      language: remoteCode.JAVASCRIPT,
      isAIEnabled,
      lastModified: moment.utc().format(),
    };
    const session = await CodingSession.create(sessionPayload);
    return { succeeded: true, session };
  };

  getDate = () => {
    const startTime = moment.utc().format(dateFormat);
    const endTime = moment.utc(startTime).add(24, "hour").format(dateFormat);
    return { startTime, endTime };
  };

  createNewFile = async (payload) => {
    const { sessionId, filename } = payload;
    const session = await CodingSession.findOne({ _id: sessionId });

    if (!session) {
      return {
        succeeded: false,
        errorMessage: "not fount",
      };
    }
    const fileExists = session.files.some((file) => file.filename === filename);

    if (fileExists) {
      return {
        succeeded: false,
        errorMessage: "A file with this name already exists.",
      };
    }
    const result = await CodingSession.findOneAndUpdate(
      { _id: sessionId },
      {
        $push: {
          files: {
            filename,
            code: "",
            isEntryPoint: false,
          },
        },
        lastModified: moment.utc().format(),
      },
      { new: true }
    );

    return {
      succeeded: true,
      files: result.files,
    };
  };

  updateLanguage = async (payload) => {
    const { sessionId, language } = payload;
    const result = await CodingSession.findOne({ _id: sessionId });
    if (!result) {
      return {
        succeeded: false,
        errorMessage: "no found",
      };
    }

    result.files = remoteCode.getDefaultFile(language);
    result.language = language;
    await result.save();

    return {
      succeeded: true,
      files: result.files,
    };
  };
  updateCurrentFileCode = async (payload) => {
    const { _id, filename, newCode } = payload;
    const result = await CodingSession.findOneAndUpdate(
      { _id, "files.filename": filename },
      {
        $set: {
          "files.$.code": newCode,
          lastModified: moment.utc().format(),
        },
      },
      { new: true }
    );
    return result;
  };

  deleteFile = async (payload) => {
    const { sessionId, filename } = payload;
    const result = await CodingSession.findOneAndUpdate(
      { _id: sessionId },
      {
        $pull: {
          files: { filename },
        },
        lastModified: moment.utc().format(),
      },
      { new: true }
    );
    return { succeeded: true, files: result.files };
  };

  updateTitle = async (payload) => {
    const { sessionId, title } = payload;
    await CodingSession.findOneAndUpdate(
      { _id: sessionId },
      { title, lastModified: moment.utc().format() }
    );
    return { succeeded: true };
  };
  //todo impliment this feature
  endSession = async (payload) => {
    const { sessionId } = payload;
    const session = await CodingSession.findOne({ _id: sessionId });
    if (!session) {
      return {
        succeeded: false,
        errorMessage: "Session not found",
      };
    }
    if (session.connectedPlan == freePlan) {
      await this.deleteSession({ sessionId });
      return {
        succeeded: true,
      };
    }
    session.sessionState = this.END_SESSION;
    await session.save();

    return {
      succeeded: true,
      session,
    };
  };

  getSessionById = async (payload) => {
    const { sessionId } = payload;
    const session = await CodingSession.findOne({ _id: sessionId });
    if (!session) {
      return {
        succeeded: false,
        errorMessage: "Session not found",
      };
    }
    return {
      succeeded: true,
      sessions: [session],
    };
  };

  getActiveSessionByUserId = async (payload) => {
    const { userId, limit = 10, skip = 0 } = payload;
    const sessions = await CodingSession.find({
      creatorId: userId,
      sessionState: this.ACTIVE_SESSION,
    })
      .limit(limit)
      .skip(skip);

    return {
      succeeded: true,
      sessions,
    };
  };

  getSessionByUserId = async (payload) => {
    const { userId, limit = 10, skip = 0 } = payload;
    const sessions = await CodingSession.find({ creatorId: userId })
      .limit(limit)
      .skip(skip);

    return {
      succeeded: true,
      sessions,
    };
  };

  handleGetAction = async (actionPayload) => {
    const { action, payload } = actionPayload;
    if (action == this.GET_SESSION_BY_ID) {
      return this.getSessionById(payload);
    } else if (action == this.GET_ALL_SESSION_BY_USERID) {
      return this.getSessionByUserId(payload);
    } else if (action == this.GET_ACTIVE_SESSION_BY_USERID) {
      return this.getActiveSessionByUserId(payload);
    }
    return { succeeded: false, errorMessage: "not valid action" };
  };

  get = async (query) => {
    const { limit, skip, filter } = query;
    const sessions = await CodingSession.find(filter)
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip);
    return { succeeded: true, sessions };
  };

  deleteSession = async ({ sessionId }) => {
    await CodingSession.deleteOne({ _id: sessionId });

    return { succeeded: true };
  };

  handleAction = (actionPayload) => {
    const { action, payload } = actionPayload;
    if (action == this.CREATE_NEW_SESSION) {
      return this.createSession(payload);
    } else if (action === this.UPDATE_SESSION_BY_CREATING_NEW_FILE) {
      return this.createNewFile(payload);
    } else if (action === this.UPDATE_SESSION_EXISTING_FILE) {
      return this.updateCurrentFileCode(payload);
    } else if (action === this.DELETE_SESSION_FILE) {
      return this.deleteFile(payload);
    } else if (action === this.UPDATE_SESSION_TITLE) {
      return this.updateTitle(payload);
    } else if (action === this.UPDATE_SESSION_LANGUAGE) {
      return this.updateLanguage(payload);
    } else if (action === this.END_SESSION) {
      return this.endSession(payload); // Updated to call endSession
    }
    return { succeeded: false, errorMessage: "not valid action" };
  };
}

const codingSessionApi = new CodingSessionApi();

export default codingSessionApi;
