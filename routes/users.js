// Resticted to admin
const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/admin', verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ message: 'Welcome, Admin!' });
});

module.exports = router;
