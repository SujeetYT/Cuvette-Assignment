import express from "express";
const otpRouter = express.Router();

// controllers
import OtpController from "../controller/otp.controller";


// routes

// otpRouter.post('/sendEmailOTP', emailOTPVerification.sendOTP)
// otpRouter.post('/verifyEmailOTP', emailOTPVerification.verifyOTP)
otpRouter.post('/sendPhoneOTP', OtpController.sendPhoneOtp)
otpRouter.post('/verifyPhoneOTP', OtpController.verifyPhoneOtp)


export default otpRouter;