const mongoose = require('mongoose');

const FamilyHistorySchema = new mongoose.Schema({
  relationship: { type: String, required: true },
  condition: { type: String, required: true },
  note: { type: String },
});

module.exports = {
  FamilyHistory: mongoose.model('FamilyHistory', FamilyHistorySchema),
  FamilyHistorySchema,
};
