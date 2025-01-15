import meettumApi from "ApiServiveGateWay/apiConfig";
class UserWalletApi {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {}
  getAllUserKeys = async () => {
    const { data } = await meettumApi.get("/api/v1/loadKey");
    return data;
  };
  createKey = async () => {
    const { data } = await meettumApi.get("/api/v1/createkey");
    return data;
  };
}
const meetingMannagerApi = new UserWalletApi();
export default meetingMannagerApi;
