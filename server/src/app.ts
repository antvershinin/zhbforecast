import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { adminRouter } from "./routers/adminRouter";
import { userRouter } from "./routers/userRouter";
import { matchRouter } from "./routers/matchesRouter";

const DB_URL = "mongodb://127.0.0.1:27017/zhbforecast";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 1);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Length');
  res.setHeader('Access-Control-Max-Age', '3600');
  if (req.method === 'OPTIONS') {
      res.status(200).end();
  } else {
      next();
  }
});
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/matches", matchRouter);

const port = 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("New Server");
});

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL
    //   , {
    //   user: "wellik11",
    //   pass: "9885824884",
    //   authSource: "admin",
    // }
  );
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`Server running on port${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
