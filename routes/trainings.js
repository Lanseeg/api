const express = require('express');
const { verifyToken } = require('../middleware/auth');

const { addTraining, getTrainings, updateTraining, deleteTraining } = require('../controllers/trainingController');
const { route } = require('./skills');
const router = express.Router();

router.get('/', getTrainings);

router.post('/', verifyToken, addTraining);

router.put('/:id', verifyToken, updateTraining);

router.delete('/:id', verifyToken, deleteTraining);

module.exports = router;
