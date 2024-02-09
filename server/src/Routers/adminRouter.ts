import { Router } from "express";
import adminController from "../controllers/adminController";

export const adminRouter = Router();

adminRouter.post("/setmatches", adminController.setMatches);

adminRouter.get("/getteams", adminController.getTeams);
