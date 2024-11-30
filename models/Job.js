const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
    br: { type: String, required: true },
  },
  company: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
    br: { type: String, required: true },
  },
  description: {
    fr: [String],
    en: [String],
    br: [String],
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'PortfolioUser', required: true },
});

module.exports = mongoose.model('Job', JobSchema);
