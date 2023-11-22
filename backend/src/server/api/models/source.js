const mongoose = require("mongoose");

const source = mongoose.Schema({
  name: String,
  //id: String,
  source: {},
  path: String,
  sourceCSV: String
}, { versionKey: false });

module.exports = mongoose.model("source", source);