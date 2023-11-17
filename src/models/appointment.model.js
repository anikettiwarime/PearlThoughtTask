import { Schema, model } from 'mongoose';

const appointmentSchema = new Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor' },
  patientName: String,
  appointmentTime: String,
});

const Appointment = model('Appointment', appointmentSchema);

export { Appointment };