import { Request, Response } from "express";

import jtw from "jsonwebtoken";
import { User } from "../models/Models";

class UserController {
  async login(req: Request, res: Response) {
    try {
      const user = await User.findOne({
        login: req.body.login,
      });

      if (!user) {
        return res.status(404).json({
          message: "Неверный логин",
        });
      }

      const validPassword = user.password === req.body.password;

      if (!validPassword) {
        return res.status(404).json({
          message: "Неверный пароль",
        });
      }

      const token = jtw.sign(
        {
          _id: user._id,
        },
        "secret007",
        {
          expiresIn: "360d",
        }
      );

      const response = {
        user_name: user.name,
        user_id:user._id,
        is_admin : user.is_admin
      };

      res.send({
        user: response,
        token,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async auth(req: Request, res: Response) {
    try {
      const decoded = <{ _id: string }>jtw.decode(req.headers.authorization, {
        json:true
      });
      const { _id } = decoded;
      const user = await User.findById(_id);
      res.send({
        user_id : user._id,
        user_name : user.name,
        is_admin : user.is_admin
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserController();
