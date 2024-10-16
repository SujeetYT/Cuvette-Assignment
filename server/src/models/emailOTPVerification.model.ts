import mongoose from 'mongoose';

const EmailOTPVerificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  }, 
}, {
  timestamps: true,
});

const EmailOTPVerification = mongoose.model('EmailOTPVerification', EmailOTPVerificationSchema);
module.exports = EmailOTPVerification;