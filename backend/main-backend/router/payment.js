import express from "express";
const router = express.Router();
import Customer from "../models/customer.js";
import stripe from "../config/stripe.js";
import checkSession from "../checkUserSession/checkUserSession.js";
import { meetumCodeSubscriptionApi } from "../application/meettumSubscription.js";

router.get("/api/v1/stripe/config", async (req, res) => {
  res.send({ PUBLISHABLE_SECRET_KEY: process.env.PUBLISHABLE_SECRET_KEY });
});

router.post("/api/book/paid/meetingsession/intent", async (req, res) => {
  const { name, email, price } = req.body;

  const result = await Customer.findOne({ userId: name });
  let customer = null;
  if (result) {
    customer = result;
  } else {
    const stripeCustomer = await stripe.customers.create({
      name,
      email,
    });
    customer = await Customer.create({
      customerId: stripeCustomer.id,
      email: email,
      userId: name,
      paymentMethods: [],
    });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer.customerId,
    metadata: { email: email, userId: name },
    currency: "usd",
    amount: price,
    payment_method_types: ["card"],
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

router.post("/api/meettum/subscribe/intent", async (req, res) => {
  const result = await meetumCodeSubscriptionApi.createSubScriptionIntent(
    req.body,
  );
  res.send(result);
});

router.post("/api/meettum/subscribe/pro", async (req, res) => {
  const result = await meetumCodeSubscriptionApi.createSubScription(req.body);
  res.send(result);
});

router.get("/api/v1/payment/methode", checkSession, async (req, res) => {
  const result = await meetumCodeSubscriptionApi.getCustomerPaymentMethode(
    req.session.user.userId,
  );
  res.send(result);
});

router.post(
  "/api/v1/payment/methode/remove",
  checkSession,
  async (req, res) => {
    const result = await meetumCodeSubscriptionApi.removeUserPaymentOption({
      ...req.body,
      userId: req.session?.user?.userId,
    });

    res.send(result);
  },
);

router.post(
  "/api/v1/payment/methode/update",
  checkSession,
  async (req, res) => {
    const result = await meetumCodeSubscriptionApi.markPaymentInfoAsDefault({
      ...req.body,
      userId: req.session?.user?.userId,
    });
    res.send(result);
  },
);

export default router;
