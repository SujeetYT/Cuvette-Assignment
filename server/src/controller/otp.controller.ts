import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import generateOTP from "../utils/generateOTP";
import bcrypt from "bcrypt";
import MobileOTPVerification from "../models/mobileOTPVerification.model";
import User from "../models/user.model";
import sendWhatsAppMessage from "../services/sendWhatsAppMessage";
import jwt from "jsonwebtoken";

const OtpController = {
  sendPhoneOtp: async (req: Request, res: Response): Promise<any> => {
    // code to send OTP to phone
    try {
      const { _id, phoneNumber } = req.body;
      if (!_id || !phoneNumber) {
        return res?.status(400).json({
          status: "FAILED",
          message: "Invalid request body"
        });
      }

      const otp = generateOTP();
      console.log("Mobile OTP :: ", otp);

      const saltRounds = 10;
      const hashedOTP = await bcrypt.hash(otp.toString(), saltRounds);

      const newOTPVerification = await new MobileOTPVerification({
        userId: _id,
        otp: hashedOTP,
        expiry: Date.now() + 1800000, // 30 minutes
      });

      await newOTPVerification.save();

      // send OTP to phone
      const formattedPhoneNumber = "+91" + phoneNumber;
      const response = await sendWhatsAppMessage(otp, formattedPhoneNumber);
      console.log("Response from Twilio :: ", response);

      res?.status(200).json({
        status: "SUCCESS",
        message: "Mobile OTP sent successfully",
        otp
      });
    } catch (error) {
      console.error('Error sending OTP verification email:', error);

      res?.status(500).json({
        status: "FAILED",
        message: error
      });
    }
  },
  verifyPhoneOtp: async (req: Request, res: Response): Promise<any> => {
    // code to verify OTP from phone
    try {
      const { userId, otp } = req.body;
      if (!userId || !otp) {
        return res?.status(400).json({
          status: "FAILED",
          message: "Invalid request body"
        });
      }

      const otpVerification = await MobileOTPVerification.findOne({ userId });
      // console.log("OTP Verification :: ", otpVerification);

      if (!otpVerification) {
        return res?.status(404).json({
          status: "FAILED",
          message: "OTP not found",
        });
      }

      const isOTPValid = await bcrypt.compare(otp.toString(), otpVerification.otp);

      if (!isOTPValid) {
        return res?.status(400).json({
          status: "FAILED",
          message: "Invalid OTP",
        });
      }

      if (otpVerification.expiry.getTime() < Date.now()) {
        return res?.status(400).json({
          status: "FAILED",
          message: "OTP has expired",
        });
      }

      // set user as verified
      const user = await User.findOneAndUpdate({ _id: userId }, { isVerified: true });
      // console.log("User ::", user);

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }
      const payload = {
        id: userId,
        email: user?.companyEmail
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      await MobileOTPVerification.deleteOne({ userId });
      res?.status(200).json({
        status: "SUCCESS",
        message: "Mobile OTP verified successfully",
        token,
      });
    } catch (error) {
      console.error('Error verifying OTP:', error);

      res?.status(500).json({
        status: "FAILED",
        message: error
      });
    }
  }
}

export default OtpController;