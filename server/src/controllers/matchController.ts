import { Request, Response } from "express";
import matchUtils from "../utils/matchUtils";

class MatchController {
  async getMatches(req: Request, res: Response) {
    try {
      const data = await matchUtils.getMatches();
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  }
  async setForecast(req: Request, res: Response) {
        try {
          const result = matchUtils.setForecast(req.body)
          res.send(result)
        } catch (e) {
          console.log(e)
        }
  }

}

export default new MatchController();