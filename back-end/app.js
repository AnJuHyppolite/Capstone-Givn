// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const usersController = require('./controllers/users');
const itemsController = require('./controllers/items');
const requestsController =require('./controllers/requests')
// const categoriesController = require('./controllers/categories');
const { generateUploadURL } = require('./s3.js');

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

//AWS s3 URL route
app.get('/s3url', async (req, res) => {
  console.log("Inside s3url server.js")
  const url = await generateUploadURL()
  console.log(url)
  res.send({ url })
})

//CONTROLLERS
app.use('/users', usersController);
app.use('/items', itemsController);
app.use('/requests',requestsController);

// EXPORT
module.exports = app;
