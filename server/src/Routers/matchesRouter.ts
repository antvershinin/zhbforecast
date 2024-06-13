import { Router } from "express";
import matchController from "../controllers/matchController";
export const matchRouter = Router();

matchRouter.get("/rpl/getmatches", matchController.getTour);
matchRouter.put('/rpl/setforecast', matchController.setForecast);
matchRouter.get("/euro/getmatches", matchController.getEuroMatches);
matchRouter.put('/euro/setforecast', matchController.setEuroForecast)
matchRouter.get('/euro24/getmatches', matchController.getEuro24Matches)
matchRouter.put('/euro24/setforecast', matchController.setEuro24Forecast)
