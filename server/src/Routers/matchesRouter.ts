import { Router } from "express";
import matchController from "../controllers/matchController";
export const matchRouter = Router();

matchRouter.get("/getmatches", matchController.getMatches);
matchRouter.put("/setforecast", matchController.setForecast);
matchRouter.get("/euro/getmatches", matchController.getEuroMatches);
matchRouter.put('/euro/setforecast', matchController.setEuroForecast)