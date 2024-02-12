import { Team, User, Tour } from "../models/Models";

interface IReqForecast {
  tour: { _id: string };
  forecasts: {
    user_id: string;
    user_forecast: [{ score1: number; score2: number; result: string }];
  };
}

class MatchUtils {
  async getMatches() {
    try {
      // const matches1 = await Match.find();
      // const result = []
      // matches1.map((el)=> {
      //   result.push(el.teams)
      // })
      // return result
    } catch (e) {
      console.log(e);
    }
  }
  async setForecast(data: IReqForecast) {
    try {
      const result = await Tour.findById(data.tour._id);
      const forecastsOld = result.forecasts;

      forecastsOld.map((el) => {
        if (
          el.user1.user_id === data.forecasts.user_id &&
          el.user1.user_forecast.length === 0
        )
          el.user1.user_forecast = [...data.forecasts.user_forecast];
        if (
          el.user2.user_id === data.forecasts.user_id &&
          el.user2.user_forecast.length === 0
        )
          el.user2.user_forecast = [...data.forecasts.user_forecast];
      });

      const updated_tour = await Tour.findOneAndUpdate(
        { _id: data.tour._id },
        { forecasts: forecastsOld },
        { new: true }
      );
    } catch (e) {
      console.log(e);
    }
  }
}

export default new MatchUtils();
