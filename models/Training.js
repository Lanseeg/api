const mongoose = require('mongoose');

const TrainingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  institution: { type: String, required: true },
  date: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Training', TrainingSchema);
