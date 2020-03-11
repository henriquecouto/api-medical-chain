const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  interval: { type: Number, required: true, min: 1 },
  recurrencies: { type: Number, required: true, min: 1 }, // quantidade de dias
  initialDate: { type: Date },
});

module.exports = {
  Medication: mongoose.model('Medication', MedicationSchema),
  MedicationSchema,
};
