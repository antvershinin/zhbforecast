import { Match, Team, User, Forecast } from "../../models/Models";

const countResults = (el, resultsArr) => {

  let double 
 
  const result = {
    user_id : el.user_id,
    user_score : []}
  
  for (let i = 0; i < resultsArr.length; i++) {
    double = el.user_id === resultsArr[i].users[0] || el.user_id === resultsArr[i].users[1]
    if (el.user_forecast[i].result !== resultsArr[i].result)
      result.user_score[i] = 0;
    else if (
      el.user_forecast[i].score1 === resultsArr[i].score1 &&
      el.user_forecast[i].score2 === resultsArr[i].score2
    )
    result.user_score[i] = double ? 10 : 5;
    else if (
      Number(el.user_forecast[i].score1) - Number(el.user_forecast[i].score2) ==
      Number(resultsArr[i].score1) - Number(resultsArr[i].score2)
    )
    result.user_score[i] = double ? 4 : 2;
    else result.user_score[i] = double ? 2 : 1;
  }  
  return result
  } 

class AdminUtils {
  async setMatches(data) {
    try {
      const matches1 = await Match.insertMany(data);
      return matches1
    } catch (e) {
      console.log(e);
    }
  }
  async editMatches(data) {
    try {
      const {filter, update} = data
      await Match.findByIdAndUpdate(filter, update, {new:true});
      const matches1 = await Match.find()
      const forecasts = await Forecast.find()

      const updates = []
      forecasts.map((el)=>{
        updates.push(countResults(el, matches1))
      })
      
      console.log(updates)
     for (let i = 0; i < updates.length; i++) {
      await Forecast.updateOne({user_id : updates[i].user_id},{user_score : updates[i].user_score})
     }
      
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
