//dev tests: testing a protected route
const express = require('express');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.get('/dashboard', verifyToken, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.role}!`, user: req.user });
});

module.exports = router;
