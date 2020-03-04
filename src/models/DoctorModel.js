const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  crm: { type: String, required: true, max: 12 },
  registrationDate: { type: Date, default: Date.now() },
});

module.exports = { Doctor: mongoose.model('Doctor', DoctorSchema) };
