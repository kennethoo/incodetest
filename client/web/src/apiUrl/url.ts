let apiUrl: {
  mainServer: string;
  network: string;
  rceServer: string;
  codeRce: string;
  mediaServer: String;
} | null = null;
const apiUrlProduction: {
  mainServer: string;
  network: string;
  rceServer: string;
  codeRce: string;
  mediaServer: String;
} = {
  mainServer: "https://business.meetcod.com/",
  network: "https://meetcode-realtime-board-1a2f1ab7b267.herokuapp.com/",
  rceServer: "https://business.meetcod.com",
  codeRce: "https://code.meettum.live",
  mediaServer: "https://stream.meettum.live",
};

const apiUrlDevelopment: {
  mainServer: string;
  network: string;
  rceServer: string;
  codeRce: string;
  mediaServer: String;
} = {
  mainServer: "http://localhost:8000",
  network: "http://localhost:5600",
  rceServer: "http://localhost:4300",
  codeRce: "http://localhost:8500",
  mediaServer: "http://localhost:8200",
};

if (process.env.NODE_ENV === "production") {
  apiUrl = apiUrlProduction;
} else {
  apiUrl = apiUrlDevelopment;
}

export default apiUrl;
