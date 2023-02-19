//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConfig = require("./db.config");

var corsOptions = {
    origin: "http://localhost:3031"
};


const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


require("../node-api/router/post.routes")(app);


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
