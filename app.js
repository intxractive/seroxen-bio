const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); // You can replace this with a database later

const app = express();
const PORT = 3000;

// Use Body-Parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Simple in-memory database to store users (can be replaced with a real database)
let users = [];

// Serve the signup page (HTML form) on the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');  // Serve HTML page for sign-up
});

// Handle the signup form submission
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  // Check if the username already exists
  if (users.find(user => user.username === username)) {
    return res.status(400).send('Username already exists.');
  }

  // Save the new user
  users.push({ username, password });

  // You could write users to a file or a database (in this case we save in memory)
  fs.writeFileSync('users.json', JSON.stringify(users));

  res.send('Sign-up successful! Log in to continue.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
