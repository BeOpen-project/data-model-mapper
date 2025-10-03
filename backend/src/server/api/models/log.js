const mongoose = require("mongoose");

const log = mongoose.Schema({
  messages : String,
  timestamp: {}
}, { versionKey: false });

module.exports = mongoose.model("log", log);