import { Team, User, Tour } from "../models/Models";

interface IReqEditscore {
  tour: { _id: string };
  match: { _id: string; score1: number; score2: number; result: string };
}

interface IReqSettour {
  tour_number: number;
  matches: [{ teams: [String] }];
}

const countResults = (el, resultsArr) => {
  let double;

  const result = [];

  for (let i = 0; i < resultsArr.length; i++) {
    double = el.user_doubleMatch === i;

    if (el.user_forecast[i].result !== resultsArr[i].result) result[i] = 0;
    else if (
      el.user_forecast[i].score1 === resultsArr[i].score1 &&
      el.user_forecast[i].score2 === resultsArr[i].score2
    )
      result[i] = double ? 10 : 5;
    else if (
      Number(el.user_forecast[i].score1) - Number(el.user_forecast[i].score2) ==
      Number(resultsArr[i].score1) - Number(resultsArr[i].score2)
    )
      result[i] = double ? 4 : 2;
    else result[i] = double ? 2 : 1;
  }
  return result;
};

class AdminUtils {
  async setMatches(data: IReqSettour) {
    try {
      const teams = await Team.find();
      const previousTour = await Tour.findOne({
        tour_number: data.tour_number - 1,
      });
      const previousTable = previousTour.table;
      const forecasts = [];

      data.matches.map((el, index) => {
        for (let i = 0; i < 2; i++) {
          const teamIndex = teams.findIndex((team) => team.id === el.teams[i]);

          forecasts.push({
            user_id: teams[teamIndex].user_id,
            user_name: teams[teamIndex].user_name,
            user_doubleMatch: index,
          });
        }
      });

      const matches1 = await Tour.create({
        tour_number: data.tour_number,
        matches: data.matches,
        forecasts: forecasts,
        table: previousTable,
      });

      return matches1;
    } catch (e) {
      console.log(e);
    }
  }
  async editScore(data: IReqEditscore) {
    try {
      const currentTour = await Tour.findById(data.tour._id);
      const { matches, forecasts, tour_number } = currentTour;
      const previousTour = await Tour.findOne({ tour_number: tour_number - 1 });
      const previousTable = previousTour.table;

      const index = matches.findIndex((el) => el.id === data.match._id);
      matches[index].score1 = data.match.score1;
      matches[index].score2 = data.match.score2;
      matches[index].result = data.match.result;

      forecasts.map((el) => {
        el.user_score = countResults(el, matches);
        el.forecast_points = el.user_score.reduce(
          (acc, score) => acc + score,
          0
        );
      });

      for (let i = 0; i < forecasts.length; i += 2) {
        const index0 = previousTable.findIndex(
          (el) => el.user_id === forecasts[i].user_id
        );
        const index1 = previousTable.findIndex(
          (el) => el.user_id === forecasts[i + 1].user_id
        );
        if (forecasts[i].forecast_points === forecasts[i + 1].forecast_points) {
          previousTable[index0].draws += 1;
          previousTable[index1].draws += 1;
        } else if (
          forecasts[i].forecast_points > forecasts[i + 1].forecast_points
        ) {
          previousTable[index0].wins += 1;
          previousTable[index1].losses += 1;
        } else {
          previousTable[index0].losses += 1;
          previousTable[index1].wins += 1;
        }
        previousTable[index0].forecast_points += forecasts[i].forecast_points;
        previousTable[index1].forecast_points +=
          forecasts[i + 1].forecast_points;
      }

      previousTable.map((el) => {
        el.points = el.wins * 3 + el.draws;
      });

      const updated = await Tour.findByIdAndUpdate(
        data.tour._id,
        {
          matches: matches,
          forecasts: forecasts,
          table: previousTable,
        },
        { new: true }
      );

      return updated.table;
    } catch (e) {
      console.log(e);
    }
  }
  async getTeams() {
    try {
      const data = await Team.find();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AdminUtils();
