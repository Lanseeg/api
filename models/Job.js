const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date }, // Can be null for current jobs
  description: { type: [String] }, // Array of bullet points
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'PortfolioUser', required: true },
});

module.exports = mongoose.model('Job', JobSchema);
