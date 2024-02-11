import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { adminRouter } from "./Routers/adminRouter";
import { userRouter } from "./Routers/userRouter";
import { matchRouter } from "./Routers/matchesRouter";

const DB_URL = "mongodb://127.0.0.1:27017/zhbforecast";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/matches", matchRouter)

const port = 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("New Server");
});

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`Server running on port${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
