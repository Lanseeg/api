const Job = require('../models/Job');

exports.getJobs = async (req, res) => {
    try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.addJob = async (req, res) => {
    try {
      const { title, company, startDate, endDate, description } = req.body;

      if (!title || !company || !startDate) {
        return res.status(400).json({ error: 'Title, company, and start date are required.' });
      }
  
      if (description && !Array.isArray(description)) {
        return res.status(400).json({ error: 'Description must be an array of strings.' });
      }
      
      const job = new Job({
        title,
        company,
        startDate,
        endDate,
        description,
        userId: req.user.id, // User ID from the token
      });
  
      await job.save();
      res.status(201).json(job); // Return the saved job
    } catch (error) {
      console.error('Error adding job:', error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
exports.updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, company, startDate, endDate, description } = req.body;
        const updatedJob = await Job.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { title, company, startDate, endDate, description },
            { new: true }
        );
        if (!updatedJob) {
            return res.status(404).json({ error: 'Job not found or not authorized' });
        }
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedJob = await Job.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!deletedJob) {
            return res.status(404).json({ error: 'Job not found or not authorized' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
