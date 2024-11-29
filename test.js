const express = require('express');
const app = express();

app.use(express.json());

app.post('/test', (req, res) => {
  console.log('Request Body:', req.body);
  res.send(req.body);
});

app.listen(5000, () => console.log('Test server running on port 5000'));
