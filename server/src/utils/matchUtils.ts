import { Request } from "express";
import { Team, User, Tour, Eurotour } from "../models/Models";
import jwt from "jsonwebtoken";

class MatchUtils {
  async getTour(data: Request) {
    try {
      const tour = await Tour.findOne().sort({ tour_number: -1 });
      const { table, forecasts, matches } = tour;

      table.sort((a, b) => {
        return (
          b.points - a.points ||
          b.wins - a.wins ||
          b.forecast_points - a.forecast_points
        );
      });

      if (!data.headers.authorization) {
        return { tour: { table, matches } };
      }

      if (data.headers.authorization) {
        const decoded = jwt.decode(data.headers.authorization, {
          json: true,
        });

        const index = String(
          forecasts.findIndex((el) => el.user_id === decoded._id)
        );

        const filtered = forecasts.map((el) => {
          el.user_forecast.length === 0;
        });

        if (!filtered.length) {
          return { tour };
        } else if (!index) {
          return { tour: { table, matches } };
        } else if (forecasts[index].user_forecast.length === 0) {
          return { tour: { table, matches, canMakeForecast: true } };
        } else {
          return { tour: { table, matches } };
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  async setForecast(data: Request) {
    try {
      const tour = await Tour.findOne().sort({ tour_number: -1 });
      const { forecasts } = tour;

      const decoded = jwt.decode(data.headers.authorization, {
        json: true,
      });

      const forecastsUpdated = [];

      data.body.matches.map((el) => {
        forecastsUpdated.push({
          score1: el.score1,
          score2: el.score2,
          result:
            el.score1 > el.score2 ? "1" : el.score2 > el.score1 ? "2" : "X",
        });
      });

      forecasts.map((el) => {
        if (el.user_id === decoded._id) {
          el.user_forecast = forecastsUpdated;
        }
      });

      const result = await Tour.findByIdAndUpdate(
        { _id: tour._id },
        {
          forecasts,
        },
        { new: true }
      );
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  async getEUROMatches(data: Request) {
    try {
      const tour = await Eurotour.findOne().sort({ tour_number: -1 });
      const { table, matches, forecasts } = tour;

      table.sort((a, b) => {
        return (
          b.forecast_points - a.forecast_points ||
          b.exact - a.exact ||
          b.difference - a.difference ||
          b.outcome - a.outcome
        );
      });

      if (!data.headers.authorization) {
        return { tour };
      }

      if (data.headers.authorization) {
        const decoded = jwt.decode(data.headers.authorization, {
          json: true,
        });

        const index = String(
          forecasts.findIndex((el) => el.user_id === decoded._id)
        );

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
  async setEUROForcasts(data: Request) {
    try {
      const tour = await Eurotour.findOne().sort({ tour_number: -1 });

      const decoded = jwt.decode(data.headers.authorization, {
        json: true,
      });

      const forecastsUpdated = [];

      data.body.matches.map((el) => {
        forecastsUpdated.push({
          score1: el.score1,
          score2: el.score2,
          result:
            el.score1 > el.score2 ? "1" : el.score2 > el.score1 ? "2" : "X",
        });
      });

      const { forecasts, matches } = tour;

      forecasts.map((el) => {
        if (el.user_id === decoded._id) {
          el.user_forecast = forecastsUpdated;
        }
      });

      const filtered = forecasts.map((el) => {
        el.user_forecast.length === 0;
      });

      if (!filtered.length) {
        const double = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
        matches[double - 1].is_double = true;
      }

      const result = await Eurotour.findByIdAndUpdate(
        { _id: tour._id },
        {
          forecasts,
          matches,
        },
        { new: true }
      );
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new MatchUtils();
