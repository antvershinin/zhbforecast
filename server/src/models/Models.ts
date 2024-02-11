import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  logo: { type: String },
  user_id : String
});


const TourSchema = new mongoose.Schema({
  tour_number : {type: Number, required : true},
  matches : [{teams : [], score1: {type : Number, default : ''}, score2 : {type : Number, default : ''}, users : [{user_name : String, user_id : String}], result : {type : String, default : ""}}],
  forecasts : [{user_id : String, user_score : [], user_forecast : [{score1 : Number, score2 : Number, result : String}]}],
  table: [{user_id : String, user_name : String, points : {type : Number, default : 0} }]

})


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Array },
  team: { type: String, default: "" },
});

export const Tour = mongoose.model('tours', TourSchema)
export const Team = mongoose.model("teams", TeamSchema);
export const User = mongoose.model("users", UserSchema);

