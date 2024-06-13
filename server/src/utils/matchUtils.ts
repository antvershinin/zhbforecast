import e, { Request } from "express";
import { Team, User, Tour, Eurotour, Euro24Tour } from "../models/Models";
import jwt from "jsonwebtoken";
import { sortPlayers } from "./helpers";

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

      let decoded

      if (data.headers.authorization) {
        decoded = jwt.decode(data.headers.authorization, {
          json: true,
        });

        const index = String(
          forecasts.findIndex((el) => el.user_id === decoded._id)
        );

        const filtered = []; 
 
        forecasts.map((el) => {
          if (el.user_forecast.length === 0) filtered.push(el);
        });

        if (!filtered.length) {
          return { tour };
        } else if (!index || !decoded._id) {
          return { tour: { table, matches } };
        } else if (forecasts[index].user_forecast.length === 0) {
          return { tour: { table, matches, canMakeForecast: true } };
        } else if (forecasts[index].user_forecast.length !== 0) {
          return { tour: { table, matches, missed_forecasts : filtered, forecasts: [forecasts[index]] } };
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

      const filtered = [];

      forecasts.map((el) => {
        if (el.user_forecast.length === 0) filtered.push(el);
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
  async getEURO24Matches(data: Request) {
    try {
      const tour = await Euro24Tour.findOne().sort({ tour_number: -1 });
      const { table, matches, forecasts } = tour;
      const is_playoff = tour.tour_number > 3
      const quaterFinals = tour.tour_number === 4;
      const semiFinals = tour.tour_number === 5;
      const finals = tour.tour_number === 6;
      const quaterfinalTour = await Euro24Tour.findOne({tour_number:4})
      const semifinalTour = await Euro24Tour.findOne({tour_number:5})
      const finalTour = await Euro24Tour.findOne({tour_number:6})
      const groupTour = await Euro24Tour.findOne({tour_number:3})

      const groupTourSorted = groupTour && sortPlayers('group', groupTour.table, groupTour.forecasts)
      const quaterfinalTourSorted = quaterfinalTour && sortPlayers('quaterfinals', quaterfinalTour.table, quaterfinalTour.forecasts) 
      const semifinalTourSorted = semifinalTour && sortPlayers('semifinals', semifinalTour.table, quaterfinalTour.forecasts) 
      const finalTourSorted = finalTour && sortPlayers('finals', finalTour.table, finalTour.forecasts) 

      const groupTable = groupTourSorted?.sortedTable
      const playoffTable = {qt : quaterfinalTourSorted?.sortedTable, sm : semifinalTourSorted?.sortedTable, fn : finalTourSorted?.sortedTable} 

      const sorted = sortPlayers(
        !is_playoff ? 'group' :
        quaterFinals
          ? "quaterfinals"
          : semiFinals
          ? "semifinals"
          : finals
          ? "finals"
          : "group",
        tour.table,
        tour.forecasts
      );

      const {sortedTable, sortedForecasts} = sorted

      let decoded

      if (!data.headers.authorization) {
        return { tour : {matches}, sortedTable, playoffTable};
      }
     
   
      if (data.headers.authorization) {
        decoded = jwt.decode(data.headers.authorization, {
          json: true,
        });

        const index = String(
          forecasts.findIndex((el) => el.user_id === decoded._id)
        );

        const filtered = [];

        forecasts.map((el) => {
          if (el.user_forecast.length === 0) filtered.push(el);
        });

        if (index === '-1') {
          if (filtered.length) {
            return {tour: {matches, tour_number : tour.tour_number},playoffTable, missed_forecasts : filtered, groupTable, sortedTable}
          } else {
            return {tour, sortedTable,playoffTable, groupTable, sortedForecasts, missed_forecasts : filtered}
          }
        } else 
        {if (!filtered.length) {
          return { tour, sortedTable, playoffTable, sortedForecasts, groupTable};
        } else if (forecasts[index].user_forecast.length === 0) {
          return { tour: { matches, tour_number : tour.tour_number}, canMakeForecast: true, sortedTable , playoffTable, groupTable };
        } else if (forecasts[index].user_forecast.length !== 0) {
          return { tour: { matches,tour_number : tour.tour_number, missed_forecasts : filtered, forecasts: [forecasts[index]] },playoffTable, groupTable, sortedTable };
        } else {
          return { tour: { table, matches, tour_number : tour.tour_number }, missed_forecasts : filtered, sortedTable, playoffTable, groupTable };
        }
      }}
    } catch (e) {
      console.log(e);
    }
  }
  async setEURO24Forcasts(data: Request) {

    try {
      const tour = await Euro24Tour.findOne().sort({ tour_number: -1 });

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

      const filtered = [];

      forecasts.map((el) => {
        if (el.user_forecast.length === 0) filtered.push(el);
      });

      const result = await Euro24Tour.findByIdAndUpdate(
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
