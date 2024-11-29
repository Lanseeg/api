const Training = require('../models/Training');

// POST: Add a new training
exports.addTraining = async (req, res) => {
    try {
      const { title, institution, startDate, endDate, keySkills } = req.body;
  
      if (!title || !institution || !startDate || !endDate) {
        return res.status(400).json({ error: 'Title, institution, start date, and end date are required.' });
      }
  
      if (new Date(endDate) < new Date(startDate)) {
        return res.status(400).json({ error: 'End date cannot be earlier than start date.' });
      }
  
      if (keySkills && !Array.isArray(keySkills)) {
        return res.status(400).json({ error: 'Key skills must be an array of strings.' });
      }
  
      const training = new Training({
        title,
        institution,
        startDate,
        endDate,
        keySkills,
        userId: req.user.id,
      });
  
      await training.save();
      res.status(201).json(training);
    } catch (error) {
      console.error('Error adding training:', error.message);
      res.status(500).json({ error: error.message });
    }
  };

  exports.getTrainings = async (req, res) => {
    try {
      // Fetch all trainings (public route)
      const trainings = await Training.find();
      res.status(200).json(trainings);
    } catch (error) {
      console.error('Error fetching trainings:', error.message);
      res.status(500).json({ error: error.message });
    }
  };

  exports.updateTraining = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, institution, startDate, endDate, keySkills } = req.body;
  
      // Validate keySkills if provided
      if (keySkills && !Array.isArray(keySkills)) {
        return res.status(400).json({ error: 'Key skills must be an array of strings.' });
      }
  
      // Validate endDate is not earlier than startDate
      if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
        return res.status(400).json({ error: 'End date cannot be earlier than start date.' });
      }
  
      const updatedTraining = await Training.findOneAndUpdate(
        { _id: id, userId: req.user.id },
        { title, institution, startDate, endDate, keySkills },
        { new: true }
      );
  
      if (!updatedTraining) {
        return res.status(404).json({ error: 'Training not found or not authorized to update.' });
      }
  
      res.status(200).json(updatedTraining);
    } catch (error) {
      console.error('Error updating training:', error.message);
      res.status(500).json({ error: error.message });
    }
  }; 

exports.deleteTraining = async (req, res) => {
    try {
        const { id } = req.params;
        const training = await Training.findOneAndDelete({ _id: id });
        if (!training) {
            return res.status(404).json({ error: 'Training not found' });
        }
        res.status(200).json({ message: 'Training deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
