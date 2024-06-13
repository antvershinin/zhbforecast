import { Request, Response } from "express";
import matchUtils from "../utils/matchUtils";

class MatchController {
  async getTour(req: Request, res: Response) {
    try {
      const data = await matchUtils.getTour(req);
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  }
  async setForecast(req: Request, res: Response) {
    try {
      const result = matchUtils.setForecast(req);
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
  async setEuroForecast(req: Request, res: Response) {
    try {
      const result = await matchUtils.setEUROForcasts(req);
      res.send(result);
    } catch (e) {
      console.log(e);
    }
  }
  async getEuro24Matches(req: Request, res: Response) {
    try {
      const result = await matchUtils.getEURO24Matches(req);
      res.json(result);
    } catch (e) {
      console.log(e);
    }
  }
  async setEuro24Forecast(req: Request, res: Response) {
    try {
      const result = await matchUtils.setEURO24Forcasts(req);
      res.send(result);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new MatchController();
