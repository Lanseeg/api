const Skill = require('../models/Skill');

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.addSkill = async (req, res) => {
  try {
    const { name, level } = req.body;
    const skill = new Skill({ name, level, userId: req.user.id });
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level } = req.body;
    const updatedSkill = await Skill.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { name, level },
      { new: true }
    );
    if (!updatedSkill) {
      return res.status(404).json({ error: 'Skill not found or not authorized' });
    }
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSkill = await Skill.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deletedSkill) {
      return res.status(404).json({ error: 'Skill not found or not authorized' });
    }
    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

