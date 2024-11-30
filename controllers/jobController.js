const Job = require('../models/Job');

// GET: Retrieve all jobs
exports.getJobs = async (req, res) => {
  try {
    const lang = req.query.lang || 'en'; // Default to English
    const jobs = await Job.find();

    // Map jobs to return only the requested language
    const localizedJobs = jobs.map((job) => ({
      title: job.title[lang],
      company: job.company[lang],
      description: job.description[lang],
      startDate: job.startDate,
      endDate: job.endDate,
      _id: job._id,
    }));

    res.status(200).json(localizedJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    res.status(500).json({ error: error.message });
  }
}; 

exports.addJob = async (req, res) => {
  try {
    const { title, company, description, startDate, endDate } = req.body;

    // Ensure all required fields are present
    if (!title || !company || !startDate || !description) {
      return res.status(400).json({ error: 'All fields (in all languages) are required.' });
    }

    // Create a new job
    const job = new Job({
      title,
      company,
      description,
      startDate,
      endDate,
      userId: req.user.id,
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error('Error adding job:', error.message);
    res.status(500).json({ error: error.message });
  }
};
  
exports.updateJob = async (req, res) => {
  try {
      const { id } = req.params;
      const { title, company, startDate, endDate, description } = req.body;

      // Validate input fields
      if (!title || !company || !description || !startDate || !endDate) {
          return res.status(400).json({ error: 'All fields are required.' });
      }

      // Ensure description is properly formatted
      if (!description.en || !description.fr || !description.br) {
          return res.status(400).json({ error: 'Descriptions in all languages are required.' });
      }

      // Find and update the job
      const updatedJob = await Job.findOneAndUpdate(
          { _id: id, userId: req.user.id },
          { title, company, startDate, endDate, description },
          { new: true } // Return the updated document
      );

      if (!updatedJob) {
          return res.status(404).json({ error: 'Job not found or not authorized' });
      }

      res.status(200).json(updatedJob);
  } catch (error) {
      console.error('Error updating job:', error.message);
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
