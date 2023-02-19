const dbConfig = require("../db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.post = require("../models/post.model")(mongoose);

module.exports = db; 