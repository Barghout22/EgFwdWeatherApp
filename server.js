// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
app.options("*", cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8002;
const server = app.listen(port, listening);
function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

app.post("/newWeatherEntry", addWeatherEntry);

function addWeatherEntry(req, res) {
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    feel: req.body.feeling,
  };
  //console.log(projectData);
}

app.get("/all", function (req, res) {
  res.send(projectData);
});
