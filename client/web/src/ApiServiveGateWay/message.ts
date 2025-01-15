import meettumApi from "ApiServiveGateWay/apiConfig";
class Message {
  DELETE_MESSAGE: string;
  CREATE_NEW_MESSAGE: string;
  CREATE_NEW_MESSAGE_STATUS: string;
  UPDATE_MESSAGE_STATUS: string;
  EDIT_MESSAGE: string;
  MESSAGE_OF_TYPE_TEXT: string;
  MESSAGE_OF_TYPE_IMAGE: string;
  MESSAGE_OF_TYPE_VIDEO: string;
  MESSAGE_OF_TYPE_AUDIO: string;
  constructor() {
    this.CREATE_NEW_MESSAGE = "create_new_message";
    this.EDIT_MESSAGE = "edit_message";
    this.DELETE_MESSAGE = "delete_message";
    this.CREATE_NEW_MESSAGE_STATUS = "create_new_message_status";
    this.UPDATE_MESSAGE_STATUS = "update_message_status";

    this.MESSAGE_OF_TYPE_TEXT = "message_type_text";
    this.MESSAGE_OF_TYPE_IMAGE = "message_type_image";
    this.MESSAGE_OF_TYPE_VIDEO = "message_type_video";
    this.MESSAGE_OF_TYPE_AUDIO = "message_type_audio";
  }

  handleAction = async (payload) => {
    const { data } = await meettumApi.post("/api/v1/message/action", payload);
    return data;
  };

  getMessage = async (payload) => {
    const stringify = await JSON.stringify(payload);
    const { data } = await meettumApi.get(
      `/api/v2/message/${stringify}`,
      payload,
    );
    return data;
  };

  getMissedMessage = async (payload) => {
    const stringify = await JSON.stringify(payload);
    const { data } = await meettumApi.get(
      `/api/v1/message/status/${stringify}`,
      payload,
    );
    return data;
  };

  handleUpdateMessageStatus = async (payload) => {
    const { data } = await meettumApi.post(`/api/v1/message/status`, payload);
    return data;
  };

  uploadAsset = async (payload) => {
    const { media, action, recipients, spaceId, creatorId, messageType, date } =
      payload;
    let formData = new FormData();

    formData.append("file", media.target.files[0]);
    formData.append("spaceId", spaceId);
    formData.append("creatorId", creatorId);
    formData.append("messageType", messageType);
    formData.append("date", date);
    formData.append("action", action);
    formData.append("recipients", recipients.join("#"));
    const { data } = await meettumApi.post(
      "/api/v1/message/asset/action",
      formData,
    );
    return data;
  };

  uploadAudio = async (payload) => {
    const { media, action, recipients, spaceId, creatorId, messageType, date } =
      payload;
    let formData = new FormData();
    const audioBlob = new Blob(media, { type: "audio/mp3" });
    formData.append("file", audioBlob, "recording.mp3");
    formData.append("spaceId", spaceId);
    formData.append("creatorId", creatorId);
    formData.append("messageType", messageType);
    formData.append("date", date);
    formData.append("action", action);
    formData.append("recipients", recipients.join("#"));
    const { data } = await meettumApi.post(
      "/api/v1/message/asset/action",
      formData,
    );
    return data;
  };
}

export const messageApi = new Message();
