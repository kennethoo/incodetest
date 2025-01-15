import meettumApi from "ApiServiveGateWay/apiConfig";
class MeettumSubscriptionApi {
  constructor() {}

  subscribe = async (payload) => {
    const { data } = await meettumApi.post(
      "/api/meettum/subscribe/pro",
      payload,
    );
    return data;
  };
}
const meettumSubscriptionApi = new MeettumSubscriptionApi();
export { meettumSubscriptionApi };
