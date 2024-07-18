import { Router } from "express";
import adminController from "../controllers/adminController";

export const adminRouter = Router();

adminRouter.post("/rpl/setmatches", adminController.setRPLMatches);

adminRouter.get("/getteams", adminController.getTeams);

adminRouter.put("/rpl/editscore", adminController.editScoreRPL);

adminRouter.put('/rpl/settourwinner', adminController.setTourWinner)

adminRouter.post("/euro/setmatches", adminController.setEUROMatches);

adminRouter.put('/euro/editscore', adminController.editScoreEuro)

adminRouter.post('/euro24/setmatches', adminController.setEuro24Matches)

adminRouter.put('/euro24/editscore', adminController.editScoreEuro24)

