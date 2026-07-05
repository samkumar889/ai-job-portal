
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a job title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a job description'],
  },
  company: {
    type: String,
    required: [true, 'Please add a company name'],
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
  },
  salary: {
    type: String,
    required: [true, 'Please add a salary range'],
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    default: 'full-time',
  },
  requirements: [String],
  skills: [String],
  recruiter: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  applicants: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
      },
      appliedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Job', jobSchema);
