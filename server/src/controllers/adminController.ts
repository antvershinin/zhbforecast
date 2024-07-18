import { Request, Response } from "express";
import adminUtils from "../utils/adminUtils";

class AdminController {
  async setRPLMatches(req: Request, res: Response) {
    try {
      const data = await adminUtils.setRPLMatches(req.body);
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  }

  async getTeams(req: Request, res: Response) {
    try {
      const data = await adminUtils.getTeams();
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  }

  async setTourWinner(req:Request, res:Response) {
    try {
      const data = await adminUtils.setTourWinner(req.body)
      res.send(data) 
    } catch (e) {
      console.log(e)
    }
  }

  async editScoreRPL(req: Request, res: Response) {
    try {
      const data = await adminUtils.editScoreRPL(req.body.match);
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  }

  async setEUROMatches(req: Request, res: Response) {
    try {
      const data = await adminUtils.setEUROMatches(req.body);
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  }
  
  async editScoreEuro(req:Request, res:Response) {
    try {
      const data = await adminUtils.editScoreEuro(req.body)
      res.send('success')
    } catch (e) {
      console.log(e)
    }
  }

  async setEuro24Matches(req:Request, res:Response) {
    try {
    const data = await adminUtils.setEURO24Matches(req.body)
    res.send(data)
    } catch (e) {
      console.log(e)
    }
  }

  async editScoreEuro24(req:Request, res:Response) {
    try {
      const data = await adminUtils.editScoreEuro24(req.body)
      res.send(data)
    } catch (e) {
      console.log(e)
    }
  }
}

export default new AdminController();
