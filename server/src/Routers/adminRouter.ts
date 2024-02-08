import {Router}  from 'express'
import { Match, Team } from '../Models';

export const adminRouter =  Router()

adminRouter.post('/setmatches', async (req, res) => {
    try {
      await Match.insertMany(req.body);
      console.log(req.body);
      res.send("Added Succesfully");
    } catch (e) {
      console.log(e);
    }})

adminRouter.get('/getteams', async (req, res) => {
    try {
      const data = await Team.find();
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  })