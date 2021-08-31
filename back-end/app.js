// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const usersController = require('./controllers/users');

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

//CONTROLLERS
app.use('/users', usersController);


// EXPORT
module.exports = app;
