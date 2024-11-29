const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { getSkills, addSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const router = express.Router();

router.get('/', getSkills);

router.post('/', verifyToken, addSkill);

router.put('/:id', verifyToken, updateSkill);

router.delete('/:id', verifyToken, deleteSkill);

module.exports = router;
