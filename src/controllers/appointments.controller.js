import { Appointment } from "../models/appointment.model.js";
import { Doctor } from "../models/doctor.model.js";

const createAppointment = async (req, res) => {
  const appointment = req.body;
  const { doctorId } = appointment;
  const newAppointment = new Appointment(appointment);

  try {
    const isDoctor = await Doctor.findById(doctorId);

    if (!isDoctor) {
      res.status(404).json({ message: "No Doctor Found" });
      return;
    }

    if (isDoctor.numOfAppointments > 0) {
      const newApp = isDoctor.numOfAppointments - 1;
      console.log(newApp);
      await Doctor.findByIdAndUpdate(isDoctor._id, { numOfAppointments: newApp }, { new: true });
    } else {
      res.json({ message: "No Appointments left" });
      return;
    }

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const ID = req.params.id;
    const appointment = await Appointment.findById(ID);

    const doctor = await Doctor.findById(appointment.doctorId);
    if (!doctor) {
      res.json({ message: "No Appointment Found for this doctor" });
      return;
    }

    const newApp = doctor.numOfAppointments + 1;
    console.log(newApp);
    await Doctor.findByIdAndUpdate(doctor._id, { numOfAppointments: newApp }, { new: true });

    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
};
