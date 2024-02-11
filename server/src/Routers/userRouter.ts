import { Router } from "express";
import { User } from "../models/Models";

export const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { name } = req.body;
    await User.create({ name: name });
    console.log(req.body);
    res.send("New User added");
  } catch (e) {
    console.log(e);
  }
});

userRouter.get('/getusers', async (req,res)=>{
  try {
    const data = await User.find()
    res.send(data)
  } catch (e) {
    console.log(e)
  }
})
