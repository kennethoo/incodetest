import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app = express();
import serverC from "http";
import engineRouter from "./router/engineRouter.js";
import usersRoute from "./router/usersRoute.js";
import recover from "./router/recover.js";
import auth from "./router/auth.js";
import payment from "./router/payment.js";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import logger from "./application/systemReport/Logger.js";
import repositoryRouter from "./router/repositoryRouter.js";
import backgroundJob from "./cron/backgrongJob.js";
import reachout from "./scripts/reachout.js";
import codingSessionRouter from "./router/codingSessionRouter.js";
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = serverC.createServer(app);

app.use(express.json());
app.use(
  expressSession({
    name: process.env.NAME,
    secret: process.env.SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.DB,
      stringify: false,
      ttl: 14 * 24 * 60 * 60 * 60 * 60 * 60 * 60,
      autoRemove: "native",
    }),
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: true,
      maxAge: 100000000000000,
    },
  }),
);

app.use(cors());
app.use(engineRouter);
app.use(usersRoute);
app.use(auth);
app.use(recover);
app.use(payment);
app.use(repositoryRouter);
app.use(codingSessionRouter);

app.post("/api/v1/log/data", async (req, res) => {
  const result = await logger.log(req.body);
  res.send(result);
});

app.get("/", function (req, res) {
  res.send("Hello how are you ?");
});
backgroundJob();
// reachout();
server.listen(process.env.PORT);
