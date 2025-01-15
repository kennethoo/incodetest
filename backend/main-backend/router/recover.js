import express from "express";
const router = express.Router();
import Recover from "../models/recover.js";
import sendCode from "../emails/sendCode.js";

router.post("/api/v1/requestverificationcode", (req, res) => {
  Recover.findOne({ email: req.body.email }).then((result) => {
    if (result) {
      result.code = Math.floor(100000 + Math.random() * 900000);
      result.save().then((result) => {
        sendCode(result);
        res.send({ succeeded: true });
      });
    } else {
      Recover.create({
        email: req.body.email,
        code: Math.floor(100000 + Math.random() * 900000),
      }).then((result) => {
        if (result) {
          sendCode(result);
          res.send({ succeeded: true });
        } else {
        }
      });
    }
  });
});

router.post("/api/v1/validate-verification-code", (req, res) => {
  Recover.findOne({ email: req.body.email }).then((result) => {
    if (result) {
      if (result.code === req.body.code) {
        res.send({ succeeded: true, message: "" });
      } else {
        res.send({ succeeded: false, message: "wrong code" });
      }
    } else {
      res.send({ succeeded: false, message: "no code" });
    }
  });
});

export default router;
