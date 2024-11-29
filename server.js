const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors()); 

//Test middleware
app.use((req, res, next) => {
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/protected', require('./routes/protected'));
app.use('/api/user/skills', require('./routes/skills'));
app.use('/api/user/jobs', require('./routes/jobs'));
app.use('/api/user/trainings', require('./routes/trainings'));

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
