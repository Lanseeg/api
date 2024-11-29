const mongoose = require('mongoose');

const TrainingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  institution: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  keySkills: { type: [String] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'PortfolioUser', required: true }, // Reference to the user
});

module.exports = mongoose.model('Training', TrainingSchema);
