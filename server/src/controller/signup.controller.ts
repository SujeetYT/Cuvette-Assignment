import { Request, Response } from "express";
const User = require('../models/user.model');

const SignupController: any = {
  create: async (req: Request, res: Response) => {
    if (!req.body) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
      return;
    }

    try {
      // console.log("Request Body :: ", req.body);
      const user = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        companyName: req.body.companyName,
        companyEmail: req.body.companyEmail,
        companySize: req.body.companySize,
      }
      
      // console.log("Debug Point :: ");
      const newUser = new User(user);
      const savedUser = await newUser.save();
      // console.log("User Created :: ", savedUser);
      
      res.status(201).json({
        message: "User Created Successfully", 
        data: {
          id: savedUser._id,
          companyEmail: savedUser.companyEmail,
          isVerified: savedUser.isVerified,
        }
      });
    } catch (error: any) {
      res.status(500).send({
        message: error?.message || 'Some error occurred while creating the User.',
      });
    }
  },
};

module.exports = SignupController;

/*
      /signup
{
  "name": "Sujeet",
  "phoneNumber": "1234567890",
  "companyName": "Cuvette",
  "companyEmail": "fijapor474@advitize.com",
  "companySize": 500
}



*/