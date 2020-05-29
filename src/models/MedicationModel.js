const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  interval: { type: Number, required: true, min: 1 },
  recurrencies: { type: Number, required: true, min: 1 },
  initialDate: { type: Date },
  notifyCorrect: { type: Boolean },
  takeNumbers: { type: Number },
});

module.exports = {
  Medication: mongoose.model('Medication', MedicationSchema),
  MedicationSchema,
};
