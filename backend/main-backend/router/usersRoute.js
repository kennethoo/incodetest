import express from "express";
const router = express.Router();
import User from "../models/sighup.js";
import { UserManager } from "../application/user.js";
import { UserProfile, userProfileManager } from "../application/userProfile.js";
import checkSession from "../checkUserSession/checkUserSession.js";
import Session from "../models/session.js";
import AWS from "aws-sdk";
import { meetumCodeSubscriptionApi } from "../application/meettumSubscription.js";
import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuidv4 } from "uuid";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
});
let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "meettumdev",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${uuidv4()}.${file.mimetype.split("/")[1]}`);
    },
  }),
});

router.post("/api/update-username", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      res.send({ succeeded: false, message: "change it" });
    } else {
      await User.findOneAndUpdate(
        { email: req.body.email },
        { username: req.body.username }
      );
      await UserProfile.findOneAndUpdate(
        { email: req.body.email },
        { username: req.body.username }
      );
      res.send({ succeeded: true, username: req.body.username });
    }
  } catch (err) {
    return;
  }
});

router.get(
  "/api/check-in-about-him/her/:id/:data",
  checkSession,
  async (req, res) => {
    try {
      const result = await UserProfile.findOne({ userId: req.params.id });
      if (result) {
        res.send({ fullName: result.fullName });
      }
    } catch (err) {
      return;
    }
  }
);

router.get("/api/icon/:id", (req, res) => {
  UserProfile.findOne({ userId: req.params.id }).then((result) => {
    if (result) {
      res.send(result.profile);
    } else {
      res.send({ succeeded: false });
    }
  });
});

router.get("/api/icon/:id", (req, res) => {
  UserProfile.findOne({ userId: req.params.id }).then((result) => {
    if (result) {
      res.send(result.profile);
    } else {
      res.send({ succeeded: false });
    }
  });
});
router.get("/api/userinfo/:id", (req, res) => {
  UserProfile.findOne({ userId: req.params.id }).then((result) => {
    if (result) {
      res.send({
        succeeded: true,
        username: result.username,
        timeZone: result.timeZone,
        email: result.email,
        isAdmin: result.isAdmin,
        profile: result.profile,
        bio: result.bio,
        fullName: result.fullName,
      });
    } else {
      res.send({ succeeded: false, errorMessage: "user not found" });
    }
  });
});

router.get("/api/v1/search/user/:query", async (req, res) => {
  const query = JSON.parse(req.params.query);
  const result =
    await userProfileManager.searchUserProfileByUserIdOrUsername(query);
  res.send(result);
});

router.get("/api/getid/:id", (req, res) => {
  UserProfile.findOne({ userId: req.params.id }).then((result) => {
    res.send(result);
  });
});

router.get("/api/profile/:name", (req, res) => {
  UserProfile.findOne({ userId: req.params.name }).then((result) => {
    res.send(result);
  });
});

router.get("/api/recentProfile/:id", (req, res) => {
  UserProfile.findOne({ userId: req.params.id }).then((result) => {
    res.send(result);
  });
});
router.post("/api/edit/update-profile", (req, res) => {
  UserProfile.findOne({ userId: req.session.user?.userId }).then((result) => {
    if (result) {
      result.username = req.body.username;
      result.bio = req.body.bio;
      result.website = req.body.website;
      result.save().then((record) => {
        res.send(record);
      });
    }
  });
});
router.get("/api/accountt/:id", (req, res) => {
  if (req.session.user) {
    UserProfile.findOne({ userId: req.session.user?.userId }).then((data) => {
      UserProfile.findOne({ username: req.params.id }).then((result) => {
        if (result) {
          res.send(result);
        } else {
          res.send(JSON.stringify("No user"));
        }
      });
    });
  } else {
  }
});

router.post("/api/remove-profile", checkSession, (req, res) => {
  UserProfile.findOneAndUpdate(
    { userId: req.body.userId },
    { profile: "" },
    { new: true }
  ).then((result) => {
    res.send(result);
  });
});

router.post("/api/remove-banner", (req, res) => {
  UserProfile.findOneAndUpdate(
    { userId: req.body.userId },
    { banner: "" },
    { new: true }
  ).then((result) => {
    res.send(result);
  });
});

router.get("/api/v1/delete/account", checkSession, async (req, res) => {
  try {
    const id = req.session?.user?.userId;
    const userManager = new UserManager(id);
    const result = userManager.deleteAccount();
    req.session.destroy();
    await Session.deleteMany({ "session.user.userId": id });
    res.send(result);
  } catch (error) {
    res.send({ succeeded: false, errorMessage: error.message });
  }
});
router.post("/api/profile/image", upload.single("file"), async (req, res) => {
  const file = req.file.location;
  await UserProfile.findOneAndUpdate(
    { userId: req.body.userId },
    { profile: file },
    { new: true }
  );
  res.send({ succeeded: true, profileUrl: file });
});

router.post("/api/profile/remove", checkSession, async (req, res) => {
  try {
    await UserProfile.findOneAndUpdate(
      { userId: req.session?.user?.userId },
      { profile: "" },
      { new: true }
    );
    res.send({ succeeded: true });
  } catch (error) {
    res.send({ succeeded: false, errorMessage: error.message });
  }
});

router.get("/api/v1/user/subscription", checkSession, async (req, res) => {
  const result = await meetumCodeSubscriptionApi.getUserSuScription(
    req.session?.user?.userId
  );
  res.send(result);
});

router.post(
  "/api/v1/user/subscription/cancel",
  checkSession,
  async (req, res) => {
    const result = await meetumCodeSubscriptionApi.cancelUserSubScrio(
      req.session?.user?.userId,
      req.body
    );
    res.send(result);
  }
);
router.post("/api/update-my-info-for-myprofile", (req, res) => {
  UserProfile.findOne({ userId: req.body.userId })
    .then((result) => {
      if (result) {
        result.fullName = req.body.fullName;
        result.website = req.body.website;
        result.bio = req.body.bio;
        result.timeZone = req.body.timeZone;
        result
          .save()
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            return;
          });
      } else {
      }
    })
    .catch((err) => {
      return;
    });
});

export default router;
