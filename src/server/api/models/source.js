const mongoose = require("mongoose");

const source = mongoose.Schema({
  name: String,
  //id: String,
  mapRef: {},
  source: {},// | [] | String | Number,
  path: String,
  sourceCSV: String,
  bucket: String,
  from: String,
  user: String,
  isAlsoReferencedBy : Array,
  timestamp : Number
}, { versionKey: false });

module.exports = mongoose.model("source", source);