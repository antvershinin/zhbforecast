import { Router } from "express";
import matchController from "../controllers/matchController";
export const matchRouter = Router();

matchRouter.get("/rpl/getmatches", matchController.getTour);
matchRouter.put('/rpl/setforecast', matchController.setForecast);
matchRouter.get("/euro/getmatches", matchController.getEuroMatches);
matchRouter.put('/euro/setforecast', matchController.setEuroForecast)