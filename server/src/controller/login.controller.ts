import { Request, Response } from "express";
import User from "../models/user.model";


const LoginController = {
  login: async (req:Request, res:Response):Promise<any> => {
    try {
      // get user data
      const userData = req.body;
      // check if user exists
      const user = await User.findOne({ companyEmail: userData.companyEmail });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json({
        message: "User found",
        data: {
          id: user._id,
          name: user.name,
          companyEmail: user.companyEmail,
          isVerified: user.isVerified,
        },
      });

    }catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }
};


export default LoginController;