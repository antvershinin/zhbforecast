import { Match, Team, User, Forecast } from "../models/Models";

// const countResults = (el, resultsArr) => {

//   let double 


//   for (let i = 0; i < resultsArr.length; i++) {
//     double = el.user_id === resultsArr[i].users[0] || el.user_id === resultsArr[i].users[1]
//     if (el.user_forecast[i].result !== resultsArr[i].result)
//       el.user_score[i] = 0;
//     else if (
//       el.user_forecast[i].score1 === resultsArr[i].score1 &&
//       el.user_forecast[i].score2 === resultsArr[i].score2
//     )
//     el.user_score[i] = double ? 10 : 5;
//     else if (
//       Number(el.user_forecast[i].score1) - Number(el.user_forecast[i].score2) ==
//       Number(resultsArr[i].score1) - Number(resultsArr[i].score2)
//     )
//     el.user_score[i] = double ? 4 : 2;
//     else el.user_score[i] = double ? 2 : 1;
//   }  
//   return el.user_score
//   } 

class MatchUtils {
  async getMatches() {
    try {
      const matches1 = await Match.find();
      const result = []
      matches1.map((el)=> {
        result.push(el.teams)
      })
   
      return result
    } catch (e) {
      console.log(e);
    }
  }
  async setForecast(data) {
    try {
      const matches = await Match.find()
      const result = await Forecast.create({user_id : data.user_id, user_forecast:data.user_forecast, matches : matches})
        
        return result
    } catch (e) {
        console.log(e)
    }
    
  }
}

export default new MatchUtils();
