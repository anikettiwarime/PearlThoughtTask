
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  location: String,
  numOfAppointments: Number,
});

module.exports = mongoose.model('Doctor', doctorSchema);
