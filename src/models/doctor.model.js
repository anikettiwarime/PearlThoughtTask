
import { Schema, model } from "mongoose";

const doctorSchema = new Schema({
  name: String,
  location: String,
  numOfAppointments: Number,
});

const Doctor = model('Doctor', doctorSchema);

export { Doctor };