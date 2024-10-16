const SignupRouter = require('express').Router();

// controllers
const SignupController = require("../controller/signup.controller");
const emailOTPVerification = require("../controller/emailOTPVerification.controller")


// routes
SignupRouter.post('/signup', SignupController.create)
SignupRouter.post('/sendEmailOTP', emailOTPVerification.sendOTP)
SignupRouter.post('/verifyEmailOTP', emailOTPVerification.verifyOTP)
SignupRouter.post('/sendOtpVerificationPhone', SignupController.create)


module.exports = SignupRouter;
