//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConfig = require("./db.config");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors());

app.use(bodyParser.json());

app.use(express.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.json({message:"Welcome to posts API!!!"});
})

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

const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
