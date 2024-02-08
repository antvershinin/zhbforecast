import {Router} from 'express'
import { User } from '../Models'

export const userRouter = Router()

userRouter.post('/register', async (req, res) => {
       try {
        const {name} = req.body
        await User.create({ name : name})
        console.log(req.body)
        res.send('New User added')
       } catch (e) {
        console.log(e)
       } 
})