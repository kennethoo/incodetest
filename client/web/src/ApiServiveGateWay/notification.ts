import meettumApi from "ApiServiveGateWay/apiConfig";
class NotificationMannager {
  userId: any;
  MEETTINGINVITATION: string;
  MEETINGCONFIRM: string;
  MEETINGCANCEL: string;
  MEETINGDECLINE: string;
  constructor(userId) {
    this.userId = userId;
    this.MEETTINGINVITATION = "meetinginvitation";
    this.MEETINGCONFIRM = "meettingconfrim";
    this.MEETINGCANCEL = "meetingcancel";
    this.MEETINGDECLINE = "meetingdecline";
  }
  getNoticationCont = async (query) => {
    const { data } = await meettumApi.get(
      `/api/v1/notification/${JSON.stringify(query)}`,
    );
    return data;
  };
  updateStatus = async (body) => {
    const { data } = await meettumApi.post("/api/v1/notification/update", body);
    return data;
  };
}

export default NotificationMannager;
