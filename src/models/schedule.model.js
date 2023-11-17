import { Schema, model } from 'mongoose';

const scheduleSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  patientName: String,
  startTime: Date,
  endTime: Date,
},
  { timestamps: true }
);

const Schedule = model('Schedule', scheduleSchema);

export  {Schedule};