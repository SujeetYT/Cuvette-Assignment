import mongoose from 'mongoose';

const MobileOTPVerificationSchema = new mongoose.Schema({
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

const MobileOTPVerification = mongoose.model('MobileOTPVerification', MobileOTPVerificationSchema);
export default MobileOTPVerification;