const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  specialization: { type: String, required: true },
  crm: {
    type: String,
    required: true,
    max: 12,
    unique: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = { Doctor: mongoose.model('Doctor', DoctorSchema) };
