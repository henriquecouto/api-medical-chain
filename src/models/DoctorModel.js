const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  specialization: { type: String, required: true },
  crm: {
    type: String,
    required: true,
    maxlength: 12,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
});

module.exports = { Doctor: mongoose.model('Doctor', DoctorSchema) };
