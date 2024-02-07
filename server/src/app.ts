import express, { Request, Response } from "express";
import { getTeams } from "./api/api";
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("hui");
});

app.get("/database", (req: Request, res) => {
  const getData = async () => {
    const data = await getTeams();

    res.send(data.data);
  };
  getData();
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});
