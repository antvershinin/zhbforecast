import { Request, Response } from "express";
import { Team } from "../models/Models";
import adminUtils from "../utils/admin/adminUtils";

class AdminController {
  async setMatches(req: Request, res: Response) {
    try {
      const data = await adminUtils.setMatches(req.body);
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
}

export default new AdminController();
