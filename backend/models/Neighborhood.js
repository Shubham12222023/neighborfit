const mongoose = require("mongoose");

const NeighborhoodSchema = new mongoose.Schema({
  name: String,
  city: String,
  safety: Number,
  greenery: Number,
  nightlife: String,
  transport: Number,
  rent: Number,
});

module.exports = mongoose.model("Neighborhood", NeighborhoodSchema);
