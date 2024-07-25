import { Team, User, Tour, Eurotour, Euro24Tour } from "../models/Models";
import { sortPlayers } from "./helpers";


interface IReqEditscore {
  id: string;
  score1: number;
  score2: number;
}

interface IReqSettour {
  matches: [{ teams: [String]; teams_names: [string] }];
}

class AdminUtils {
  async setRPLMatches(data: IReqSettour) {
    try {
      const currentTour = await Tour.findOne().sort({ tour_number: -1 });
      const teams = await Team.find();

      const previousTable = currentTour.table;
      const forecasts = [];
      const matchesUpdated = [];

      currentTour.forecasts.forEach((el, ind)=>{
        const index = previousTable.findIndex(user=>el.user_id === user.user_id)
        const tumbler = ind === 0 || ind % 2 === 0 ? ind + 1 : ind - 1
        previousTable[index].matches.push({
          user1 : el.user_name,
          score1 : el.forecast_points,
          user2 : currentTour.forecasts[tumbler].user_name,
          score2 : currentTour.forecasts[tumbler].forecast_points,
        })
      })


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


      const index = String(matches.findIndex((el) => el.id === data.id));
      matches[index].score1 = Number(data.score1);
      matches[index].score2 = Number(data.score2);
      (matches[index].result =
        data.score1 > data.score2
          ? "1"
          : data.score2 > data.score1
          ? "2"
          : "X"),
        forecasts.map((el) => {
          if (!el.user_forecast.length) return;
          let double;

          for (let i = 0; i < matches.length; i++) {
            double = el.user_doubleMatch === i;
            if (
              el.user_forecast[i].result !== matches[i].result &&
              matches[i].result !== ""
            )
              el.user_score[i] = 0;
            else if (
              el.user_forecast[i].score1 === matches[i].score1 &&
              el.user_forecast[i].score2 === matches[i].score2 &&
              matches[i].result !== ""
            )
              el.user_score[i] = double ? 8 : 4;
            else if (
              Number(el.user_forecast[i].score1) - 
                Number(el.user_forecast[i].score2) ==
                Number(matches[i].score1) - Number(matches[i].score2) &&
              matches[i].result !== ""
            )
              el.user_score[i] = double ? 4 : 2;
            else if (matches[i].result !== "")
              el.user_score[i] = double ? 2 : 1;
          }
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

  async setTourWinner(id) {
    try {
      const currentTour = await Tour.findOne().sort({ tour_number: -1 });
      const {table} = currentTour
      table.map(el=> {
        if (el.user_id === id.id) el.tours += 1
      })

      const updated = await Tour.findByIdAndUpdate(
        currentTour._id,
        {
          table,
        },
        { new: true }
      );

      return updated

    } catch (e) {
      console.log(e)
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
          let double = matches[i].is_double;
          if (
            el.user_forecast[i].result !== matches[i].result &&
            matches[i].result !== ""
          ) {
            el.user_score[i] = 0;
          } else if (
            el.user_forecast[i].score1 === matches[i].score1 &&
            el.user_forecast[i].score2 === matches[i].score2 &&
            matches[i].result !== ""
          ) {
            el.user_score[i] = double ? 8 : 4;
            previousTable[tableIndex].exact += 1;
          } else if (
            el.user_forecast[i].score1 - el.user_forecast[i].score2 ===
              matches[i].score1 - matches[i].score2 &&
            matches[i].result !== ""
          ) {
            el.user_score[i] = double ? 4 : 2;
            previousTable[tableIndex].difference += 1;
          } else if (matches[i].result !== "") {
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
  async setEURO24Matches(data: IReqSettour) {
    try {
      const currentTour = await Euro24Tour.findOne().sort({ tour_number: -1 });
      const is_groupStage = currentTour.tour_number < 3;
      const quaterFinals = currentTour.tour_number === 3;
      const semiFinals = currentTour.tour_number === 4;
      const finals = currentTour.tour_number === 5;
      const forecasts = [];

      const sorted = sortPlayers(
        quaterFinals
          ? "group"
          : semiFinals
          ? "quaterfinals"
          : finals
          ? "semifinals"
          : "group",
        currentTour.table,
        currentTour.forecasts
      );

      if (!is_groupStage) {
      if (quaterFinals) {
        sorted.sortedTable.map((el, index) => {
          if (index === 0) {
            el[0].user_euro24_progress = "TPL0";
            el[1].user_euro24_progress = "TPR2";
            el[2].user_euro24_progress = "BTL0";
            el[3].user_euro24_progress = "BTR2";
          } else if (index === 1) {
            el[0].user_euro24_progress = "TPR2";
            el[1].user_euro24_progress = "TPL0";
            el[2].user_euro24_progress = "BTR2";
            el[3].user_euro24_progress = "BTL0";
          } else if (index === 2) {
            el[0].user_euro24_progress = "TPL1";
            el[1].user_euro24_progress = "TPR3";
            el[2].user_euro24_progress = "BTL1";
            el[3].user_euro24_progress = "BTR3";
          } else {
            el[0].user_euro24_progress = "TPR3";
            el[1].user_euro24_progress = "TPL1";
            el[2].user_euro24_progress = "BTR3";
            el[3].user_euro24_progress = "BTL1";
          }
        })} else if (semiFinals) {
          sorted.sortedTable.map((el, index)=>{
            if (index === 0 || index === 1) {
              el[0].user_euro24_progress = "TPLSE"
            } else if (index === 2 || index === 3) {
              el[0].user_euro24_progress = 'TPRSE'
            } else if (index === 4 || index === 5) {
              el[0].user_euro24_progress = 'BTLSE'
            } else if (index === 6 || index === 7) {
              el[0].user_euro24_progress = 'BTRSE'
            }
          })
        } else if (finals) {
          sorted.sortedTable.map((el, index)=>{
            if (index === 0 || index === 1) {
              el[0].user_euro24_progress = 'TOPFIN'
            } else if (index === 2 || index === 3) {
              el[0].user_euro24_progress = 'BOTFIN'
            }
          })
        }

        sorted.sortedTable.map(async (el) => {
          el.map(
            async (el1) =>
              await User.findByIdAndUpdate(el1.user_id, {
                euro24: el1.user_euro24_progress,
              })
          );
        });
      }

      const users = await User.find();

      const table = is_groupStage ? currentTour.table : [];

      users.map(async (el) => {
        if (el.euro24 !== "") {
          if (is_groupStage) {
            forecasts.push({
              user_id: el._id,
              user_name: el.name,
              user_euro24_progress: el.euro24,
            });
          } else {
            el.euro24.length === currentTour.tour_number + 1 &&
              forecasts.push({
                user_id: el._id,
                user_name: el.name,
                user_euro24_progress: el.euro24,
              }) &&
              table.push({
                user_id: el._id,
                user_name: el.name,
                user_euro24_progress: el.euro24,
              }) && await Euro24Tour.findOneAndUpdate({tour_number:0}, {table})
          }
        }
      });

      const result = await Euro24Tour.create({
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
  async editScoreEuro24(data: { id: string; score1: number; score2: number }) {
    try {
      const currentTour = await Euro24Tour.findOne().sort({ tour_number: -1 });
      const { matches, forecasts, tour_number } = currentTour;
      const previousTour = await Euro24Tour.findOne({
        tour_number: tour_number - 1,
      });
      const baseTour = await Euro24Tour.findOne({tour_number:0})
      const previousTable =
        currentTour.tour_number < 4 ? previousTour.table : baseTour.table;

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
          let double = matches[i].is_double;
          if (
            el.user_forecast[i].result !== matches[i].result &&
            matches[i].result !== ""
          ) {
            el.user_score[i] = 0;
          } else if (
            el.user_forecast[i].score1 === matches[i].score1 &&
            el.user_forecast[i].score2 === matches[i].score2 &&
            matches[i].result !== ""
          ) {
            el.user_score[i] = double ? 10 : 5;
            previousTable[tableIndex].exact += 1;
          } else if (
            el.user_forecast[i].score1 - el.user_forecast[i].score2 ===
              matches[i].score1 - matches[i].score2 &&
            matches[i].result !== ""
          ) {
            el.user_score[i] = double ? 4 : 2;
            previousTable[tableIndex].difference += 1;
          } else if (matches[i].result !== "") {
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

      const result = await Euro24Tour.findByIdAndUpdate(currentTour._id, {
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
