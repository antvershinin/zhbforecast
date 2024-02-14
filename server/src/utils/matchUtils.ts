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
}

export default new MatchUtils();
