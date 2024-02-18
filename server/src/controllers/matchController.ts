import { Request, Response } from "express";
import matchUtils from "../utils/matchUtils";

class MatchController {
  async getMatches(req: Request, res: Response) {
    try {
      const data = await matchUtils.getMatches(req.headers.authorization);
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  }
  async setForecast(req: Request, res: Response) {
    try {
      const result = matchUtils.setForecast(req.body);
      res.send(result);
    } catch (e) {
      console.log(e);
    }
  }
  async getEuroMatches(req: Request, res: Response) {
    try {
      const result = await matchUtils.getEUROMatches(req);
      res.json(result);
    } catch (e) {
      console.log(e);
    }
  }
  async setEuroForecast(req:Request, res:Response) {
    try {
      const result = await matchUtils.setEUROForcasts(req.body)
      res.send(result)
    } catch (e) {
      console.log(e)
    }
  }
}

export default new MatchController();
