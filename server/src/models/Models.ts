import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  logo: { type: String },
  user_id: String,
  user_name: String,
});

const TourSchema = new mongoose.Schema({
  tour_number: { type: Number, required: true },
  matches: [
    {
      teams: Array,
      score1: { type: Number, default: "" },
      score2: { type: Number, default: "" },
      result: { type: String, default: "" },
    },
  ],
  forecasts: [
    {
      user_id: String,
      user_name: String,
      user_score: [Number],
      forecast_points: Number,
      user_forecast: [],
      user_doubleMatch: Number,
    },
  ],
  table: [
    {
      user_id: String,
      user_name: String,
      points: { type: Number, default: 0 },
      wins: { type: Number, default: 0 },
      draws: { type: Number, default: 0 },
      losses: { type: Number, default: 0 },
      forecast_points: { type: Number, default: 0 },
    },
  ],
});

const EurotourSchema = new mongoose.Schema({
  tour_number: { type: Number, required: true },
  matches: [
    {
      teams: Array,
      score1: { type: Number, default: "" },
      score2: { type: Number, default: "" },
      result: { type: String, default: "" },
      is_double: { type: Boolean, default: false },
    },
  ],
  forecasts: [
    {
      user_id: String,
      user_name: String,
      user_score: [Number],
      forecast_points: Number,
      user_forecast: [],
    },
  ],
  table: [
    {
      user_id: String,
      user_name: String,
      forecast_points: { type: Number, default: 0 },
      exact: { type: Number, default: 0 },
      difference: { type: Number, default: 0 },
      outcome: { type: Number, default: 0 },
    },
  ],
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
  euro: Boolean,
});

export const Tour = mongoose.model("tours", TourSchema);
export const Eurotour = mongoose.model("eurotours", EurotourSchema);
export const Team = mongoose.model("teams", TeamSchema);
export const User = mongoose.model("users", UserSchema);
