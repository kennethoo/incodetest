import express from "express";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
import apiGateWay from "../apiGateWay.js";
import userApiKeysApi from "../application/userApiKeysApi.js";
import userWalletApi from "../application/userWalletApi.js";
import stripe from "../config/stripe.js";
import codeExplain from "../application/codeExplain.js";
import checkSession from "../checkUserSession/checkUserSession.js";
import Customer from "../models/customer.js";

router.post("/api/v2/ai/explain", async function (req, res) {
  const result = await codeExplain.handleCodeExplanation(req.body);
  res.send(result);
});

router.get("/api/v2/analitic/:query", checkSession, async (req, res) => {
  const query = JSON.parse(req.params.query);
  const result = await apiGateWay.getLogs(query);
  res.send(result);
});

router.get("/api/v2/projects/:query", checkSession, async (req, res) => {
  const query = JSON.parse(req.params.query);
  const result = await apiGateWay.getProjects(query);
  res.send(result);
});

router.get("/api/v2/shared/projects/:query", async (req, res) => {
  const query = JSON.parse(req.params.query);
  const result = await apiGateWay.getSharedProjects(query);
  res.send(result);
});

router.post("/api/v2/projects/action", checkSession, async (req, res) => {
  const result = await apiGateWay.handleActionForProject(req.body);
  res.send(result);
});

router.post("/api/v2/sharedprojects/action", checkSession, async (req, res) => {
  const result = await apiGateWay.handleActionForSharedProject(req.body);
  res.send(result);
});

router.post(
  "/api/v1/load/user/wallet",
  checkSession,
  async function (req, res) {
    const data = await userWalletApi.loadWallet(req.body);
    res.send(data);
  },
);

router.get("/api/v1/createkey", checkSession, async function (req, res) {
  const data = await userApiKeysApi.createKey(req.session.user.userId);
  res.send(data);
});

router.post("/api/v1/deletekey", checkSession, async function (req, res) {
  const data = await userApiKeysApi.createKey(req.body);
  res.send(data);
});

router.get("/api/v1/loadKey", checkSession, async function (req, res) {
  const data = await userApiKeysApi.getAllUserKey(req.session.user.userId);
  res.send(data);
});

router.get("/api/v1/stripe/config", checkSession, async (req, res) => {
  res.send({ PUBLISHABLE_SECRET_KEY: process.env.PUBLISHABLE_SECRET_KEY });
});

router.post("/api/v1/load/wallet/intent", checkSession, async (req, res) => {
  const { email, price } = req.body;
  const userId = req.session.user.userId;

  const result = await Customer.findOne({ userId });
  let customer = null;
  if (result) {
    customer = result;
  } else {
    const stripeCustomer = await stripe.customers.create({
      name: userId,
      email,
    });
    customer = await Customer.create({
      customerId: stripeCustomer.id,
      email: email,
      userId,
      paymentMethods: [],
    });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer.customerId,
    metadata: { email: email, userId: userId },
    currency: "usd",
    amount: price,
    payment_method_types: ["card"],
  });
  res.send({
    succeeded: true,
    clientSecret: paymentIntent.client_secret,
  });
});

export default router;
