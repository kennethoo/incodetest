import express from "express";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
import apiGateWay from "../apiGateWay.js";
import checkSession from "../checkUserSession/checkUserSession.js";

router.get("/api/v2/code/session/:query", checkSession, async (req, res) => {
  const query = JSON.parse(req.params.query);
  const result = await apiGateWay.getCodeSession(query);
  res.send(result);
});

router.post("/api/v2/code/session/action", checkSession, async (req, res) => {
  const result = await apiGateWay.handleActionForCodeSession(req.body);
  res.send(result);
});

export default router;
