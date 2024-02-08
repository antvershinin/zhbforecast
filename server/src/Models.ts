import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  logo: { type: String },
});

const MatchSchema = new mongoose.Schema({
  team1: { type: String, required: true },
  score1: { type: Number },
  team2: { type: String, required: true },
  score2: { type: String },
  result: { type: String, required: true, default: "X" },
  is_finished: { type: Boolean, required: true, default: false },
});

const UserSchema = new mongoose.Schema({
  name : {type: String, required : true},
  points : {type : Array},
  matchday : {type : Array},
  user_id : {type : String}
})

export const Team = mongoose.model("teams", TeamSchema);
export const Match = mongoose.model("matches", MatchSchema);
export const User = mongoose.model('users', UserSchema)