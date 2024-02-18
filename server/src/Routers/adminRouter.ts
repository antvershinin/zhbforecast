import { Router } from "express";
import adminController from "../controllers/adminController";

export const adminRouter = Router();

adminRouter.post("/rpl/setmatches", adminController.setRPLMatches);

adminRouter.get("/getteams", adminController.getTeams);

adminRouter.put("/rpl/editscore", adminController.editScoreRPL);

adminRouter.post("/euro/setmatches", adminController.setEUROMatches);

adminRouter.put('/euro/editscore', adminController.editScoreEuro)
