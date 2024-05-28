const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use cors middleware to allow cross-origin requests
app.use(cors());

const users = [];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST a new user
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
