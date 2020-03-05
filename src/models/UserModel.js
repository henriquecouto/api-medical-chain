const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['doctor', 'patient', 'clerk'], required: true },
  registrationDate: { type: Date, default: Date.now() },
});

module.exports = { User: mongoose.model('User', UserSchema) };
