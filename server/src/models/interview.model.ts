import mongoose from 'mongoose';

const InterviewSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: [true, 'Job title is required'],
    minlength: [2, 'Job title must be at least 2 characters long'],
    maxlength: [100, 'Job title must be less than 100 characters long'],
  },
  jobDescription: {
    type: String,
    required: [true, 'Job description is required'],
    minlength: [2, 'Job description must be at least 2 characters long'],
    maxlength: [1000, 'Job description must be less than 1000 characters long'],
  },
  experienceLevel: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: ['Entry Level', 'Mid Level', 'Senior Level'],
  },
  candidateEmails: {
    type: [String],
    required: [true, 'Candidate emails are required'],
    validate: {
      validator: (emails:any) => emails.length > 0,
      message: 'At least one candidate email is required',
    },
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Interview = mongoose.model('Interview', InterviewSchema);
module.exports = Interview;