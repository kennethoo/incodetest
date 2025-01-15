import express from "express";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
import apiGateWay from "../apiGateWay.js";
import checkSession from "../checkUserSession/checkUserSession.js";

router.post(
  "/api/v1/repository/action",
  checkSession,
  async function (req, res) {
    const data = await apiGateWay.handleActionForRepository(req.body);
    res.send(data);
  },
);

router.get(
  "/api/v1/repository/:query",
  checkSession,
  async function (req, res) {
    const data = await apiGateWay.getRepository(JSON.parse(req.params.query));
    res.send(data);
  },
);

export default router;
