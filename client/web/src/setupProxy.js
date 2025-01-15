const createProxyMiddleware = require("http-proxy-middleware");
const proxyUrl =
  process.env.NODE_ENV === "production"
    ? "https://business.meetcod.com/"
    : "http://localhost:8000/";
module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: proxyUrl,
      changeOrigin: true,
    }),
  );
};
