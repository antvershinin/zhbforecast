import { Request } from "express";
import { Team, User, Tour, Eurotour } from "../models/Models";
import jwt from "jsonwebtoken";

interface IReqForecast {
  tour: { _id: string };
  forecasts: {
    user_id: string;
    user_forecast: [{ score1: number; score2: number; result: string }];
  };
}

class MatchUtils {
  async getMatches(data) {
    try {
      const matches1 = await Tour.findOne().sort({ tour_number: -1 });

      return matches1;
    } catch (e) {
      console.log(e);
    }
  }
  async setForecast(data: IReqForecast) {
    try {
      const result = await Tour.findById(data.tour._id);
      const { forecasts } = result;
      forecasts.map((el) => {
        if (el.user_id === data.forecasts.user_id && !el.user_forecast.length) {
          el.user_forecast = data.forecasts.user_forecast;
        }
      });
      await Tour.findOneAndUpdate(
        { _id: data.tour._id },
        { forecasts: forecasts },
        { new: true }
      );
    } catch (e) {
      console.log(e);
    }
  }
  async getEUROMatches(data: Request) {
    try {
      const tour = await Eurotour.findOne().sort({ tour_number: -1 });
      const { table, matches, forecasts } = tour;

      if (!data.headers.authorization) {
        return { table };
      }

      console.log(data.headers.authorization);

      if (data.headers.authorization) {
        const decoded = jwt.decode(data.headers.authorization, {
          json: true,
        });

        const index = forecasts.findIndex((el) => el.user_id === decoded._id);

        if (!index) {
          return { table };
        } else if (forecasts[index].user_forecast.length === 0) {
          return { tour, canMakeForecast: true };
        } else {
          return { tour };
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new MatchUtils();
