import meettumApi from "ApiServiveGateWay/apiConfig";

class Logger {
  constructor() {}
  log = async (dataDetail) => {
    const { data } = await meettumApi.post("/api/v1/log/data", dataDetail);
    return data;
  };
}
const loggerApi = new Logger();
export default loggerApi;
