import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Team } from "./Models";
import { Match } from "./Models";

const DB_URL = "mongodb://127.0.0.1:27017/zhbforecast";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get("/getteams", async (req, res) => {
  try {
    const { teamname } = req.query;
    const data = await Team.find({ id: teamname });
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

app.post("/setmatches", async (req, res) => {
  try {
    await Match.insertMany(req.body);
    console.log(req.body);
    res.send("Added Succesfully");
  } catch (e) {
    console.log(e);
  }
});

app.get("/getmatches", async (req, res) => {
  try {
    const result = await Match.find();
    res.send(result);
  } catch (e) {
    console.log(e);
  }
});

startApp();
