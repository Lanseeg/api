const mongoose = require('mongoose');

// Define the Training schema
const TrainingSchema = new mongoose.Schema({
  title: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
    br: { type: String, required: true },
  },
  institution: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
    br: { type: String, required: true },
  },
  keySkills: {
    fr: [String], // Skills in French
    en: [String], // Skills in English
    br: [String], // Skills in Breton
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'PortfolioUser', required: true },
});

module.exports = mongoose.model('Training', TrainingSchema);
