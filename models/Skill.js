const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
    br: { type: String, required: true },
  },
  level: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
    br: { type: String, required: true },
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'PortfolioUser', required: true },
});

module.exports = mongoose.model('Skill', SkillSchema);
