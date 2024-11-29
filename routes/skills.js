const express = require('express');
const { addSkill, getSkills } = require('../controllers/skillController');
const router = express.Router();

router.post('/', addSkill);
router.get('/', getSkills);

module.exports = router;
