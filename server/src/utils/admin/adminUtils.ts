import { Match, Team, User, Forecast } from "../../models/Models";

class AdminUtils {
  async setMatches(data) {
    try {
      const matches = await Match.insertMany(data);

      const users = await User.find();
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
