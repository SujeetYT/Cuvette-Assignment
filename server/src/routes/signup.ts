import express from "express";
const SignupRouter = express.Router();

// controllers
import SignupController from "../controller/signup.controller";
import emailOTPVerification from "../controller/emailOTPVerification.controller"


// routes
SignupRouter.post('/signup', SignupController.create)
SignupRouter.post('/sendEmailOTP', emailOTPVerification.sendOTP)
SignupRouter.post('/verifyEmailOTP', emailOTPVerification.verifyOTP)


export default SignupRouter;
