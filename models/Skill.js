const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true }, // Ex: beginner, intermediate, advanced
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'PortfolioUser', required: true },
});

module.exports = mongoose.model('Skill', SkillSchema);
