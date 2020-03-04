const mongoose = require('mongoose');
const { FamilyHistorySchema } = require('./FamilyHistoryModel');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthDate: { type: Date, required: true },
  occupation: { type: String, required: true },
  gender: { type: String, required: true },
  familyHistory: { type: FamilyHistorySchema },
  registrationDate: { type: Date, default: Date.now() },
});

module.exports = { Patient: mongoose.model('Patient', PatientSchema) };
