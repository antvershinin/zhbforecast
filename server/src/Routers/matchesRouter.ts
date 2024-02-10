import { Router } from "express";
import matchController from '../controllers/matchController'
export const matchRouter = Router();

matchRouter.get('/getmatches', matchController.getMatches)
matchRouter.post('/setforecast', matchController.setForecast)