import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  logo: { type: String },
  user_id : String
});

const ForecastSchema = new mongoose.Schema({
  user_id: String,
  user_forecast: [],
  user_score: [Number],
  result : String,

});

const MatchSchema = new mongoose.Schema({
  tour: { type: Number, required: true, default : 1 },
  teams: { type: Array, required: true },
  users: { type: Array },
  score1: { type: Number, default: "" },
  score2: { type: Number, default: "" },
  result: { type: String, default: "" },
  status: { type: String, default: "" },
})




const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Array },
  team: { type: String, default: "" },
});

export const Team = mongoose.model("teams", TeamSchema);
export const Match = mongoose.model("matches", MatchSchema);
export const User = mongoose.model("users", UserSchema);
export const Forecast = mongoose.model("forecasts", ForecastSchema);
