import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name must be less than 100 characters long'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number must be a valid 10-digit number'],
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    minlength: [2, 'Company name must be at least 2 characters long'],
    maxlength: [100, 'Company name must be less than 100 characters long'],
  },
  companyEmail: {
    type: String,
    required: [true, 'Company email is required'],
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
    unique: [true, 'Email already exists'],
  },
  companySize: {
    type: Number,
    required: [true, 'Company size is required'],
    min: [1, 'Company size must be at least 1'],
    max: [10000, 'Company size must be less than or equal to 10000'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const User = mongoose.model('User', UserSchema);
export default User;