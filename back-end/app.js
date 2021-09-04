// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const usersController = require('./controllers/users');
const itemsController = require('./controllers/items');

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
app.use('/items', itemsController);


// EXPORT
module.exports = app;
