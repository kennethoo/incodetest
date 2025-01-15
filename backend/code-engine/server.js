import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app = express();
import serverC from "http";
import engineRouter from "./router/engineRouter.js";
import auth from "./router/auth.js";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
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
  })
);

app.use(cors());
app.use(engineRouter);
app.use(auth);

app.get("/", function (req, res) {
  res.send("Hello how are you ? v3");
});

server.listen(process.env.PORT);
