import { Team, User, Tour, Eurotour } from "../models/Models";

interface IReqEditscore {
  _id: string;
  score1: number;
  score2: number;
}

interface IReqSettour {
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
  async setRPLMatches(data: IReqSettour) {
    try {
      const currentTour = await Tour.findOne().sort({ tour_number: -1 });
      const teams = await Team.find();

      const previousTable = currentTour.table;
      const forecasts = [];

      data.matches.map((el, index) => {
        for (let i = 0; i < 2; i++) {
          const teamIndex = String(
            teams.findIndex((team) => team.id === el.teams[i])
          );

          forecasts.push({
            user_id: teams[teamIndex].user_id,
            user_name: teams[teamIndex].user_name,
            user_doubleMatch: index,
          });
        }
      });

      const matches1 = await Tour.create({
        tour_number: currentTour.tour_number + 1,
        matches: data.matches,
        forecasts: forecasts,
        table: previousTable,
      });

      return matches1;
    } catch (e) {
      console.log(e);
    }
  }
  async editScoreRPL(data: IReqEditscore) {
    try {
      const currentTour = await Tour.findOne().sort({ tour_number: -1 });
      const { matches, forecasts, tour_number } = currentTour;
      const previousTour = await Tour.findOne({ tour_number: tour_number - 1 });
      const previousTable = previousTour.table;

      const index = String(matches.findIndex((el) => el.id === data._id));
      matches[index].score1 = data.score1;
      matches[index].score2 = data.score2;
      (matches[index].result =
        data.score1 > data.score2
          ? "1"
          : data.score2 > data.score1
          ? "2"
          : "X"),
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
        currentTour._id,
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
  async setEUROMatches(data: IReqSettour) {
    try {
      const currentTour = await Eurotour.findOne().sort({ tour_number: -1 });
      const table = currentTour.table;
      const users = await User.find();
      const forecasts = [];
      users.map((el) => {
        if (el.euro) {
          forecasts.push({
            user_id: el._id,
            user_name: el.name,
          });
        }
      });

      const result = await Eurotour.create({
        tour_number: currentTour.tour_number + 1,
        table,
        matches: data.matches,
        forecasts,
      });
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  async editScoreEuro(data: { id: string; score1: number; score2: number }) {
    try {
      const currentTour = await Eurotour.findOne().sort({ tour_number: -1 });
      const { matches, forecasts, tour_number } = currentTour;
      const previousTour = await Eurotour.findOne({
        tour_number: tour_number - 1,
      });
      const previousTable = previousTour.table;

      const matchUpdated = {
        id: data.id,
        score1: data.score1,
        score2: data.score2,
        result:
          data.score1 > data.score2
            ? "1"
            : data.score2 > data.score1
            ? "2"
            : "X",
      };

      matches.map((el) => {
        if (el.id === matchUpdated.id) {
          (el.score1 = matchUpdated.score1),
            (el.score2 = matchUpdated.score2),
            (el.result = matchUpdated.result);
        }
      });

      forecasts.map((el) => {
        const tableIndex = previousTable.findIndex(
          (el1) => el1.user_id === el.user_id
        );
        for (let i = 0; i < matches.length; i++) {
          if (!el.user_forecast.length) return;
          let double = matches[i].is_double;
          if (el.user_forecast[i].result !== matches[i].result) {
            el.user_score[i] = 0;
          } else if (
            el.user_forecast[i].score1 === matches[i].score1 &&
            el.user_forecast[i].score2 === matches[i].score2
          ) {
            el.user_score[i] = double ? 8 : 4;
            previousTable[tableIndex].exact += 1;
          } else if (
            el.user_forecast[i].score1 - el.user_forecast[i].score2 ===
            matches[i].score1 - matches[i].score2
          ) {
            el.user_score[i] = double ? 4 : 2;
            previousTable[tableIndex].difference += 1;
          } else {
            el.user_score[i] = double ? 2 : 1;
            previousTable[tableIndex].outcome += 1;
          }
        }
        el.forecast_points = el.user_score.reduce(
          (acc, score) => acc + score,
          0
        );
        previousTable[tableIndex].forecast_points += el.forecast_points;
      });

      const result = await Eurotour.findByIdAndUpdate(currentTour._id, {
        matches,
        forecasts,
        table: previousTable,
      });

      return result;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AdminUtils();
