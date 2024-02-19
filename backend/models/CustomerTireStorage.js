const mongoose = require("mongoose");

const customerTireStorageSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  tireBrand: { type: String, required: true },
  tireSize: { type: String, required: true },
  tireSet: { type: Number, required: true },
  locationNote: { type: String, required: true },
});

module.exports = mongoose.model(
  "CustomerTireStorage",
  customerTireStorageSchema
);
