import { Team, User, Tour } from "../models/Models";

interface IReqEditscore {
  tour: { _id: string };
  match: { _id: string; score1: number; score2: number; result: string };
}

interface IReqSettour {
  tour_number: number;
  matches: [{ team1: String; team2: String }];
}

const countResults = (el, resultsArr) => {
  let double;

  const result = [];

  for (let i = 0; i < resultsArr.length; i++) {
    double = el.doubleMatch === i;

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
      const forecasts = [];
      data.matches.map((el, index) => {
        const team1Index = teams.findIndex((team) => team.id === el.team1);
        const team2Index = teams.findIndex((team) => team.id === el.team2);
        forecasts.push({
          doubleMatch: index,
          user1: {
            user_id: teams[team1Index].user_id,
            user_name: teams[team1Index].user_name,
          },
          user2: {
            user_id: teams[team2Index].user_id,
            user_name: teams[team2Index].user_name,
          },
        });
      });

      const matches1 = await Tour.create({
        tour_number: data.tour_number,
        matches: data.matches,
        forecasts: forecasts,
      });

      return matches1;
    } catch (e) {
      console.log(e);
    }
  }
  async editScore(data: IReqEditscore) {
    try {
      const currentTour = await Tour.findById(data.tour._id);
      const users = await User.find();
      const { matches, forecasts, tour_number } = currentTour;
      // const previousTour = await Tour.findOne({ tour_number: tour_number - 1 });
      // const previousTable = previousTour.table;

      const index = matches.findIndex((el) => el.id === data.match._id);
      matches[index].score1 = data.match.score1;
      matches[index].score2 = data.match.score2;
      matches[index].result = data.match.result;

      forecasts.map((el) => {
        for (let i = 0; i < 2; i++) {
          el.user1.user_score = countResults(el, matches);
          el.user2.user_score = countResults(el, matches);
        }
      });

      const updated = await Tour.findByIdAndUpdate(
        data.tour._id,
        {
          matches: matches,
          forecasts: forecasts,
        },
        { new: true }
      );

      return updated;
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
