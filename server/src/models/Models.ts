import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  logo: { type: String },
});

const ForecastSchema = new mongoose.Schema({
  users: [String],
  user1forecast: [{ team1: Number, team2: Number }],
  user2forecast: [{ team1: Number, team2: Number }],
  score1: [Number],
  score2: [Number],
});

const MatchSchema = new mongoose.Schema({
  tour: { type: Number, required: true },
  teams_data: {
    teams: { type: Array, required: true },
    score1: { type: Number, default: "" },
    score2: { type: Number, default: "" },
    result: { type: String, default: "" },
    status: { type: String, default: "" },
  },
  users_data: {
    users: { type: Array },
    user1score: { type: Array },
    user2score: { type: Array },
  },
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Array },
  team: { type: String, default: "" },
});

export const Team = mongoose.model("teams", TeamSchema);
export const Match = mongoose.model("matches", MatchSchema);
export const User = mongoose.model("users", UserSchema);
export const Forecast = mongoose.model("forecasts", ForecastSchema);
