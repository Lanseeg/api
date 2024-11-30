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

// PUT: Update an existing training
exports.updateTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, institution, keySkills, startDate, endDate } = req.body;

    // Validate required fields
    if (!title || !institution || !keySkills || !startDate || !endDate) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Ensure title and institution are provided in all languages
    if (!title.en || !title.fr || !title.br) {
      return res.status(400).json({ error: 'Title in all languages is required.' });
    }
    if (!institution.en || !institution.fr || !institution.br) {
      return res.status(400).json({ error: 'Institution in all languages is required.' });
    }

    // Ensure keySkills are arrays for all languages
    if (!Array.isArray(keySkills.en) || !Array.isArray(keySkills.fr) || !Array.isArray(keySkills.br)) {
      return res.status(400).json({ error: 'Key skills must be arrays in all languages.' });
    }

    // Find and update the training
    const updatedTraining = await Training.findOneAndUpdate(
      { _id: id, userId: req.user.id }, // Match training by ID and user
      { title, institution, keySkills, startDate, endDate }, // Update fields
      { new: true } // Return the updated document
    );

    if (!updatedTraining) {
      return res.status(404).json({ error: 'Training not found or not authorized.' });
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
