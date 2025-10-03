const mongoose = require("mongoose");

const dataModel = mongoose.Schema({
  name: String,
  //id: String,
  mapRef : {},
  isAlsoReferencedBy : Array,
  user: String,
  dataModel: {}
}, { versionKey: false });

module.exports = mongoose.model("dataModel", dataModel);