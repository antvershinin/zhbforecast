import { Team, User,Tour, } from "../models/Models";

interface IReqForecast {
  tour : {_id : string}, forecasts : {user_id : string, user_forecasts : [{score1:number, score2:number, result:string}]}
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
  async setForecast(data : IReqForecast) {
    try {
      const result = await Tour.findById(data.tour._id)
      const forecastsOld = result.forecasts

      const ids = [] 
      forecastsOld.map((el)=>{
        ids.push(el.user_id)
      })
      if (!ids.includes(data.forecasts.user_id)) forecastsOld.push(data.forecasts)
      await Tour.findOneAndUpdate({_id : data.tour._id}, {forecasts: forecastsOld})
      
    } catch (e) {
        console.log(e)
    }
    
  }
}

export default new MatchUtils();
