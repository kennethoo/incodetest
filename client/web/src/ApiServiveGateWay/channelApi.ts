import meettumApi from "ApiServiveGateWay/apiConfig";
export class ChannelApi {
  PENDING: string;
  DECLINE: string;
  ACCEPTED: string;
  ACTION_CREATE_NEW_SPACE: string;
  ACTION_CREATE_NEW_SUBSPACE: string;
  ACTION_CREATE_NEW_CHANEL: string;
  ACTION_CREATE_NEW_MESSAGE: string;
  ACTION_ADD_USER_TO_CHANNEL: string;
  TYPE_PRIVATE_CHANNEL: string;
  TYPE_GROUP_CHANNEL: string;
  ACTION_LEAVE_CHANNEL: string;
  constructor() {
    this.ACTION_CREATE_NEW_SPACE = "create_new_space";
    this.ACTION_CREATE_NEW_SUBSPACE = "create_new_subspace";
    this.ACTION_CREATE_NEW_CHANEL = "create_new_channels";
    this.ACTION_CREATE_NEW_MESSAGE = "create_new_message";
    this.ACTION_ADD_USER_TO_CHANNEL = "add_user_to_channel";
    this.ACTION_LEAVE_CHANNEL = "leave_channel";

    //type of channel
    this.TYPE_PRIVATE_CHANNEL = "private_channel";
    this.TYPE_GROUP_CHANNEL = "group_channel";
  }
  getChannel = async (query) => {
    const data = await meettumApi.get(
      `/api/v1/channel/${JSON.stringify(query)}`,
    );
    return data;
  };
  handleAction = async (payload) => {
    const data = await meettumApi.post(`/api/v1/channel/create`, payload);
    return data;
  };
}

export const channelApi = new ChannelApi();
