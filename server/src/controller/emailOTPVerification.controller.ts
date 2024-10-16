import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import { Request, Response } from "express";
import generateOTP from "../utils/generateOTP";
import EmailOTPVerification from '../models/emailOTPVerification.model';
import transporter from "../utils/mailTransport";
import User from "../models/user.model";
import jwt from "jsonwebtoken";


const emailOTPVerification = {
  /**
 * Sends an OTP verification email to the specified email address.
 *
 */
  sendOTP: async (req: Request, res: Response):Promise<any> => {
    try {
      const { _id, email } = req.body;

      const otp = generateOTP();

      // mail options
      const mailOptions = {
        from: `"Sujeet Kumar" <${process.env.ETHEREAL_USERNAME}>`,
        to: email,
        subject: 'OTP Verification',
        html: `
        <html>
          <body>
            <p>Hi,</p>
            <p>Thank you for signing up with us. Please use the following OTP to verify your email address</p>
            <p><strong>${otp}</strong> is your OTP. This OTP expires in 30 minutes.</p>
            <p>Please do not share it with anyone.</p>
            <br/>
            <p>Regards,</p>
            <p>Team Cuvette</p>
          </body>
        </html>
        `,
      };

      const saltRounds = 10;

      const hashedOTP = await bcrypt.hash(otp.toString(), saltRounds);
      // console.log("Hashed OTP :: ", hashedOTP);


      const newOTPVerification = await new EmailOTPVerification({
        userId: _id,
        otp: hashedOTP,
        expiry: Date.now() + 1800000, // 30 minutes
      });

      await newOTPVerification.save();
      const result = await transporter.sendMail(mailOptions);
      // console.log(":: debugger point ::", result);

      res?.status(200).json({
        status: "SUCCESS",
        message: "OTP sent successfully",
      });
    } catch (error) {
      console.error('Error sending OTP verification email:', error);

      res?.status(500).json({
        status: "FAILED",
        message: error
      });
    }
  },

  /**
 * Verifies sent OTP .
 *
 */
  verifyOTP: async (req: Request, res: Response):Promise<any> => {
    try {
      const { userId, otp } = req.body;
      
      const otpVerification = await EmailOTPVerification.findOne({userId});
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
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      await EmailOTPVerification.deleteOne({ userId });
      res?.status(200).json({
        status: "SUCCESS",
        message: "OTP verified successfully",
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

export default emailOTPVerification;