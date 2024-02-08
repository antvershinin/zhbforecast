import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  logo: { type: String },
});

const MatchSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  team1: { type: String, required: true },
  score1: { type: Number },
  team2: { type: String, required: true },
  score2: { type: String },
  result: { type: String, required: true, default: "X" },
  is_finished: { type: Boolean, required: true, default: false },
});

export const Team = mongoose.model("teams", TeamSchema);
export const Match = mongoose.model("matches", MatchSchema);
