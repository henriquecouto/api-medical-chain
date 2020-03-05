const mongoose = require('mongoose');
const { FamilyHistorySchema } = require('./FamilyHistoryModel');

const PatientSchema = new mongoose.Schema({
  birthDate: { type: Date, required: true },
  occupation: { type: String, required: true },
  gender: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  familyHistory: { type: [FamilyHistorySchema] },
});

module.exports = { Patient: mongoose.model('Patient', PatientSchema) };
