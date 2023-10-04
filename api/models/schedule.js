const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patientName: String,
  startTime: Date,
  endTime: Date,
});

module.exports = mongoose.model('Schedule', scheduleSchema);
