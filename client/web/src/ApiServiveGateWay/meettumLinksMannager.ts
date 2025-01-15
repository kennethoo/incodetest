import meettumApi from "ApiServiveGateWay/apiConfig";
class MeettumLinksMannager {
  constructor() {}

  createLink = async (payload) => {
    const { data } = await meettumApi.post(
      "/api/v1/create/meettumlink",
      payload,
    );
    return data;
  };
  getMeettumLinks = async (payload) => {
    const { data } = await meettumApi.get(
      `/api/v1/meettumlink/${JSON.stringify(payload)}`,
    );
    return data;
  };
  updateLinkData = async (payload) => {
    const { data } = await meettumApi.post(
      `/api/v1/meettumlink/update`,
      payload,
    );
    return data;
  };
  deleteLink = async (payload) => {
    const { data } = await meettumApi.post(
      `/api/v1/meettumlink/delete`,
      payload,
    );
    return data;
  };
  logAnalytic = async (payload) => {
    const { data } = await meettumApi.post(
      "/api/v1/create/meettumlink/analytic",
      payload,
    );
    return data;
  };

  getLinkAnalytic = async (payload) => {
    const { data } = await meettumApi.get(
      `/api/v1/meettumlink/analytic/${JSON.stringify(payload)}`,
    );
    return data;
  };
}
const meettumLinksMannager = new MeettumLinksMannager();
export { MeettumLinksMannager, meettumLinksMannager };
