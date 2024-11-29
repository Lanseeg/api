const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { getJobs, addJob, updateJob, deleteJob } = require('../controllers/jobController');
const router = express.Router();

router.get('/', getJobs);

router.post('/', verifyToken, addJob);

router.put('/:id', verifyToken, updateJob);

router.delete('/:id', verifyToken, deleteJob);

module.exports = router;