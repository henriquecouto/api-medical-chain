const mongoose = require('mongoose');
const { MedicationSchema } = require('./MedicationModel');

const AppointmentSchema = new mongoose.Schema({
  exams: { type: [String], required: true },
  symptoms: { type: [String], required: true },
  diagnosis: { type: [String] },
  treatment: { type: [MedicationSchema] },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  registrationDate: { type: Date, default: Date.now() },
  blocked: {
    type: Boolean,
    required: true,
    default: false,
    // select: false,
  },
  blockedDate: { type: Date },
  blockedCorrect: {
    type: Boolean,
    // required: true,
    // default: false,
    // select: false,
  },
  sendedApp: {
    type: Boolean,
  },
});

module.exports = {
  Appointment: mongoose.model('Appointment', AppointmentSchema),
};
